"use client";

import { Orbit } from "lucide-react";
import { BRAND_NAME, FOOTER_TEXT, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t px-6 py-10 sm:px-10"
      style={{ borderColor: "var(--color-border-subtle)" }}
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))", // Gradiente Púrpura para Magenta
            }}
          >
            <Orbit size={13} className="text-white" strokeWidth={2.5} />
          </div>
          <span
            className="font-display text-sm font-bold"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {BRAND_NAME}
          </span>
        </div>

        {/* Copyright */}
        <p
          className="text-center text-xs"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          © {currentYear} {BRAND_NAME}. {FOOTER_TEXT.copyright}
        </p>

        {/* Links */}
        <nav className="flex items-center gap-5" aria-label="Links legais">
          {FOOTER_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs transition-colors duration-150 hover:opacity-80"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
