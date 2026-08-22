import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Shared heading block. Renders the section <h2>, keeping the document
 * outline correct: one <h1> in the hero, an <h2> per section below it.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="accent-rule h-px w-8 rounded-full" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="hero-heading text-[2.25rem] font-semibold leading-[1.05] tracking-display sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
