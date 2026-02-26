"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const items = elements.map((el) => ({
      id: el.id,
      text: el.innerText,
    }));

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      data-testid="table-of-contents"
      className="text-sm space-y-2"
    >
      <h4 className="font-semibold mb-2">On this page</h4>

      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          data-testid={`toc-link-${h.id}`}
          data-active={activeId === h.id ? "true" : "false"}
          className={`block hover:underline ${
            activeId === h.id ? "font-bold text-blue-600" : ""
          }`}
        >
          {h.text}
        </a>
      ))}
    </aside>
  );
}
