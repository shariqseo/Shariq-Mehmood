import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { assetUrl, usePortfolio } from "../hooks/usePortfolio";

export default function Navbar() {
  const { profile, nav } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const initials = profile.shortName.slice(0, 1).toUpperCase();

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-hairline bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] max-w-shell items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#home"
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-ink-raised font-mono text-sm text-white/70 transition-colors group-hover:border-hairlineStrong group-hover:text-white">
            {initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-white/90 sm:block">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-label text-muted transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={assetUrl(profile.resumeUrl)}
            download={profile.resumeFileName}
            className="hidden rounded-full border border-hairline bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-label text-white/85 transition-colors duration-200 hover:border-hairlineStrong hover:bg-white/[0.08] hover:text-white sm:inline-flex"
          >
            Résumé
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-hairline bg-ink-raised text-white/80 transition-colors hover:text-white lg:hidden"
          >
            {open ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-hairline bg-ink/97 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto max-w-shell px-5 py-4 sm:px-8">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-hairline last:border-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href={assetUrl(profile.resumeUrl)}
              download={profile.resumeFileName}
              onClick={() => setOpen(false)}
              className="inline-flex rounded-full border border-hairline bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-label text-white/85"
            >
              Download résumé
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
