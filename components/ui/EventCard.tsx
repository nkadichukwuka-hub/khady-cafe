import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type EventCardProps = {
  image: { src: string; alt: string };
  /** Line icon, ~20px. */
  icon: ReactNode;
  /** e.g. "Every Sunday" or "Sunday 15 June". */
  whenLabel: string;
  /** e.g. "6:30–9:00pm". */
  timeLabel: string;
  title: string;
  blurb: string;
  className?: string;
};

/**
 * One recurring event. Same surface recipe as `FeatureCard` (foam + hairline,
 * no shadow, no hover-lift) with a photo well and a schedule line. Events are an
 * unordered set — no numbering.
 */
export function EventCard({
  image,
  icon,
  whenLabel,
  timeLabel,
  title,
  blurb,
  className,
}: EventCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-sm border border-line bg-foam",
        className,
      )}
    >
      <div className="relative aspect-16/9 bg-latte">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-7">
        <p className="flex items-center gap-2 text-small text-mocha">
          <span className="text-bronze [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
          {whenLabel}, {timeLabel}
        </p>
        <h3 className="text-h3 italic text-espresso">{title}</h3>
        <p className="text-small text-mocha">{blurb}</p>
      </div>
    </article>
  );
}
