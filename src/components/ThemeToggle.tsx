"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Garante que o componente só renderize no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Skeleton sutil enquanto carrega (evita layout shift)
  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-full border border-[var(--color-border-subtle)] bg-[var(--glass-base)]" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 cursor-pointer"
      style={{
        background: "var(--glass-base)",
        border: "1px solid var(--color-border-subtle)",
        color: "var(--color-text-secondary)",
      }}
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {/* O hover State no CSS inline usando pseudo-classes do Tailwind */}
      <div className="absolute inset-0 rounded-full transition-colors hover:bg-[var(--color-border-subtle)]" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={14} strokeWidth={2.5} />
          ) : (
            <Sun size={14} strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
