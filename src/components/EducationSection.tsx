import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import SectionHeading from "./SectionHeading";

export default function EducationSection() {
  const { education, certifications } = usePortfolio();

  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="mx-auto max-w-shell px-5 py-24 sm:px-8 md:py-32"
    >
      <div id="education-heading">
        <SectionHeading eyebrow="Credentials" title="Education & certifications" />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        {education.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="mb-6 flex items-center gap-2.5 text-sm font-medium text-white">
              <GraduationCap size={17} className="text-accent-from" aria-hidden="true" />
              Education
            </h3>
            <ul className="border-t border-hairline">
              {education.map((entry) => (
                <li key={entry.id} className="border-b border-hairline py-5">
                  <p className="text-base font-medium leading-snug text-white sm:text-lg">
                    {entry.degree}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{entry.institution}</p>
                  {entry.dates ? (
                    <span className="date-pill mt-3">{entry.dates}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        {certifications.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="mb-6 flex items-center gap-2.5 text-sm font-medium text-white">
              <Award size={17} className="text-accent-from" aria-hidden="true" />
              Certifications
            </h3>
            <ul className="border-t border-hairline">
              {certifications.map((cert) => (
                <li key={cert.id} className="border-b border-hairline py-5">
                  <p className="text-base font-medium leading-snug text-white sm:text-lg">
                    {cert.name}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{cert.issuer}</p>
                  {cert.dates ? (
                    <span className="date-pill mt-3">{cert.dates}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
