"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_SECTION_TEXT } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      className="px-6 py-24 sm:px-10 lg:px-16"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl">
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
            {TESTIMONIALS_SECTION_TEXT.tagline}
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {TESTIMONIALS_SECTION_TEXT.title}
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col overflow-hidden rounded-2xl p-7"
              style={{
                background: "var(--glass-base)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              {/* Quotation mark decoration - Atualizado para Hue 290 */}
              <div
                className="font-display pointer-events-none absolute right-6 top-4 select-none text-7xl font-black leading-none"
                style={{ color: "oklch(58% 0.22 290 / 0.08)" }}
                aria-hidden
              >
                "
              </div>

              {/* Stars */}
              <div className="mb-5 flex items-center gap-0.5">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-current"
                    style={{ color: "oklch(78% 0.2 55)" }} /* Dourado mantido */
                  />
                ))}
              </div>

              {/* Highlight quote */}
              <p
                className="font-display mb-4 text-lg font-semibold leading-snug"
                style={{ color: "var(--color-text-primary)" }}
              >
                "{testimonial.highlight}"
              </p>

              {/* Full testimonial */}
              <p
                className="mb-7 text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="mt-auto flex items-center gap-3.5">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(135deg, var(--color-brand-500), var(--color-brand-700))" // Gradiente Púrpura
                        : "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-600))", // Gradiente Magenta
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
