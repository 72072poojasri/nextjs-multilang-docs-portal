"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const VERSIONS = ["v1", "v2", "v3"];

export default function VersionSelector() {
  const pathname = usePathname();

  // Example:
  // /en/docs/v1/introduction
  const segments = pathname.split("/").filter(Boolean);

  const lang = segments[0];
  const currentVersion = segments[2];
  const restPath = segments.slice(3).join("/");

  return (
    <div
      className="relative"
      data-testid="version-selector"
    >
      <div className="flex gap-2">
        {VERSIONS.map((version) => (
          <Link
            key={version}
            href={`/${lang}/docs/${version}/${restPath}`}
            data-testid={`version-option-${version}`}
            className={`
  text-sm px-2 py-1 rounded-md border
  ${
    currentVersion === version
      ? "bg-blue-600 text-white border-blue-600"
      : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
  }
`}
>
            {version.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
