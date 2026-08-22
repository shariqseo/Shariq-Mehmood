import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  const { experience } = usePortfolio();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-shell px-5 py-24 sm:px-8 md:py-32"
    >
      <div id="experience-heading">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
      </div>

      <ol className="border-t border-hairline">
        {experience.map((role, index) => (
          <motion.li
            key={role.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(index * 0.06, 0.24),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-b border-hairline py-9 md:py-11"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-8">
              <span className="row-number md:pt-1.5" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {role.title}
                  </h3>
                  <span className="accent-text text-base font-medium sm:text-lg">
                    {role.company}
                  </span>
                  {/* Hidden entirely when the résumé states no dates. */}
                  {role.dates ? (
                    <span className="date-pill">{role.dates}</span>
                  ) : null}
                </div>

                <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
                  {role.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="relative max-w-3xl pl-6 text-[15px] leading-relaxed text-white/70"
                    >
                      <span
                        className="accent-rule absolute left-0 top-[0.62em] h-1.5 w-1.5 rounded-full"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
