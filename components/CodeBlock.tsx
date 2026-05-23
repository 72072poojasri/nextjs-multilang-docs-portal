"use client";

import { useState } from "react";

export default function CodeBlock({
  children,
}: {
  children: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(children);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div
      data-testid="code-block"
      className="relative my-4 rounded-lg border bg-black text-white"
    >
      <button
        data-testid="copy-code-button"
        onClick={copyCode}
        className="absolute right-2 top-2 rounded border px-2 py-1 text-xs"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <pre className="overflow-x-auto p-4">
        <code>{children}</code>
      </pre>
    </div>
  );
}