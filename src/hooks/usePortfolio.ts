import raw from "../data/portfolio.json";
import type { PortfolioData, Project, Social } from "../types/portfolio";

const data = raw as unknown as PortfolioData;

/**
 * Single source of truth for every piece of copy on this site.
 * Components never hardcode content — they read it from here.
 */
export function usePortfolio(): PortfolioData {
  return data;
}

/** Socials with an empty href are dropped so the hero never renders an empty pill. */
export function useSocials(): Social[] {
  return data.socials.filter((s) => s.href.trim().length > 0);
}

/**
 * Projects in the order set in portfolio.json, with any `featured` project
 * hoisted to the front. Order is data-driven, not hardcoded here.
 */
export function useProjects(): Project[] {
  const list = [...data.projects];
  list.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.number.localeCompare(b.number);
  });
  return list;
}

export function usePersonSchema(): string {
  const { profile, meta, socials, competencies } = data;
  const sameAs = socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.bio,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: meta.siteUrl,
    image: `${meta.siteUrl}${profile.photo}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    knowsAbout: competencies.flatMap((c) => c.items),
    alumniOf: data.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
    })),
    hasCredential: data.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return JSON.stringify(schema);
}
