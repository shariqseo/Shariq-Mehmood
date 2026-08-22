import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CoreCompetenciesSection from "./components/CoreCompetenciesSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <HeroSection />
        <AboutSection />
        <CoreCompetenciesSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </>
  );
}
