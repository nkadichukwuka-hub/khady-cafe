import Link from "next/link";
import { Container } from "./Container";
import { ClockIcon, PinIcon } from "../icons";
import { cafe } from "@/data/cafe";

/**
 * Site footer on the dark bean surface — the counterweight to the cream page.
 * Hours and address get line icons; secondary links are plain. Café facts come
 * from `data/cafe.ts`.
 */
export function Footer() {
  return (
    <footer className="mt-24 bg-bean text-cream">
      <Container className="grid gap-10 py-16 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <span className="font-display text-h3 italic">khady&rsquo;s café</span>
          <p className="max-w-xs text-small text-cream/70">{cafe.blurb}</p>
        </div>

        <div className="flex flex-col gap-3 text-small text-cream/80">
          <span className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 shrink-0 text-bronze-soft" />
            {cafe.hoursSummary}
          </span>
          <span className="flex items-center gap-2">
            <PinIcon className="h-4 w-4 shrink-0 text-bronze-soft" />
            {cafe.address.oneLine}
          </span>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 text-small">
          {[
            { label: "Menu", href: "/menu" },
            { label: "Our story", href: "/about" },
            { label: "Instagram", href: cafe.contact.instagram },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-cream/80 underline decoration-cream/25 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
      <div className="border-t border-cream/15">
        <Container className="py-5 text-caption text-cream/55">
          © {new Date().getFullYear()} {cafe.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
