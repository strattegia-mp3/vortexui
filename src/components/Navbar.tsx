"use client";

import { motion } from "framer-motion";
import { ChevronRight, Orbit } from "lucide-react";
import { BRAND_NAME, NAVBAR_TEXT } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 sm:px-10"
      style={{
        background: "var(--glass-strong)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      {/* Marca / Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))",
          }}
        >
          <Orbit size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <span
          className="font-display text-sm font-bold tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {BRAND_NAME}
        </span>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2">
        {/* Badge "Ao vivo" (Exibido apenas de tablet para cima) */}
        <div
          className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium sm:flex"
          style={{
            background: "oklch(68% 0.22 148 / 0.1)",
            border: "1px solid oklch(68% 0.22 148 / 0.25)",
            color: "var(--color-success-500)",
          }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full animate-pulse-glow"
            style={{ background: "var(--color-success-500)" }}
          />
          {NAVBAR_TEXT.liveBadge}
        </div>

        <ThemeToggle />

        {/* Botão de Inscrição */}
        <a
          href="#inscricao"
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-600), var(--color-brand-800))",
            boxShadow: "0 4px 14px -2px oklch(58% 0.22 290 / 0.4)",
          }}
        >
          {NAVBAR_TEXT.ctaButton}
          <ChevronRight size={12} strokeWidth={2.5} />
        </a>
      </div>
    </motion.nav>
  );
}
