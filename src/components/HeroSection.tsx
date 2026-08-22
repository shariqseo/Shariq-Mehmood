import { motion } from "framer-motion";
import { Download, Linkedin, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { assetUrl, usePersonSchema, usePortfolio, useSocials } from "../hooks/usePortfolio";
import type { SocialIcon } from "../types/portfolio";

const ICONS: Record<SocialIcon, LucideIcon> = {
  linkedin: Linkedin,
  mail: Mail,
};

export default function HeroSection() {
  const { profile } = usePortfolio();
  const socials = useSocials();
  const personSchema = usePersonSchema();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]"
    >
      {/* Ambient organic-growth glow. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 28%, rgba(20,184,166,0.14) 0%, rgba(12,12,12,0) 70%), radial-gradient(45% 45% at 12% 78%, rgba(74,222,128,0.08) 0%, rgba(12,12,12,0) 70%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white/[0.03] px-3.5 py-1.5"
          >
            <span
              className="accent-rule h-1.5 w-1.5 rounded-full"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] uppercase tracking-label text-muted">
              {profile.title}
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="hero-heading text-[2.6rem] font-semibold leading-[0.95] tracking-tightest xs:text-[3rem] sm:text-[4.5rem] lg:text-[5.75rem]"
          >
            Hi, I&rsquo;m {profile.shortName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {socials.map((social) => {
              const Icon = ICONS[social.icon] ?? Mail;
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="pill"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{social.label}</span>
                </a>
              );
            })}

            <a
              href={assetUrl(profile.resumeUrl)}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(100deg, #4ADE80 0%, #14B8A6 100%)",
              }}
            >
              <Download size={16} aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-subtle"
          >
            <MapPin size={13} aria-hidden="true" />
            {profile.location}
          </motion.p>
        </div>

        {/* Portrait. Fixed aspect box prevents any layout shift. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="order-first mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:order-none lg:max-w-[420px]"
        >
          <div className="relative aspect-square">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full opacity-60 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 140deg, rgba(74,222,128,0.30), rgba(20,184,166,0.30), rgba(74,222,128,0.05), rgba(74,222,128,0.30))",
              }}
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-hairlineStrong">
              <img
                src={assetUrl(profile.photo)}
                alt={profile.photoAlt}
                width={profile.photoWidth}
                height={profile.photoHeight}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Schema.org Person structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personSchema }}
      />
    </section>
  );
}
