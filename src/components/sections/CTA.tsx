"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTA_SECTION_TEXT } from "@/lib/constants";

export function CTA() {
  return (
    <section
      className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16"
      aria-labelledby="cta-heading"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(58% 0.22 290 / 0.08) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="cta-heading"
            className="font-display mb-4 text-3xl font-extrabold sm:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {CTA_SECTION_TEXT.titleLine1}
            <br />
            <span className="gradient-text">{CTA_SECTION_TEXT.titleLine2}</span>
          </h2>
          <p
            className="mb-8 text-base leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {CTA_SECTION_TEXT.description}
          </p>
          <a
            href="#inscricao"
            className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%)",
              boxShadow: "var(--shadow-glow-brand)",
            }}
          >
            {CTA_SECTION_TEXT.buttonText}
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <p
            className="mt-4 text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {CTA_SECTION_TEXT.footerText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
