export interface SiteMeta {
  siteUrl: string;
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  twitterCard: string;
  locale: string;
  themeColor: string;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  photo: string;
  photoSmall: string;
  photoAlt: string;
  photoWidth: number;
  photoHeight: number;
  resumeUrl: string;
  resumeFileName: string;
}

export type SocialIcon = "linkedin" | "mail";

export interface Social {
  label: string;
  icon: SocialIcon;
  href: string;
  display: string;
}

export interface CompetencyGroup {
  category: string;
  items: string[];
}

export interface ExperienceRole {
  id: string;
  company: string;
  title: string;
  /** Empty string when the resume does not state dates — the pill is hidden. */
  dates: string;
  summary: string;
  highlights: string[];
}

export interface Project {
  id: string;
  /** Display index, "01"–"05". Assigned in portfolio.json, not derived. */
  number: string;
  featured: boolean;
  name: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  industry: string;
  seoAngle: string;
  platform: string;
  whatTheSiteDoes: string;
  whatIWorkedOn: string;
  tags: string[];
  /** Reference only. Cards render generated covers, never a remote image. */
  ogImage: string;
  ogImageNote?: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  dates: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  dates: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioData {
  meta: SiteMeta;
  profile: Profile;
  socials: Social[];
  competencies: CompetencyGroup[];
  experience: ExperienceRole[];
  projects: Project[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  testimonials: Testimonial[];
  nav: NavItem[];
}
