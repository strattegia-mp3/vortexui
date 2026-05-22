"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import {
  EVENT_STATS,
  HERO_SECTION_TEXT,
  SOCIAL_AVATARS,
} from "@/lib/constants";
import { LeadForm } from "../LeadForm";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-16"
    >
      {/* Background blobs definidos no globals.css */}
      <div
        className="bg-blob-1 pointer-events-none absolute -left-48 top-10"
        aria-hidden
      />
      <div
        className="bg-blob-2 pointer-events-none absolute -right-32 top-1/3"
        aria-hidden
      />

      {/* Gradiente adicional inline atualizado para Púrpura (290) e Magenta (330) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, oklch(58% 0.22 290 / 0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, oklch(72% 0.22 330 / 0.05) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — Copy */}
        <div className="flex flex-col">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "var(--glass-base)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            <Play
              size={10}
              className="fill-current"
              style={{ color: "var(--color-accent-500)" }}
            />
            <span
              className="text-xs font-semibold tracking-wide"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {HERO_SECTION_TEXT.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {HERO_SECTION_TEXT.titleStart}
            <span className="gradient-text">
              {HERO_SECTION_TEXT.titleHighlight}
            </span>
            {HERO_SECTION_TEXT.titleEnd}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {HERO_SECTION_TEXT.descriptionStart}
            <span
              style={{ color: "var(--color-text-primary)" }}
              className="font-medium"
            >
              {HERO_SECTION_TEXT.descriptionHighlight}
            </span>
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-6"
          >
            {EVENT_STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    background: "var(--glass-base)",
                    border: "1px solid var(--color-border-subtle)",
                  }}
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    style={{ color: "var(--color-brand-400)" }}
                  />
                </div>
                <div>
                  <p
                    className="font-display text-sm font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social proof avatars */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2.5">
              {SOCIAL_AVATARS.map((avatar, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2"
                  style={
                    {
                      background: avatar.color,
                      "--tw-ring-color": "var(--color-surface-0)",
                    } as React.CSSProperties
                  }
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
                    className="fill-current"
                    style={{
                      color: "oklch(78% 0.2 55)",
                    }} /* Dourado da estrela */
                  />
                ))}
              </div>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {HERO_SECTION_TEXT.rating} · {HERO_SECTION_TEXT.socialProofText}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — Form */}
        <motion.div
          id="inscricao"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:max-w-md lg:justify-self-end"
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}
