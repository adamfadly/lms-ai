import React from "react";
import { getAllCompanions, getPublicCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/Subject";

export const dynamic = "force-dynamic";

const page = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject && filters.subject !== "all" ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const publicCompanions = await getPublicCompanions(3);
  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      {/* Header Section */}
      <section className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-start gap-4 max-lg:flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl max-md:text-4xl">Companion Library</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse and explore all available learning companions. Filter by subject or search for specific topics.
            </p>
          </div>
          <div className="flex gap-3 max-sm:flex-col max-sm:w-full">
            <SearchInput />
            <SubjectFilter />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 mb-8">
        <h2 className="text-3xl font-bold">Public Companions</h2>
        <div className="companions-grid">
          {publicCompanions && publicCompanions.length > 0 ? (
            publicCompanions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
                label="Public"
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground text-lg">No public companions available.</p>
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold">My Companions</h2>
        <div className="companions-grid">
          {companions && companions.length > 0 ? (
            companions.map((companion) => (
              <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground text-lg">No companions found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
export default page;
