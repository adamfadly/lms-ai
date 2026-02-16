import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/nextjs/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

type ClerkWebhookEvent = {
  type: string;
  data: Record<string, unknown>;
};

const getPrimaryEmail = (data: Record<string, unknown>) => {
  const emailAddresses = data.email_addresses as Array<{ email_address?: string }> | undefined;
  const primaryEmail = emailAddresses?.[0]?.email_address;
  return primaryEmail ?? null;
};

const ensureSupabaseUser = async (email: string, clerkId: string) => {
  const supabaseAdmin = createSupabaseAdminClient();
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { clerk_id: clerkId },
  });

  if (error && error.message !== "User already registered") {
    throw new Error(error.message);
  }
};

export async function POST(request: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
  }

  const headerList = await headers();
  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await request.text();
  let event: ClerkWebhookEvent;

  try {
    const webhook = new Webhook(webhookSecret);
    event = webhook.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const clerkId = event.data.id as string | undefined;
    const email = getPrimaryEmail(event.data);
    if (clerkId && email) {
      await ensureSupabaseUser(email, clerkId);
    }
  }

  if (event.type === "session.created") {
    const clerkId = event.data.user_id as string | undefined;
    if (clerkId) {
      const client = await clerkClient();
      const user = await client.users.getUser(clerkId);
      const email = user.emailAddresses?.[0]?.emailAddress;
      if (email) {
        await ensureSupabaseUser(email, clerkId);
      }
    }
  }

  return Response.json({ ok: true });
}
