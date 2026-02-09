"use client";

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
import FrappuccinoCanvas from "@/components/FrappuccinoCanvas";
import LoadingScreen from "@/components/LoadingScreen";
import OverlayText from "@/components/OverlayText";

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

const navItems = [
  { href: "#overview", label: "Overview" },
  { href: "#information", label: "Information" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#order", label: "Get Your Frappuccino" },
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
    <main className="relative min-h-screen overflow-x-hidden text-white">
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
                  className="flex flex-col items-center gap-6"
                >
                  <h2 className="text-center font-serif text-5xl leading-[0.95] text-[#fbbf24] md:text-7xl lg:text-8xl">
                    YOURS TO HOLD.
                  </h2>
                  <p className="text-xs tracking-[0.22em] text-[#f8e5c2]/85 uppercase md:text-sm">
                    Premium cold craft, revealed as you scroll
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoaded && (
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="pointer-events-none fixed right-5 bottom-6 z-30 rounded-full border border-white/20 bg-[#120c08]/55 px-4 py-2 text-[11px] tracking-[0.2em] text-white/70 uppercase"
          >
            Scroll to reveal
          </motion.div>
        )}
      </section>

      <div className="relative z-20 bg-[var(--color-cream)] pb-16 text-[var(--color-ink)]">
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

      <footer className="border-t border-white/10 bg-[#120c08] px-4 py-7 text-center text-xs tracking-[0.16em] text-white/65 uppercase sm:px-6 lg:px-8">
        Frappuccino Atelier. Crafted for texture, aroma, and repeat cravings.
      </footer>
    </main>
  );
}
