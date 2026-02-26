"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Search from "./Search";
import VersionSelector from "./VersionSelector";
import ThemeToggle from "./ThemeToggle";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

export default function Header() {
  const pathname = usePathname();

  // Example pathname:
  // /en/docs/v1/introduction
  const segments = pathname.split("/").filter(Boolean);

  const currentLang = segments[0] || "en";
  const restPath = segments.slice(1).join("/");

  return (
    <header
  className="h-16 border-b flex items-center px-6 justify-between"
  style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
>


      {/* Logo / Title */}
      <h1 className="text-xl font-bold tracking-wide">DOCS PORTAL</h1>

      {/* Right side: Search + Language Switcher */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <Search />
        <VersionSelector />
        <ThemeToggle />
        {/* Language Switcher */}
        <div
          className="flex gap-3"
          data-testid="language-switcher"
        >
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.code}
              href={`/${lang.code}/${restPath}`}
              className={`text-sm ${
                currentLang === lang.code
                  ? "font-bold underline"
                  : "hover:underline"
              }`}
            >
              {lang.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
