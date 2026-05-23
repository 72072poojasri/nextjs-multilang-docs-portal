import fs from "fs";
import path from "path";
import Link from "next/link";

type SidebarProps = {
  lang: string;
  version: string;
};

export default function Sidebar({
  lang,
  version,
}: SidebarProps) {
  const docsPath = path.join(
    process.cwd(),
    "_docs",
    lang,
    version
  );

  let docs: string[] = [];

  if (fs.existsSync(docsPath)) {
    docs = fs
      .readdirSync(docsPath)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(".md", ""));
  }

  return (
    <aside
      data-testid="sidebar"
      className="w-64 border-r p-4 hidden md:block"
    >
      <nav className="space-y-2">
        {docs.map((doc) => (
          <Link
            key={doc}
            href={`/${lang}/docs/${version}/${doc}`}
            data-testid={`sidebar-nav-link-${doc}`}
            className="block hover:underline capitalize"
          >
            {doc.replace("-", " ")}
          </Link>
        ))}
      </nav>
    </aside>
  );
}