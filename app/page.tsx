"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { clsx } from "clsx";
import LoadingScreen from "@/components/LoadingScreen";
import OverlayText from "@/components/OverlayText";

const FrappuccinoCanvas = dynamic(() => import("@/components/FrappuccinoCanvas"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#130c08]" aria-hidden="true" />,
});

const overviewStats = [
  { label: "Shots of espresso", value: "2X", note: "Small-batch pulled every hour." },
  { label: "Texture calibration", value: "4:1", note: "Ice-to-cream ratio for velvet body." },
  { label: "Signature variants", value: "8", note: "Classic to caramel crunch." },
];

const informationItems = [
  {
    title: "Bean Selection",
    description:
      "Arabica-forward blends from high-altitude farms are roasted to a chocolate-hazelnut profile that keeps sweetness natural.",
  },
  {
    title: "Cold Build Technique",
    description:
      "Micro-crushed ice, dense milk foam, and controlled blending speed keep the body thick without diluting flavor.",
  },
  {
    title: "Finish and Aroma",
    description:
      "A layered top of whipped cream and espresso mist gives every sip a warm aroma before the cold hit lands.",
  },
  {
    title: "Nutrition Clarity",
    description:
      "Every size displays calories, sugar, and caffeine openly so customers can customize with confidence.",
  },
];

const signatureMenu = [
  {
    name: "Classic Espresso Cream",
    size: "Grande",
    price: "$5.40",
    details: "Balanced roast profile with velvet foam.",
  },
  {
    name: "Caramel Cloud Edition",
    size: "Grande",
    price: "$5.90",
    details: "Toasted sugar finish with caramel ribbon.",
  },
  {
    name: "Mocha Velvet",
    size: "Venti",
    price: "$6.20",
    details: "Dark cocoa body and espresso bloom.",
  },
];

const partnerLocations = ["Downtown Brew Hall", "North Avenue Pickup", "Campus Coffee Lab", "Central Mall Spot"];

const testimonials = [
  {
    quote:
      "This tastes like a premium dessert and a serious coffee in the same cup. I finally found my daily order.",
    author: "Maya R.",
    role: "Product Designer",
  },
  {
    quote:
      "The texture is unreal. Not watery, not too sweet, just balanced. You can tell the recipe was engineered.",
    author: "Jonathan P.",
    role: "Creative Director",
  },
  {
    quote:
      "I tried it once for the visuals, now I come back for the consistency. Same quality every single time.",
    author: "Lina S.",
    role: "Marketing Lead",
  },
];

const faqItems = [
  {
    question: "Do I need an account to order?",
    answer: "No. Checkout works as guest by default, and pickup details are confirmed instantly.",
  },
  {
    question: "Can I request less sugar or extra ice?",
    answer: "Yes. Use the notes field and the barista workflow will apply your preferences.",
  },
  {
    question: "How long does pickup usually take?",
    answer: "Most orders are ready in 10 to 15 minutes, depending on queue volume.",
  },
];

