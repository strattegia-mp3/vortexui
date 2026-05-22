import {
  Zap,
  GitBranch,
  Globe2,
  BarChart3,
  CalendarDays,
  Users,
  Clock,
} from "lucide-react";
import { BrandLogo, Benefit, Testimonial, EventStat } from "@/types";

// Textos da Navbar
export const NAVBAR_TEXT = {
  liveBadge: "Evento ao vivo · 24 Jan",
  ctaButton: "Garantir vaga",
};

// Textos da seção Hero (Início)
export const HERO_SECTION_TEXT = {
  badge: "Masterclass · Online · 100% Gratuita",
  titleStart: "Arquitete sistemas ",
  titleHighlight: "que não quebram",
  titleEnd: " quando mais importa",
  descriptionStart:
    "Uma aula densa com os padrões, frameworks e decisões de design que arquitetos sênior usam para projetar sistemas que suportam milhões de usuários simultâneos — com ",
  descriptionHighlight: "código real e exemplos de produção.",
  rating: "4.9/5",
  socialProofText: "4.200+ engenheiros inscritos",
};

// Dados dos avatares de prova social na Hero
export const SOCIAL_AVATARS = [
  { initials: "RB", color: "#a855f7" }, // Púrpura
  { initials: "CM", color: "#ec4899" }, // Pink
  { initials: "LF", color: "#10b981" }, // Esmeralda
  { initials: "TG", color: "#f59e0b" }, // Âmbar
  { initials: "AO", color: "#0ea5e9" }, // Azul
];

// Mensagens de Validação do Formulário (Zod)
export const VALIDATION_MESSAGES = {
  nameRequired: "Seu nome é obrigatório.",
  nameMin: "Nome deve ter pelo menos 2 caracteres.",
  nameMax: "Nome muito longo.",
  nameInvalid: "Use apenas letras e espaços.",
  emailRequired: "Seu melhor e-mail é obrigatório.",
  emailInvalid: "Digite um e-mail válido.",
  emailMax: "E-mail muito longo.",
};

// Textos do Componente LeadForm
export const LEAD_FORM_TEXTS = {
  badge: "Vagas Limitadas",
  title: "Reserve sua vaga gratuita",
  subtitle:
    "Preencha os campos abaixo e garanta seu acesso em menos de 30 segundos.",
  fields: {
    name: { label: "Seu nome", placeholder: "Como posso te chamar?" },
    email: { label: "Seu melhor e-mail", placeholder: "voce@empresa.com" },
  },
  button: {
    default: "Quero minha vaga gratuita",
    loading: "Reservando sua vaga...",
  },
  trustSignal: "100% gratuito · Sem spam · Cancele quando quiser",
  success: {
    badge: "Inscrição confirmada",
    title: (name: string) => `Perfeito, ${name}! 🎉`,
    description:
      "Sua vaga na Masterclass Arquitetura Escalável foi reservada com sucesso. Enviamos os detalhes de acesso para o seu e-mail.",
    disclaimer:
      "📬 Verifique sua caixa de entrada (e a pasta de spam) para confirmar o e-mail e garantir o recebimento do link de acesso.",
  },
  errors: {
    generic: "Algo deu errado. Tente novamente.",
    network:
      "Sem conexão com o servidor. Verifique sua internet e tente novamente.",
  },
};

// Textos da seção de Trust (Logos)
export const TRUST_SECTION_TEXT = {
  title: "Engenheiros das melhores empresas já participaram",
};

export const BRAND_LOGOS: BrandLogo[] = [
  { name: "NovaTech", abbr: "NT" },
  { name: "ScalrIO", abbr: "SI" },
  { name: "CloudForge", abbr: "CF" },
  { name: "DataPlex", abbr: "DP" },
  { name: "FluxCore", abbr: "FC" },
  { name: "VertexLabs", abbr: "VL" },
  { name: "PulseDB", abbr: "PD" },
  { name: "NexaCloud", abbr: "NC" },
  { name: "ByteShift", abbr: "BS" },
  { name: "GridStack", abbr: "GS" },
];

