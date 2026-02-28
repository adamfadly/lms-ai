import Vapi from "@vapi-ai/web";

let vapiInstance: Vapi | null = null;

export const vapi = new Proxy({} as Vapi, {
  get(_target, prop) {
    if (!vapiInstance && typeof window !== "undefined") {
      vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
    }
    if (!vapiInstance) throw new Error("Vapi can only be used in the browser");
    return (vapiInstance as Record<string, unknown>)[prop as string];
  },
});
