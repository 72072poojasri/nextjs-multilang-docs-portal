"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // On load, detect system theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = prefersDark ? "dark" : "light";
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  const applyTheme = (mode: "light" | "dark") => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.style.setProperty("--background", "#0a0a0a");
      root.style.setProperty("--foreground", "#ededed");
    } else {
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      data-testid="theme-toggle"
      onClick={toggleTheme}
      className="border px-3 py-1 rounded text-sm"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