// Textos da seção de Benefícios
export const BENEFITS_SECTION_TEXT = {
  tagline: "O que você vai dominar",
  title: "Conteúdo técnico denso.",
  highlight: "Aplicável na segunda-feira.",
  description:
    "Nada de teoria vaga ou conceitos superficiais. Cada módulo tem exemplos de código, diagramas de arquitetura e decisões reais que você pode levar para o trabalho.",
};

// Array de Benefícios com as novas cores Púrpura/Magenta
export const BENEFITS: Benefit[] = [
  {
    icon: GitBranch,
    title: "Padrões de Arquitetura Modernos",
    description:
      "Domine Event Sourcing, CQRS, Saga Pattern e Domain-Driven Design na prática, com exemplos reais de sistemas em produção com mais de 10 milhões de usuários.",
    tag: "Módulo 1",
    color: "oklch(58% 0.22 290)", // Púrpura Brand
    bg: "oklch(58% 0.22 290 / 0.08)",
    border: "oklch(58% 0.22 290 / 0.2)",
  },
  {
    icon: Globe2,
    title: "Infraestrutura Resiliente por Design",
    description:
      "Aprenda a projetar sistemas que toleram falhas de forma graciosa. Circuit Breakers, Bulkheads, Retry Policies e as estratégias de deployment que eliminam downtime.",
    tag: "Módulo 2",
    color: "oklch(72% 0.22 330)", // Magenta Accent
    bg: "oklch(72% 0.22 330 / 0.08)",
    border: "oklch(72% 0.22 330 / 0.2)",
  },
  {
    icon: Zap,
    title: "Performance e Otimização em Escala",
    description:
      "Estratégias de cache em múltiplas camadas, otimização de banco de dados, CDN e as técnicas que reduzem latência em até 80% sem aumentar custos de infraestrutura.",
    tag: "Módulo 3",
    color: "oklch(68% 0.22 310)", // Violeta
    bg: "oklch(68% 0.22 310 / 0.08)",
    border: "oklch(68% 0.22 310 / 0.2)",
  },
  {
    icon: BarChart3,
    title: "Observabilidade e Tomada de Decisão",
    description:
      "Configure stacks de observabilidade profissionais com OpenTelemetry, Grafana e alertas inteligentes que te acordam antes dos usuários perceberem o problema.",
    tag: "Módulo 4",
    color: "oklch(62% 0.18 270)", // Índigo profundo
    bg: "oklch(62% 0.18 270 / 0.08)",
    border: "oklch(62% 0.18 270 / 0.2)",
  },
];

// Textos da seção de Depoimentos (Prova Social)
export const TESTIMONIALS_SECTION_TEXT = {
  tagline: "Prova social",
  title: "Quem participou, voltou diferente.",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rafael Mendonça",
    role: "Staff Engineer · VestLine",
    avatar: "RM",
    text: "Essa masterclass reorganizou completamente a forma como eu penso sobre sistemas...",
    stars: 5,
    highlight: "Aprendi mais em 3 horas do que em meses de leitura esparsa.",
  },
  {
    name: "Camila Torres",
    role: "Tech Lead · KrianPy",
    avatar: "CT",
    text: "Fui cética no começo, porque já tenho bastante experiência. Mas o conteúdo...",
    stars: 5,
    highlight:
      "Nunca tinha visto Circuit Breakers explicados com tanta clareza.",
  },
];

export const EVENT_STATS: EventStat[] = [
  { icon: Users, value: "4.200+", label: "Engenheiros inscritos" },
  { icon: Clock, value: "3h30", label: "De conteúdo denso" },
  { icon: CalendarDays, value: "Ao vivo", label: "Com sessão de Q&A" },
];

// Textos da seção de Call to Action (CTA)
export const CTA_SECTION_TEXT = {
  titleLine1: "Ainda na dúvida?",
  titleLine2: "É gratuito. Sem truques.",
  description:
    "Mais de 4.200 engenheiros já garantiram o acesso. As vagas são limitadas por conta da capacidade do servidor de transmissão ao vivo. Não arrisque ficar de fora.",
  buttonText: "Quero minha vaga gratuita",
  footerText: "Sem cartão de crédito · Cancele quando quiser · 100% gratuito",
};

// Informações da Marca e Rodapé
export const BRAND_NAME = "VortexUI";

export const FOOTER_TEXT = {
  copyright: "Todos os direitos reservados.",
};

export const FOOTER_LINKS = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
];
