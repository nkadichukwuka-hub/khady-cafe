import Link from "next/link";
import { Container } from "./Container";

type NavItem = { label: string; href: string };

const defaultItems: NavItem[] = [
  { label: "Menu", href: "/menu" },
  { label: "Our story", href: "/about" },
];

type NavbarProps = {
  items?: NavItem[];
};

/**
 * Top navigation. Wordmark in the display serif on the left, sentence-case
 * links on the right. Sticky, on a cream background with a hairline base rule.
 * At narrow widths the links wrap below the wordmark (no hamburger needed at
 * this count); add a disclosure menu if the nav grows past four items.
 */
export function Navbar({ items = defaultItems }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-sm">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4">
        <Link
          href="/"
          className="font-display text-h3 lowercase italic tracking-tight text-espresso"
        >
          khady&rsquo;s café
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-sans text-small text-mocha underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
