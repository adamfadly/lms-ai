"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams, pathname]);

  return (
    <div className="relative border border-border rounded-lg items-center flex gap-2 px-3 py-2 h-fit bg-secondary/40 focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-all duration-200">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} className="opacity-50 dark:invert" />
      <input
        placeholder="Search companions..."
        className="outline-none bg-transparent text-foreground placeholder:text-muted-foreground w-full text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
