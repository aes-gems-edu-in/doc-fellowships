export interface StatItem {
  id: string;
  value?: string;
  label: string;
  icon: string;
}

export interface TrustPoint {
  id: string;
  label: string;
  icon: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  heroImage?: string;
  headlineBefore?: string;
  headlineHighlight?: string;
  subheadline?: string;
  heroDescription?: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Program {
  id: string;
  specialtyId: string;
  title: string;
  duration: string;
  location: string;
  hospital: string;
  image: string;
  isPopular: boolean;
  featured: boolean;
  overview: string;
  eligibility: string[];
  curriculum: string[];
  highlights: string[];
  fee: string;
  stipend: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}
