import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { menuByCategory } from "@/data/menu";
import { menuItemToProduct } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full menu at Khady's Café — espresso drinks, cold drinks, pastries, and sandwiches. Prices in £.",
};

const groups = menuByCategory();

/** "Espresso Drinks" -> "Espresso drinks" */
const sentence = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();
const anchor = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Container className="py-16 sm:py-24">
          <h1 className="text-hero text-espresso">Menu</h1>
          <p className="mt-4 max-w-prose text-lead text-mocha">
            Coffee roasted in small batches, pastries baked before we open, and a
            short lunch menu. Everything&rsquo;s made here.
          </p>

          <nav
            aria-label="Menu sections"
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6"
          >
            {groups.map(({ category }) => (
              <a
                key={category}
                href={`#${anchor(category)}`}
                className="font-sans text-small text-mocha underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-espresso hover:decoration-espresso"
              >
                {sentence(category)}
              </a>
            ))}
          </nav>
        </Container>

        <Container className="flex flex-col gap-20 pb-24">
          {groups.map(({ category, items }) => (
            <section
              key={category}
              id={anchor(category)}
              className="scroll-mt-24"
            >
              <h2 className="text-h1 text-espresso">{sentence(category)}</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <ProductCard
                    key={item.slug}
                    product={menuItemToProduct(item)}
                  />
                ))}
              </div>
            </section>
          ))}
        </Container>
      </main>
      <Footer />
    </>
  );
}
