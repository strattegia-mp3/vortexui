import { LucideIcon } from "lucide-react";

export interface BrandLogo {
  name: string;
  abbr: string;
}

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  color: string;
  bg: string;
  border: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  stars: number;
  highlight: string;
}

export interface EventStat {
  icon: LucideIcon;
  value: string;
  label: string;
}
