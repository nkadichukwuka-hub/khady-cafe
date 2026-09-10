"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Tag } from "@/components/ui/Tag";
import { Rating } from "@/components/ui/Rating";
import { Stamp } from "@/components/ui/Stamp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ProductCard, type Product } from "@/components/ui/ProductCard";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { EventCard } from "@/components/ui/EventCard";
import { ReserveTableForm } from "@/components/ui/ReserveTableForm";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BeanIcon, LeafIcon, HeartIcon, MicIcon } from "@/components/icons";

const swatches = [
  ["cream", "#F4EBDC", "Page ground"],
  ["foam", "#FCF8F1", "Raised surface"],
  ["latte", "#EBDDC6", "Filled panel"],
  ["line", "#DAC7A8", "Borders / rules"],
  ["clay", "#A98763", "Faint / disabled"],
  ["mocha", "#6E5442", "Secondary text"],
  ["espresso", "#2A1C12", "Primary text"],
  ["bean", "#3A2417", "Dark surface"],
  ["bronze", "#9C6F3A", "Accent"],
  ["bronze-soft", "#C89B5E", "Accent on dark"],
];

const type = [
  ["display", "text-display", "Rich & Aromatic"],
  ["hero", "text-hero", "Elevate your day"],
  ["h1", "text-h1", "Why our beans are best"],
  ["h2", "text-h2", "Style for every sip"],
  ["h3", "text-h3", "Caramel Cloud Latte"],
  ["lead", "text-lead", "A quiet corner, a good cup, and something warm from the oven."],
  ["body", "text-body", "We roast in small batches every week and bake the pastries before the doors open."],
  ["small", "text-small", "Oat milk · dark roast · 12oz"],
  ["caption", "text-caption", "Updated this morning"],
];

