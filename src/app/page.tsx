"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import {
  Navbar,
  Hero,
  Trust,
  Benefits,
  Testimonials,
  CTA,
  Footer,
} from "@/components";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Barra de progresso de leitura */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX,
          background:
            "linear-gradient(90deg, var(--color-brand-500), var(--color-accent-500))",
        }}
        aria-hidden
      />

      <Navbar />

      <main>
        <Hero />
        <Trust />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
