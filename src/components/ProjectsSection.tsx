import { useProjects } from "../hooks/usePortfolio";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  const projects = useProjects();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-shell px-5 py-24 sm:px-8 md:py-32"
    >
      <div id="projects-heading">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Five live sites. Each card covers what the business actually does and the SEO work I did on it."
        />
      </div>

      {/* Sticky stack: each card pins slightly lower than the one before it. */}
      <ol className="relative">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="sticky mb-6 last:mb-0"
            style={{ top: `${96 + index * 12}px` }}
          >
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ol>
    </section>
  );
}
