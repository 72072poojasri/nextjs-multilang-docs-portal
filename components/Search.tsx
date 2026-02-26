"use client";

import { useEffect, useState } from "react";
import FlexSearch from "flexsearch";

type DocItem = {
  id: string;
  title: string;
  content: string;
  url: string;
};

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<DocItem[]>([]);
  const [docs, setDocs] = useState<DocItem[]>([]);

  const [index] = useState(
    () =>
      new FlexSearch.Index({
        tokenize: "forward",
      })
  );

  useEffect(() => {
    const documents: DocItem[] = [
      {
        id: "en-v1-intro",
        title: "Introduction",
        content: "Welcome to the documentation portal Getting Started",
        url: "/en/docs/v1/introduction",
      },
      {
        id: "es-v1-intro",
        title: "Introducción",
        content: "Bienvenido al portal de documentación",
        url: "/es/docs/v1/introduction",
      },
    ];

    documents.forEach((doc) => {
      index.add(doc.id, doc.content);
    });

    setDocs(documents);
  }, [index]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const matches = index.search(query) as string[];
    const found = docs.filter((doc) => matches.includes(doc.id));

    setResults(found);
  }, [query, index, docs]);

  return (
    <div className="relative">
      <input
  suppressHydrationWarning
  data-testid="search-input"
  type="text"
  placeholder="Search documentation..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
        className="
  border border-gray-300 dark:border-gray-600
  bg-white dark:bg-gray-700
  text-gray-900 dark:text-gray-100
  placeholder-gray-400
  px-3 py-1.5 rounded-md w-64
  focus:outline-none focus:ring-2 focus:ring-blue-500
"
      />

      {query && (
        <div
          data-testid="search-results"
          className="absolute top-full mt-2 bg-white border rounded w-64 p-2 space-y-2 z-50 z-50"
        >
          {results.length > 0 ? (
            results.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                className="block hover:underline text-sm"
              >
                {doc.title}
              </a>
            ))
          ) : (
            <div
              data-testid="search-no-results"
              className="text-sm text-gray-500"
            >
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
