import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";
import SectionHeading from "./SectionHeading";

export default function CoreCompetenciesSection() {
  const { competencies } = usePortfolio();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="mx-auto max-w-shell px-5 py-24 sm:px-8 md:py-32"
    >
      <div id="skills-heading">
        <SectionHeading
          eyebrow="Core competencies"
          title="What I work on"
          description="Grouped the way I actually use them — research first, then what goes on the page, then what happens off it."
        />
      </div>

      <ul className="border-t border-hairline">
        {competencies.map((group, index) => (
          <motion.li
            key={group.category}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(index * 0.05, 0.25),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group border-b border-hairline py-7 transition-colors duration-300 md:py-8"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[auto_240px_1fr] md:items-baseline md:gap-8">
              <span className="row-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-lg font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-white sm:text-xl">
                {group.category}
              </h3>

              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="tag-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
