import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Stamp } from "@/components/ui/Stamp";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { cafe } from "@/data/cafe";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "How Khady's Café started — a narrow unit on Lauriston Road, a secondhand espresso machine, and a short list of regulars.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Container className="py-16 sm:py-24">
          <h1 className="text-hero text-espresso">Our story</h1>
          <p className="mt-4 max-w-prose text-lead text-mocha">
            Khady&rsquo;s Café has been on the same corner of Lauriston Road since{" "}
            {cafe.foundedYear}. Here&rsquo;s how it got there.
          </p>
        </Container>

        <Container className="pb-10">
          <div className="relative aspect-3/2 overflow-hidden rounded-md bg-latte">
            <Image
              src="/images/about-founders.webp"
              alt="The counter and pastry case at Khady's Café"
              fill
              sizes="(max-width: 1240px) 100vw, 1192px"
              className="object-cover"
            />
          </div>
        </Container>

        <Container
          width="prose"
          className="flex flex-col gap-6 pb-16 text-body text-espresso sm:pb-24"
        >
          <p>
            The unit was a dry cleaner before it was a café — narrow, a bit dark,
            with a good window. Khady Diallo had been pulling shots in other
            people&rsquo;s cafés for six years and wanted somewhere that felt less
            like a shop and more like a front room. In {cafe.foundedYear} she
            signed the lease, bought a secondhand espresso machine, and painted
            the walls the colour of oat milk.
          </p>
          <p>
            The idea was simple: take the coffee seriously, and never make anyone
            feel they need the vocabulary to order it. Single-origin if you want
            to talk about it, &ldquo;the usual&rdquo; if you don&rsquo;t. The
            machine she started with is still on the counter. It still needs a
            firm hand on the group handle.
          </p>
          <p>
            The pastries began as a favour. A friend, Joan, turned up one morning
            with a tray of croissants and an opinion about the ones Khady had been
            buying in. Joan now runs the small kitchen at the back and everything
            is baked before seven — the almond croissants usually go first.
          </p>

          <blockquote className="py-6 text-center">
            <p className="font-display text-h2 italic text-mocha">
              &ldquo;A good café is mostly a room where people are glad to see
              you.&rdquo;
            </p>
            <cite className="mt-4 block font-sans text-small not-italic text-mocha">
              Khady Diallo
            </cite>
          </blockquote>

          <p>
            The Sunday open mic started because a regular asked if he could bring
            his guitar. The Saturday coffee tastings started because Khady
            can&rsquo;t help herself. Both are still going. The corner table still
            wobbles; we&rsquo;ve stopped apologising for it.
          </p>
          <p>
            If you&rsquo;re new to the neighbourhood, come in and say hello. If
            you&rsquo;ve been coming for years — you know where the good seat is.
          </p>

          <div className="flex justify-center pt-8">
            <Stamp center={`Est. ${cafe.foundedYear}`} />
          </div>

          <div className="pt-2">
            <ArrowLink href="/menu">See what&rsquo;s on the menu</ArrowLink>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
