"use client";

import { BRAND_LOGOS, TRUST_SECTION_TEXT } from "@/lib/constants";

export function Trust() {
  // Duplicate logos to create seamless loop
  const allLogos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section
      className="relative overflow-hidden border-y py-10"
      style={{
        borderColor: "var(--color-border-subtle)",
        background: "var(--glass-base)",
      }}
      aria-label={TRUST_SECTION_TEXT.title}
    >
      {/* Edge fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
        style={{
          background:
            "linear-gradient(to right, var(--color-surface-0), transparent)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
        style={{
          background:
            "linear-gradient(to left, var(--color-surface-0), transparent)",
        }}
        aria-hidden
      />

      <p
        className="mb-6 text-center text-xs font-medium uppercase tracking-widest"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {TRUST_SECTION_TEXT.title}
      </p>

      <div className="marquee-wrapper overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2.5 rounded-xl px-5 py-2.5 transition-all duration-200"
              style={{
                background: "var(--glass-strong)",
                border: "1px solid var(--color-border-subtle)",
              }}
              aria-label={logo.name}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-black text-white"
                style={{
                  background: `linear-gradient(135deg, oklch(65% 0.22 ${280 + ((i * 15) % 60)}), oklch(55% 0.24 ${300 + ((i * 15) % 60)}))`,
                }}
              >
                {logo.abbr}
              </div>
              <span
                className="font-display text-sm font-semibold"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
