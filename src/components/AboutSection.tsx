import { motion } from "framer-motion";
import { usePortfolio } from "../hooks/usePortfolio";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  const { profile, experience, competencies, projects } = usePortfolio();

  const stats = [
    { value: String(projects.length), label: "Client projects" },
    { value: String(experience.length), label: "SEO roles" },
    { value: String(competencies.length), label: "Skill areas" },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-shell px-5 py-24 sm:px-8 md:py-32"
    >
      <div id="about-heading">
        <SectionHeading eyebrow="About" title="Who I am" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-lg leading-[1.75] text-white/80 sm:text-xl sm:leading-[1.7]"
            style={{ wordBreak: "normal", overflowWrap: "break-word", hyphens: "none" }}
          >
            {profile.bio}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="tag-chip">{profile.title}</span>
            <span className="tag-chip">{profile.location}</span>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-0"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "card-surface p-5 lg:rounded-none lg:border-0 lg:border-t lg:bg-transparent lg:p-0 lg:py-6",
                i === 0 ? "lg:border-t-0 lg:pt-0" : "",
              ].join(" ")}
            >
              <dt className="eyebrow order-2 mt-1 block">{stat.label}</dt>
              <dd className="accent-text text-3xl font-semibold tabular-nums tracking-display sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
