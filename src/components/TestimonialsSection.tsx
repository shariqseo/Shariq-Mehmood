import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import SectionHeading from "./SectionHeading";

/**
 * Hidden entirely until real testimonials exist.
 * Add objects to `testimonials` in src/data/portfolio.json and the whole
 * section appears — no component changes needed. Nothing here is fabricated.
 */
export default function TestimonialsSection() {
  const { testimonials } = usePortfolio();

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-shell px-5 py-24 sm:px-8 md:py-32"
    >
      <div id="testimonials-heading">
        <SectionHeading eyebrow="Testimonials" title="What clients say" />
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <motion.li
            key={testimonial.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(index * 0.06, 0.24),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="card-surface p-7"
          >
            <figure>
              <Quote size={20} className="text-accent-from" aria-hidden="true" />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-white/80">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-hairline pt-4">
                <span className="block text-sm font-medium text-white">
                  {testimonial.author}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {testimonial.role}
                  {testimonial.company ? ` · ${testimonial.company}` : ""}
                </span>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
