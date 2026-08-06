import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn, FaGithub } from "react-icons/fa";

const FOOTER_LINKS = {
  Product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/worker-ai" },
    { label: "Companies", href: "/companies" },
    { label: "Salary data", href: "/salary-data" },
  ],
  Navigations: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/career-library" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "/brand-guideline" },
    { label: "Newsroom", href: "/newsroom" },
  ],
};

const SOCIALS = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaPinterestP, href: "https://pinterest.com", label: "Pinterest" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="w-full !bg-black border-t-2 border-blue-600">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* Left: Logo + tagline */}
          <div className="max-w-xs">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white">
              hire<span className="text-blue-500">loop</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Right: Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-4 text-sm font-semibold text-blue-500">
                  {title}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: socials + copyright */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Icon size={14} />
              </Link>
            ))}
          </div>

          {/* Copyright + policy links */}
          <div className="flex flex-col items-center gap-2 text-xs text-white/40 sm:flex-row sm:gap-6">
            <span>Copyright 2026 — Hire-Loop</span>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="transition-colors hover:text-white/70">
                Terms &amp; Policy
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-white/70">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}