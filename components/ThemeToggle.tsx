"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /* Apply theme */
  const applyTheme = (mode: "light" | "dark") => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", mode);
  };

  /* Initial theme load */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (savedTheme) {
      applyTheme(savedTheme);
      setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = prefersDark ? "dark" : "light";

    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  /* Toggle theme */
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