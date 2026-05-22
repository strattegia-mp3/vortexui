"use client";

import { motion } from "framer-motion";
import { BENEFITS, BENEFITS_SECTION_TEXT } from "@/lib/constants";

export function Benefits() {
  return (
    <section
      id="conteudo"
      className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
      aria-labelledby="benefits-heading"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(58% 0.22 290 / 0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-brand-400)" }}
          >
            {BENEFITS_SECTION_TEXT.tagline}
          </p>
          <h2
            id="benefits-heading"
            className="font-display mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {BENEFITS_SECTION_TEXT.title}{" "}
            <span className="gradient-text-brand">
              {BENEFITS_SECTION_TEXT.highlight}
            </span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {BENEFITS_SECTION_TEXT.description}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col overflow-hidden rounded-2xl p-6"
                style={{
                  background: "var(--glass-base)",
                  border: "1px solid var(--color-border-subtle)",
                  boxShadow: "var(--shadow-glass)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${benefit.color}15 0%, transparent 60%)`,
                  }}
                  aria-hidden
                />

                {/* Tag */}
                <span
                  className="mb-4 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: benefit.bg,
                    border: `1px solid ${benefit.border}`,
                    color: benefit.color,
                  }}
                >
                  {benefit.tag}
                </span>

                {/* Icon */}
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: benefit.bg,
                    border: `1px solid ${benefit.border}`,
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={1.75}
                    style={{ color: benefit.color }}
                  />
                </div>

                {/* Content */}
                <h3
                  className="font-display mb-3 text-base font-bold leading-snug"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
