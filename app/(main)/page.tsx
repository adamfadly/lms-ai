import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

export const dynamic = "force-dynamic";

const Page: React.FC = async () => {
  const companionSessions = await getAllCompanions({ limit: 3 });
  const recentSessions = await getRecentSessions(10);
  return (
    <main>
      {/* Hero Section */}
      <section className="flex flex-col gap-3 mb-8">
        <h1 className="text-5xl max-md:text-4xl">Popular Companions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover AI-powered learning companions tailored to your interests. Start your personalized learning journey
          today.
        </p>
      </section>

      {/* Popular Companions Grid */}
      <section className="home-section mb-12">
        {companionSessions && companionSessions.length > 0 ? (
          companionSessions.map((companion) => (
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground text-lg">No companions available yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Create your first companion to get started!</p>
          </div>
        )}
      </section>

      {/* Recent Sessions & CTA */}
      <section className="home-section gap-8">
        <CompanionList title="Recently Completed Sessions" companions={recentSessions} classNames="lg:w-2/3 w-full" />
        <CTA />
      </section>
    </main>
  );
};
export default Page;