const navItems = [
  { href: "#overview", label: "Overview" },
  { href: "#menu", label: "Menu" },
  { href: "#information", label: "Information" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#order", label: "Order" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 260 : 110,
    damping: prefersReducedMotion ? 40 : 28,
    restDelta: 0.001,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.84, 0.94, 1], [1, 1, 0, 0]);
  const heroPointerEvents = useTransform(smoothProgress, (value) =>
    value > 0.9 ? "none" : "auto"
  );

  const ctaOpacity = useTransform(smoothProgress, [0.78, 0.86, 1], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.78, 0.86, 1], [40, 0, 0]);

  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.08, 0.2], [1, 1, 0]);
  const navProgress = useTransform(smoothProgress, [0, 1], [0, 1]);

  const revealProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.24 },
        transition: { duration: 0.6 },
      };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#120c08] pb-24 text-white md:pb-0">
      <LoadingScreen onLoaded={() => setIsLoaded(true)} />

      <header className="fixed top-4 left-4 right-4 z-40">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-[#f6c35d]/20 bg-[#110b07]/72 px-5 py-3 backdrop-blur-md md:px-7">
          <a href="#top" className="cursor-pointer font-serif text-2xl text-[#f8f1e7] md:text-3xl">
            Frappuccino Atelier
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="cursor-pointer text-sm tracking-[0.16em] text-[#f8ebd8]/82 transition-colors duration-200 hover:text-[#f6c35d]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#order"
            className="cursor-pointer rounded-full border border-[#f6c35d]/50 bg-gradient-to-r from-[#f6c35d] to-[#d9a441] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#2a160b] transition-colors duration-200 hover:from-[#ffd487] hover:to-[#e6b757] md:text-sm"
          >
            ORDER
          </a>
        </div>

        <motion.div
          style={{ scaleX: navProgress, transformOrigin: "0% 50%" }}
          className="mx-auto mt-2 h-0.5 w-full max-w-7xl rounded-full bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#fde68a]"
        />
      </header>

      <section
        id="top"
        ref={heroRef}
        className={clsx("relative", prefersReducedMotion ? "h-[180vh]" : "h-[420vh]")}
      >
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ opacity: heroOpacity, pointerEvents: heroPointerEvents }}
              className="fixed inset-0 z-10"
            >
              <FrappuccinoCanvas
                scrollProgress={smoothProgress}
                reducedMotion={Boolean(prefersReducedMotion)}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#120c08]/20 via-transparent to-[#120c08]/80" />

              <OverlayText
                scrollProgress={smoothProgress}
                start={0}
                end={0.18}
                title="GLORIOUS."
                subtitle="A cinematic Frappuccino crafted for first-sip impact."
                align="center"
              />

              <OverlayText
                scrollProgress={smoothProgress}
                start={0.24}
                end={0.44}
                title="Engineered Espresso."
                subtitle="Double-shot extraction, balanced sweetness, and a smooth cold finish."
                align="left"
              />

              <OverlayText
                scrollProgress={smoothProgress}
                start={0.5}
                end={0.7}
                title="Texture You Remember."
                subtitle="Crystalline ice blend and cloud-peak cream built for every sip."
                align="right"
              />

              <OverlayText
                scrollProgress={smoothProgress}
                start={0.74}
                end={0.84}
                title="Crowd-Approved."
                subtitle="Rated 4.9 by guests who want dessert and coffee in one cup."
                align="center"
              />

              <div className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center justify-center px-4">
                <motion.div
                  style={{ opacity: ctaOpacity, y: ctaY }}
                  className="pointer-events-auto flex flex-col items-center gap-6"
                >
                  <h2 className="text-center font-serif text-5xl leading-[0.95] text-[#fbbf24] md:text-7xl lg:text-8xl">
                    YOURS TO HOLD.
                  </h2>
                  <p className="text-center text-xs tracking-[0.22em] text-[#f8e5c2]/85 uppercase md:text-sm">
                    Premium cold craft, revealed as you scroll
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#order"
                      className="cursor-pointer rounded-full bg-[#fbbf24] px-6 py-3 text-center text-sm font-semibold tracking-[0.14em] text-[#2c1b11] transition-colors duration-200 hover:bg-[#ffd97a]"
                    >
                      ORDER NOW
                    </a>
                    <a
                      href="#menu"
                      className="cursor-pointer rounded-full border border-[#f6ce87]/60 bg-[#120c08]/40 px-6 py-3 text-center text-sm font-semibold tracking-[0.14em] text-[#f8e5c2] transition-colors duration-200 hover:bg-[#120c08]/65"
                    >
                      VIEW MENU
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoaded && (
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="pointer-events-none fixed right-5 bottom-20 z-30 rounded-full border border-white/20 bg-[#120c08]/55 px-4 py-2 text-[11px] tracking-[0.2em] text-white/70 uppercase md:bottom-6"
          >
            Scroll to reveal
          </motion.div>
        )}
      </section>

      <div className="relative z-20 bg-[var(--color-cream)] pb-16 text-[var(--color-ink)]">
        <section className="border-y border-[#eccda3] bg-gradient-to-r from-[#fef3dc] via-[#fdebcf] to-[#fbe5c1]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#7a4518] uppercase md:text-sm">
              New online offer: Use code FIRSTSIP for 10% off your first digital order.
            </p>
            <a
              href="#order"
              className="w-fit cursor-pointer rounded-full border border-[#c68039] px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#7a4518] transition-colors duration-200 hover:bg-[#f5cf93]"
            >
              APPLY OFFER
            </a>
          </div>
        </section>

        <motion.section
          id="overview"
          {...revealProps}
          className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8"
        >
          <p className="text-sm tracking-[0.22em] text-[#92400e] uppercase">Overview</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <h2 className="max-w-3xl font-serif text-4xl leading-tight text-[#2c1b11] md:text-6xl">
                The Frappuccino Experience Designed Like a Product, Not Just a Drink.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5f4632] md:text-lg">
                This website combines cinematic storytelling and clear buying flow. You explore the
                drink in motion, understand what makes it different, trust it through testimonials,
                then order in seconds.
              </p>
            </div>
            <div className="rounded-3xl border border-[#f4d4a5] bg-white/85 p-6 shadow-[0_20px_45px_rgba(75,42,12,0.14)]">
              <p className="text-sm tracking-[0.2em] text-[#92400e] uppercase">Today&apos;s Highlight</p>
              <p className="mt-3 font-serif text-3xl text-[#2c1b11] md:text-4xl">Caramel Cloud Edition</p>
              <p className="mt-3 text-sm leading-relaxed text-[#6f523a]">
                Caramel ribbon, toasted sugar finish, and cold espresso bloom.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {overviewStats.map((item) => (
              <article
                key={item.label}
                className="rounded-3xl border border-[#e7c08f] bg-[#fffaf0] p-6 shadow-[0_18px_34px_rgba(69,40,16,0.14)]"
              >
                <p className="font-serif text-4xl text-[#7c2d12]">{item.value}</p>
                <p className="mt-2 text-sm tracking-[0.15em] text-[#92400e] uppercase">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5f4632]">{item.note}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="menu"
          {...revealProps}
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm tracking-[0.22em] text-[#92400e] uppercase">Signature Menu</p>
              <h2 className="mt-3 font-serif text-4xl text-[#2c1b11] md:text-5xl">Built for Flavor and Speed</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#6f523a] md:text-base">
              Transparent pricing, clear size options, and fast pickup timing to reduce checkout friction.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {signatureMenu.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-[#e4bb87] bg-[#fffbf4] p-7 shadow-[0_20px_40px_rgba(82,49,21,0.14)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl text-[#3b2414]">{item.name}</h3>
                  <p className="text-sm tracking-[0.12em] text-[#7a4f2f] uppercase">{item.size}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#634932]">{item.details}</p>
                <p className="mt-6 text-3xl font-semibold text-[#7c2d12]">{item.price}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="information"
          {...revealProps}
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm tracking-[0.22em] text-[#92400e] uppercase">
                Information About Frappuccino
              </p>
              <h2 className="mt-3 font-serif text-4xl text-[#2c1b11] md:text-5xl">
                What Makes It Premium
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#6f523a] md:text-base">
              Every cup follows a measured process from bean profile to blending cadence, so flavor
              and mouthfeel stay consistent even at peak hours.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {informationItems.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[#e4bb87] bg-[#fffbf4] p-7 shadow-[0_20px_40px_rgba(82,49,21,0.14)]"
              >
                <h3 className="font-serif text-3xl text-[#3b2414]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#634932] md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...revealProps} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm tracking-[0.22em] text-[#92400e] uppercase">Available At</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl text-[#2c1b11] md:text-5xl">
            Trusted by pickup locations across the city.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerLocations.map((location) => (
              <div
                key={location}
                className="rounded-2xl border border-[#e8c69d] bg-white/85 px-5 py-6 text-center text-sm font-semibold tracking-[0.08em] text-[#6f4e32] uppercase"
              >
                {location}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="testimonials"
          {...revealProps}
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <p className="text-sm tracking-[0.22em] text-[#92400e] uppercase">Testimonials</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl text-[#2c1b11] md:text-5xl">
            Loved by people who care about flavor and finish.
          </h2>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.author}
                className="rounded-3xl border border-[#e5bd8d] bg-[#fffdf8] p-7 shadow-[0_20px_38px_rgba(80,47,20,0.13)]"
              >
                <blockquote className="text-base leading-relaxed text-[#4e3725]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-[#efdabf] pt-4">
                  <p className="font-serif text-2xl text-[#2c1b11]">{testimonial.author}</p>
                  <p className="text-sm tracking-[0.08em] text-[#7a5d45] uppercase">
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="faq"
          {...revealProps}
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <p className="text-sm tracking-[0.22em] text-[#92400e] uppercase">FAQ</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl text-[#2c1b11] md:text-5xl">
            Quick answers before you place your order.
          </h2>

          <div className="mt-10 grid gap-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-[#e7c08f] bg-[#fffaf0] p-5"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-[#3b2414]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#5f4632] md:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="order"
          {...revealProps}
          className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-[#e7be8f] bg-gradient-to-br from-[#381f0e] via-[#2a170c] to-[#160d07] p-7 text-[#f8f1e7] shadow-[0_24px_70px_rgba(56,31,14,0.35)] md:p-10">
            <div className="pointer-events-none absolute -top-14 -right-14 h-48 w-48 rounded-full bg-[#fbbf24]/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-[#f59e0b]/20 blur-2xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-sm tracking-[0.22em] text-[#f6ce87] uppercase">Get Your Frappuccino</p>
                <h2 className="mt-3 max-w-md font-serif text-4xl leading-tight text-[#fff7ea] md:text-5xl">
                  Place Your Cup in Under One Minute.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-[#ecd7b9] md:text-base">
                  Pick your style, size, and pickup window. Your personalized Frappuccino starts as
                  soon as you confirm.
                </p>
                <div className="mt-8 rounded-2xl border border-[#f0c78e]/30 bg-[#f8f1e7]/6 p-5">
                  <p className="text-xs tracking-[0.2em] text-[#f6ce87] uppercase">Quick Promise</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#f4e6d0]">
                    No long forms. No account needed. Priority pickup lane for digital orders.
                  </p>
                </div>
              </div>

              <form className="grid gap-4 rounded-3xl border border-[#f0c78e]/30 bg-[#ffffff]/5 p-6 backdrop-blur-sm">
                <label className="text-sm text-[#f6ddbe]">
                  Full name
                  <input
                    type="text"
                    name="name"
                    placeholder="Alex Carter"
                    className="mt-2 w-full rounded-xl border border-[#f3d6ae]/30 bg-[#fff8ed]/10 px-4 py-3 text-sm text-white placeholder:text-[#f6ddbe]/65 outline-none transition-colors duration-200 focus:border-[#fbbf24]"
                  />
                </label>

                <label className="text-sm text-[#f6ddbe]">
                  Email for receipt and offers
                  <input
                    type="email"
                    name="email"
                    placeholder="alex@email.com"
                    className="mt-2 w-full rounded-xl border border-[#f3d6ae]/30 bg-[#fff8ed]/10 px-4 py-3 text-sm text-white placeholder:text-[#f6ddbe]/65 outline-none transition-colors duration-200 focus:border-[#fbbf24]"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm text-[#f6ddbe]">
                    Size
                    <select
                      name="size"
                      className="mt-2 w-full cursor-pointer rounded-xl border border-[#f3d6ae]/30 bg-[#fff8ed]/10 px-4 py-3 text-sm text-white outline-none transition-colors duration-200 focus:border-[#fbbf24]"
                      defaultValue="Grande"
                    >
                      <option value="Tall">Tall</option>
                      <option value="Grande">Grande</option>
                      <option value="Venti">Venti</option>
                    </select>
                  </label>

                  <label className="text-sm text-[#f6ddbe]">
                    Pickup window
                    <select
                      name="pickup"
                      className="mt-2 w-full cursor-pointer rounded-xl border border-[#f3d6ae]/30 bg-[#fff8ed]/10 px-4 py-3 text-sm text-white outline-none transition-colors duration-200 focus:border-[#fbbf24]"
                      defaultValue="In 15 minutes"
                    >
                      <option value="In 10 minutes">In 10 minutes</option>
                      <option value="In 15 minutes">In 15 minutes</option>
                      <option value="In 30 minutes">In 30 minutes</option>
                    </select>
                  </label>
                </div>

                <label className="text-sm text-[#f6ddbe]">
                  Flavor preference
                  <select
                    name="flavor"
                    className="mt-2 w-full cursor-pointer rounded-xl border border-[#f3d6ae]/30 bg-[#fff8ed]/10 px-4 py-3 text-sm text-white outline-none transition-colors duration-200 focus:border-[#fbbf24]"
                    defaultValue="Classic coffee"
                  >
                    <option value="Classic coffee">Classic coffee</option>
                    <option value="Caramel cloud">Caramel cloud</option>
                    <option value="Mocha velvet">Mocha velvet</option>
                    <option value="Vanilla silk">Vanilla silk</option>
                  </select>
                </label>

                <label className="text-sm text-[#f6ddbe]">
                  Promo code
                  <input
                    type="text"
                    name="promo"
                    placeholder="FIRSTSIP"
                    className="mt-2 w-full rounded-xl border border-[#f3d6ae]/30 bg-[#fff8ed]/10 px-4 py-3 text-sm text-white placeholder:text-[#f6ddbe]/65 outline-none transition-colors duration-200 focus:border-[#fbbf24]"
                  />
                </label>

                <label className="text-sm text-[#f6ddbe]">
                  Notes
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Less sweet, extra ice, etc."
                    className="mt-2 w-full rounded-xl border border-[#f3d6ae]/30 bg-[#fff8ed]/10 px-4 py-3 text-sm text-white placeholder:text-[#f6ddbe]/65 outline-none transition-colors duration-200 focus:border-[#fbbf24]"
                  />
                </label>

                <button
                  type="button"
                  className="cursor-pointer rounded-xl bg-[#fbbf24] px-5 py-3 text-sm font-semibold tracking-[0.15em] text-[#2c1b11] transition-colors duration-200 hover:bg-[#ffd97a]"
                >
                  CONFIRM MY FRAPPUCCINO
                </button>
              </form>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="fixed right-4 bottom-4 left-4 z-40 flex items-center gap-3 rounded-2xl border border-[#f6c35d]/30 bg-[#1a120c]/92 p-3 shadow-[0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm md:hidden">
        <a
          href="#menu"
          className="flex-1 cursor-pointer rounded-xl border border-[#f6c35d]/35 px-4 py-3 text-center text-xs font-semibold tracking-[0.12em] text-[#f8e5c2]"
        >
          VIEW MENU
        </a>
        <a
          href="#order"
          className="flex-1 cursor-pointer rounded-xl bg-[#fbbf24] px-4 py-3 text-center text-xs font-semibold tracking-[0.12em] text-[#2a160b]"
        >
          ORDER NOW
        </a>
      </div>

      <footer className="border-t border-white/10 bg-[#120c08] px-4 py-7 text-center text-xs tracking-[0.16em] text-white/65 uppercase sm:px-6 lg:px-8">
        Frappuccino Atelier. Crafted for texture, aroma, and repeat cravings.
      </footer>
    </main>
  );
}
