import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// --- Font Optimization ---
const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

// --- SEO & Social Metadata ---
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://vortexui-delta.vercel.app",
  ),
  title: {
    default: "VortexUI — Masterclass Arquitetura Escalável",
    template: "%s | VortexUI",
  },
  description:
    "Aprenda a arquitetar sistemas que suportam milhões de usuários. Masterclass gratuita com os frameworks, padrões e decisões de design usados pelos melhores times de engenharia do mundo.",
  keywords: [
    "arquitetura escalável",
    "masterclass",
    "sistemas distribuídos",
    "engenharia de software",
    "backend",
    "microserviços",
    "event-driven",
    "cloud native",
  ],
  authors: [{ name: "VortexUI", url: "https://vortexui-delta.vercel.app" }],
  creator: "VortexUI",
  alternates: {
    canonical: "/", // Previne punições de SEO por conteúdo duplicado
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "VortexUI",
    title: "Masterclass Arquitetura Escalável — Gratuita",
    description:
      "O único evento online que revela como arquitetos sênior projetam sistemas que não quebram sob pressão. Vagas limitadas.",
    images: [
      {
        url: "/og/og-image.webp",
        width: 1200,
        height: 630,
        alt: "VortexUI — Masterclass Arquitetura Escalável",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VortexUI — Masterclass Arquitetura Escalável",
    description:
      "Aprenda a arquitetar sistemas que suportam milhões de usuários. 100% gratuito.",
    images: ["/og/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "./favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#150b1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// --- Root Layout ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Masterclass Arquitetura Escalável",
              description:
                "Masterclass online e gratuita sobre arquitetura de sistemas escaláveis.",
              startDate: "2026-01-24T19:00:00-03:00", // Data de início obrigatória para SEO de eventos
              endDate: "2026-01-24T22:30:00-03:00", // Data de término recomendada
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OnlineEventAttendanceMode",
              location: {
                "@type": "VirtualLocation",
                url: "https://vortexui-delta.vercel.app",
              },
              organizer: {
                "@type": "Organization",
                name: "VortexUI",
                url: "https://vortexui-delta.vercel.app",
              },
              isAccessibleForFree: true,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
                validFrom: "2026-01-01T00:00:00-03:00",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>

        {/* Vercel Analytics (Métricas nativas do painel Vercel) */}
        <Analytics />

        {/* Google Analytics (Carregamento assíncrono e otimizado) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