const products: Product[] = [
  {
    name: "Caramel Cloud Latte",
    price: "£5.00",
    note: "Oat milk, double shot, house caramel",
    image: { src: "/placeholder/latte.svg", alt: "Caramel cloud latte in a glass" },
    rating: { value: 4.7, count: 128 },
    tags: ["Oat"],
  },
  {
    name: "Vanilla Drift Cold Brew",
    price: "£4.50",
    note: "18-hour steep, vanilla, over ice",
    image: { src: "/placeholder/coldbrew.svg", alt: "Vanilla cold brew over ice" },
    badge: "Popular",
    tags: ["Vegan"],
  },
  {
    name: "Almond Croissant",
    price: "£4.00",
    note: "Baked this morning",
    image: { src: "/placeholder/croissant.svg", alt: "Almond croissant" },
    badge: "House favourite",
  },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 border-t border-line py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
      <div className="font-sans text-caption text-mocha">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function Section({
  id,
  title,
  emphasis,
  children,
}: {
  id: string;
  title: string;
  emphasis?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 sm:py-16">
      <SectionHeader title={title} emphasis={emphasis} className="mb-6" />
      {children}
    </section>
  );
}

export default function StyleGuidePage() {
  return (
    <>
      <Navbar
        items={[
          { label: "Menu", href: "/style-guide#components" },
          { label: "Our story", href: "/style-guide#type" },
          { label: "Visit", href: "/style-guide#color" },
        ]}
      />

      <main className="flex-1">
        <Container className="py-16">
          <h1 className="text-hero">
            Khady&rsquo;s Café{" "}
            <span className="italic text-mocha">style guide</span>
          </h1>
          <p className="mt-4 max-w-prose text-lead text-mocha">
            One expressive serif, a warm monochrome palette, and structure built
            from space and hairlines instead of shadows. Everything on this page
            is a live component from{" "}
            <code className="rounded-xs bg-latte px-1.5 py-0.5 text-small">
              components/ui
            </code>
            .
          </p>
        </Container>

        <Container>
          <Section id="color" title="Color" emphasis="warm monochrome">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {swatches.map(([name, hex, use]) => (
                <div
                  key={name}
                  className="overflow-hidden rounded-sm border border-line bg-foam"
                >
                  <div className="h-20" style={{ background: hex }} />
                  <div className="p-3">
                    <div className="font-sans text-small font-medium text-espresso">
                      {name}
                    </div>
                    <div className="font-sans text-caption text-mocha">{hex}</div>
                    <div className="mt-1 font-sans text-caption text-mocha">
                      {use}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="type" title="Typography" emphasis="Fraunces & Hanken">
            <dl className="m-0">
              {type.map(([name, cls, sample]) => (
                <Row key={name} label={name}>
                  <p
                    className={`${cls} ${
                      ["display", "hero", "h1", "h2", "h3"].includes(name)
                        ? "font-display text-espresso"
                        : "font-sans text-espresso"
                    }`}
                  >
                    {sample}
                  </p>
                </Row>
              ))}
              <Row label="italic">
                <p className="font-display text-h2 italic text-mocha">
                  Ethically sourced, freshly roasted
                </p>
              </Row>
            </dl>
          </Section>

          <Section id="components" title="Buttons" emphasis="& links">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" withArrow>
                See the menu
              </Button>
              <Button variant="secondary">Book a table</Button>
              <Button variant="ghost">Not now</Button>
              <Button variant="primary" disabled>
                Sold out
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-6">
              <Button size="sm" variant="secondary">
                Small
              </Button>
              <Button size="md" variant="secondary">
                Medium
              </Button>
              <Button size="lg" variant="secondary">
                Large
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-8">
              <ArrowLink href="/style-guide#components">Browse the menu</ArrowLink>
              <ArrowLink href="/style-guide" direction="left">
                Back to all roasts
              </ArrowLink>
            </div>
          </Section>

          <Section id="tags" title="Tags" emphasis="& ratings">
            <div className="flex flex-wrap items-center gap-3">
              <Tag>Oat</Tag>
              <Tag>Gluten-free</Tag>
              <Tag>Decaf</Tag>
              <Tag variant="solid">New</Tag>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <Rating value={5} count={41} />
              <Rating value={4.5} count={92} />
              <Rating value={3.5} />
            </div>
          </Section>

          <Section id="features" title="Feature cards">
            <div className="grid gap-4 sm:grid-cols-3">
              <FeatureCard
                icon={<BeanIcon />}
                title="Freshly roasted"
                body="Roasted in small batches every week so every cup tastes like it should."
              />
              <FeatureCard
                icon={<LeafIcon />}
                title="Ethically sourced"
                body="Bought direct from growers on terms they set, not the other way round."
              />
              <FeatureCard
                icon={<HeartIcon />}
                title="Made by hand"
                body="Pastries shaped and baked in the back before the doors open."
              />
            </div>
          </Section>

          <Section id="products" title="Product cards">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard
                  key={p.name}
                  product={p}
                  onAdd={(prod) => console.log("add", prod.name)}
                />
              ))}
            </div>
          </Section>

          <Section id="forms" title="Form fields">
            <div className="grid max-w-prose gap-5">
              <Field
                label="Email"
                type="email"
                placeholder="you@example.com"
                hint="For the monthly note about new roasts. No more than that."
              />
              <Field
                label="Name on the order"
                defaultValue="Kh"
                error="Enter the full name so we can call it out."
              />
              <Select
                label="Party size"
                placeholder="Choose party size"
                options={[
                  { value: "1", label: "1 person" },
                  { value: "2", label: "2 people" },
                  { value: "4", label: "4 people" },
                ]}
              />
              <Field
                label="Newsletter"
                type="email"
                placeholder="you@example.com"
                trailing={
                  <Button size="sm" variant="primary">
                    Subscribe
                  </Button>
                }
              />
            </div>
          </Section>

          <Section id="dialog" title="Dialog" emphasis="& reservation form">
            <ReserveTableForm size="md" />
          </Section>

          <Section id="events" title="Event cards">
            <div className="grid gap-6 md:grid-cols-2">
              <EventCard
                image={{
                  src: "/placeholder/coldbrew.svg",
                  alt: "Placeholder",
                }}
                icon={<MicIcon />}
                whenLabel="Every Sunday"
                timeLabel="6:30–9pm"
                title="Sunday open mic"
                blurb="Songs, poems, works in progress. Put your name on the list at the counter."
              />
              <EventCard
                image={{
                  src: "/placeholder/latte.svg",
                  alt: "Placeholder",
                }}
                icon={<BeanIcon />}
                whenLabel="Every Saturday"
                timeLabel="10–11:30am"
                title="Saturday coffee tasting"
                blurb="Sit down with the week's beans and a barista. Free; ten seats."
              />
            </div>
          </Section>

          <Section id="stamp" title="Stamp" emphasis="the one moving thing">
            <Stamp />
          </Section>
        </Container>
      </main>

      <Footer />
    </>
  );
}
