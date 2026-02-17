import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  label?: string;
}

const CompanionCard = ({ id, name, topic, subject, duration, color, label }: CompanionCardProps) => (
  <article
    className="companion-card group"
    style={{
      background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
      borderColor: `${color}30`,
    }}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="subject-badge">{subject}</div>
        {label ? <div className="subject-badge">{label}</div> : null}
      </div>
      <button className="companion-bookmark group/bookmark" aria-label="Bookmark companion">
        <Image
          src="/icons/bookmark.svg"
          alt="bookmark"
          width={12.5}
          height={15}
          className="dark:invert dark:brightness-0 dark:contrast-200 group-hover/bookmark:scale-110 transition-transform"
        />
      </button>
    </div>

    <div className="flex flex-col gap-2 flex-grow">
      <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">{name}</h2>
      <p className="text-sm text-muted-foreground line-clamp-2">{topic}</p>
    </div>

    <div className="flex items-center gap-2 text-muted-foreground">
      <Image
        src="/icons/clock.svg"
        alt="duration"
        width={13.5}
        height={13.5}
        className="dark:invert dark:brightness-0 dark:contrast-200"
      />
      <p className="text-sm font-medium">{duration} min</p>
    </div>

    <Link href={`/companions/${id}`} className="w-full">
      <button className="btn-primary-red w-full justify-center group/btn">
        <span>Launch Lesson</span>
        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
      </button>
    </Link>
  </article>
);

export default CompanionCard;
