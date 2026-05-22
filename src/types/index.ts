import { LucideIcon } from "lucide-react";

// ============================================================================
// TRUST SECTION (PROVA SOCIAL DAS EMPRESAS)
// ============================================================================

/**
 * Representa os dados de uma empresa exibida no carrossel infinito (Marquee).
 */
export interface BrandLogo {
  /** Nome completo da empresa fictícia (ex: "NovaTech"). */
  name: string;
  /** Abreviação usada para gerar o logotipo no avatar (ex: "NT"). */
  abbr: string;
}

// ============================================================================
// BENEFITS SECTION (MÓDULOS DA MASTERCLASS)
// ============================================================================

/**
 * Representa um módulo ou benefício ensinado no evento, exibido em um card.
 */
export interface Benefit {
  /** Componente de ícone da biblioteca Lucide React. */
  icon: LucideIcon;
  /** Título principal do módulo. */
  title: string;
  /** Descrição detalhada do que será ensinado. */
  description: string;
  /** Etiqueta de categorização (ex: "Módulo 1"). */
  tag: string;
  /** Cor principal do card (CSS value, ex: oklch). Usada para o ícone e tag. */
  color: string;
  /** Cor de fundo do ícone e da tag (geralmente com opacidade reduzida). */
  bg: string;
  /** Cor da borda do ícone e da tag. */
  border: string;
}

// ============================================================================
// TESTIMONIALS SECTION (DEPOIMENTOS DOS ALUNOS)
// ============================================================================

/**
 * Representa um depoimento de um engenheiro que já participou do evento.
 */
export interface Testimonial {
  /** Nome do autor do depoimento. */
  name: string;
  /** Cargo e empresa do autor (ex: "Tech Lead · KrianPy"). */
  role: string;
  /** Iniciais para renderizar o avatar (ex: "RM"). */
  avatar: string;
  /** Texto completo do depoimento. */
  text: string;
  /** Quantidade de estrelas da avaliação (geralmente 5). */
  stars: number;
  /** Frase de destaque extraída do texto completo. */
  highlight: string;
}

// ============================================================================
// HERO SECTION (ESTATÍSTICAS)
// ============================================================================

/**
 * Representa um dado quantitativo ou qualitativo de destaque na primeira dobra.
 */
export interface EventStat {
  /** Componente de ícone da biblioteca Lucide React. */
  icon: LucideIcon;
  /** O valor em destaque (ex: "4.200+", "3h30"). */
  value: string;
  /** A legenda explicativa do dado (ex: "Engenheiros inscritos"). */
  label: string;
}
