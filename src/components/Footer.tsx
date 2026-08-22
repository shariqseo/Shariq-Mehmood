import { useEffect, useState } from "react";
import { Check, Copy, Linkedin, Phone } from "lucide-react";
import { usePortfolio, useSocials } from "../hooks/usePortfolio";

export default function Footer() {
  const { profile, nav } = usePortfolio();
  const socials = useSocials();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard unavailable (insecure context or denied) — fall back to mailto.
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const linkedIn = socials.find((s) => s.icon === "linkedin");
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-hairline"
    >
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-20">
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {/* Brand */}
          <div>
            <p className="hero-heading text-3xl font-semibold tracking-display sm:text-4xl">
              {profile.name}
            </p>
            <p className="mt-3 text-sm text-muted">{profile.title}</p>
            <p className="mt-1 text-sm text-subtle">{profile.location}</p>
            <div
              className="accent-rule mt-6 h-px w-14 rounded-full"
              aria-hidden="true"
            />
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h3 className="eyebrow mb-5">Navigate</h3>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Reach out */}
          <div>
            <h3 className="eyebrow mb-5">Reach out</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="break-all text-sm text-muted transition-colors duration-200 hover:text-white"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-label text-subtle transition-colors duration-200 hover:border-hairlineStrong hover:text-white"
                  >
                    {copied ? (
                      <Check size={12} aria-hidden="true" />
                    ) : (
                      <Copy size={12} aria-hidden="true" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <span aria-live="polite" className="sr-only">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </div>
              </li>
              <li>
                <a
                  href={profile.phoneHref}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-white"
                >
                  <Phone size={14} aria-hidden="true" />
                  {profile.phone}
                </a>
              </li>
              {linkedIn ? (
                <li>
                  <a
                    href={linkedIn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-white"
                  >
                    <Linkedin size={14} aria-hidden="true" />
                    {linkedIn.display}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-label text-subtle">
            © {year} {profile.name}
          </p>
          <a
            href="#home"
            className="font-mono text-[11px] uppercase tracking-label text-subtle transition-colors duration-200 hover:text-white"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
