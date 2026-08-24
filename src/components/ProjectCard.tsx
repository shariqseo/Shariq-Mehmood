import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { Project } from "../types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Live screenshot of the project's actual site, generated on-demand by
 * WordPress's public mshots service (no API key, no self-hosting). If the
 * screenshot fails to load — service hiccup, offline site — we fall back to
 * the generated pattern cover below rather than showing a broken image.
 */
function screenshotUrl(pageUrl: string): string {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(pageUrl)}?w=1200&h=750`;
}

/**
 * Generated cover — the fallback for when a live screenshot isn't available.
 * The pattern angle varies by index so covers stay visually distinguishable.
 */
function ProjectCover({ project, index }: ProjectCardProps) {
  const angle = [22, -18, 38, -32, 12][index % 5];
  const gap = [14, 18, 11, 22, 16][index % 5];
  const patternId = `cover-lines-${project.id}`;
  const [screenshotFailed, setScreenshotFailed] = useState(false);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-hairline bg-ink-raised sm:aspect-[16/9]"
      role="img"
      aria-label={`${project.name} — ${project.industry}`}
    >
      {!screenshotFailed ? (
        <img
          src={screenshotUrl(project.url)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
          onError={() => setScreenshotFailed(true)}
        />
      ) : (
        <svg
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern
              id={patternId}
              width={gap}
              height={gap}
              patternUnits="userSpaceOnUse"
              patternTransform={`rotate(${angle})`}
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={gap}
                stroke="rgba(255,255,255,0.055)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      )}

      {/* Legibility scrim over the screenshot/pattern so the label text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: screenshotFailed
            ? "radial-gradient(70% 90% at 88% 6%, rgba(20,184,166,0.20) 0%, rgba(12,12,12,0) 62%), radial-gradient(60% 70% at 4% 96%, rgba(74,222,128,0.12) 0%, rgba(12,12,12,0) 60%)"
            : "linear-gradient(180deg, rgba(12,12,12,0.05) 0%, rgba(12,12,12,0.15) 55%, rgba(12,12,12,0.88) 100%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-label text-subtle">
            {project.platform}
          </span>
          <span className="accent-rule h-px w-10 rounded-full" aria-hidden="true" />
        </div>

        <div>
          <p className="hero-heading text-3xl font-semibold leading-none tracking-tightest sm:text-5xl lg:text-6xl">
            {project.name}
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-label text-subtle">
            {project.displayUrl}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // The featured project opens by default — it leads for a reason.
  const [expanded, setExpanded] = useState(project.featured);
  const panelId = useId();

  return (
    <article className="card-surface overflow-hidden bg-ink-card/95 backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:p-10">
        <ProjectCover project={project} index={index} />

        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <span
              className="accent-text font-mono text-sm font-medium tabular-nums"
              aria-hidden="true"
            >
              {project.number}
            </span>
            <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
            {project.featured ? (
              <span className="font-mono text-[10px] uppercase tracking-label text-subtle">
                Featured
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-display text-white sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-muted">
            {project.subtitle}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-hairline py-5 sm:grid-cols-2">
            <div>
              <dt className="eyebrow">Industry</dt>
              <dd className="mt-1.5 text-sm text-white/80">{project.industry}</dd>
            </div>
            <div>
              <dt className="eyebrow">SEO angle</dt>
              <dd className="mt-1.5 text-sm text-white/80">{project.seoAngle}</dd>
            </div>
          </dl>

          {/*
            Case study body stays mounted whether open or closed. Collapsing by
            unmounting would keep four of five case studies out of the DOM
            entirely — invisible to crawlers. Height is animated instead.
          */}
          <motion.div
            id={panelId}
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-6">
              <div>
                <h4 className="eyebrow mb-2.5">What the site does</h4>
                <p className="text-[15px] leading-relaxed text-white/75">
                  {project.whatTheSiteDoes}
                </p>
              </div>
              <div>
                <h4 className="eyebrow mb-2.5">What I worked on</h4>
                <p className="text-[15px] leading-relaxed text-white/75">
                  {project.whatIWorkedOn}
                </p>
              </div>
            </div>
          </motion.div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="tag-chip">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(100deg, #4ADE80 0%, #14B8A6 100%)",
              }}
            >
              <span>VIEW LIVE SITE</span>
              <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">
                — opens {project.displayUrl} in a new tab
              </span>
            </a>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 transition-colors duration-200 hover:border-hairlineStrong hover:bg-white/[0.06] hover:text-white"
            >
              {expanded ? (
                <Minus size={15} aria-hidden="true" />
              ) : (
                <Plus size={15} aria-hidden="true" />
              )}
              <span>{expanded ? "Hide case study" : "Read case study"}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}