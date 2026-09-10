import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { EventCard } from "@/components/ui/EventCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ReserveTableForm } from "@/components/ui/ReserveTableForm";
import { ClockIcon, PinIcon, MicIcon, CupIcon } from "@/components/icons";
import { cafe } from "@/data/cafe";
import { featuredItems } from "@/data/menu";
import { menuItemToProduct } from "@/lib/menu";
import { weeklyEvents } from "@/data/events";
import { nextOccurrences, formatEventDay, formatEventTime } from "@/lib/events";

export const metadata: Metadata = {
  title: { absolute: "Khady's Café — coffee & pastries in London" },
  description:
    "A neighbourhood specialty-coffee shop on Lauriston Road, east London. Small-batch coffee, pastries baked every morning, weekly open mic and coffee tastings.",
};

// "Open today" and the next event dates are computed from the current date, so
// rebuild the page hourly rather than freezing it at build time.
export const revalidate = 3600;

const eventIcon = { mic: <MicIcon />, cup: <CupIcon /> } as const;

export default function HomePage() {
  const todayHours = cafe.hours[(new Date().getDay() + 6) % 7];
  const occurrences = nextOccurrences(weeklyEvents);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate flex min-h-[30rem] items-center overflow-hidden sm:min-h-[36rem]">
          <Image
            src="/images/hero-counter.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-bean/80" />
          <Container className="py-24 text-center">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
              <p className="font-sans text-small text-cream/80">
                Lauriston Road, east London
              </p>
              <h1 className="font-display text-h1 lowercase italic text-cream sm:text-hero lg:text-display">
                khady&rsquo;s café
              </h1>
              <p className="max-w-md text-lead text-cream">
                Specialty coffee, pastries baked every morning, and a short lunch
                menu. A warm corner to sit in.
              </p>
            </div>
          </Container>
        </section>

        {/* Reserve + hours strip */}
        <section className="border-b border-line bg-cream">
          <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ReserveTableForm size="md" />
              <ArrowLink href="/menu">See the menu</ArrowLink>
            </div>
            <div className="flex flex-col gap-1.5 text-small text-mocha sm:items-end">
              <span className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 shrink-0 text-bronze" />
                Open today, {todayHours.label}
              </span>
              <span className="flex items-center gap-2">
                <PinIcon className="h-4 w-4 shrink-0 text-bronze" />
                {cafe.address.oneLine}
              </span>
            </div>
          </Container>
        </section>

        {/* Featured */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeader
              title="On the counter"
              emphasis="right now"
              intro="The things people come back for. The full list is on the menu."
              action={<ArrowLink href="/menu">See the full menu</ArrowLink>}
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredItems.map((item) => (
                <ProductCard
                  key={item.slug}
                  product={menuItemToProduct(item)}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Events */}
        <section className="border-t border-line bg-foam py-16 sm:py-24">
          <Container>
            <SectionHeader
              title="What’s on"
              emphasis="every week"
              intro="Two standing dates. No ticket — just turn up."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {occurrences.map(({ event, date }) => (
                <EventCard
                  key={event.slug}
                  image={event.image}
                  icon={eventIcon[event.icon]}
                  whenLabel={formatEventDay(date)}
                  timeLabel={formatEventTime(event)}
                  title={event.title}
                  blurb={event.blurb}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* About teaser */}
        <section className="py-16 sm:py-24">
          <Container className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-4/3 overflow-hidden rounded-md bg-latte">
              <Image
                src="/images/about-counter-detail.webp"
                alt="A barista pouring milk into a cup at the counter"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-h1 text-espresso">
                Started with{" "}
                <span className="italic text-mocha">one machine</span>
              </h2>
              <p className="mt-4 max-w-prose text-body text-mocha">
                Khady Diallo opened the café in {cafe.foundedYear} with a
                secondhand espresso machine and a short list of regulars. The
                machine is still here. So are most of the regulars.
              </p>
              <div className="mt-6">
                <ArrowLink href="/about">Read our story</ArrowLink>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
