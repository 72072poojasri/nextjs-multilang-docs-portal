import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import { notFound } from "next/navigation";

import TableOfContents from "@/components/TableOfContents";
import FeedbackWidget from "@/components/FeedbackWidget";

export const revalidate = 60;

export default async function DocPage({
  params,
}: {
  params: Promise<{
    lang: string;
    version: string;
    slug: string;
  }>;
}) {
  // ✅ Next.js requires awaiting params
  const { lang, version, slug: docSlug } = await params;

  const filePath = path.join(
    process.cwd(),
    "_docs",
    lang,
    version,
    `${docSlug}.md`
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContent);

  // ✅ Add heading IDs for TOC
  const processed = await remark()
    .use(remarkSlug as any)
    .use(html)
    .process(content);

  const contentHtml = processed.toString();

  return (
    <div className="flex gap-10 px-8 py-6">
      {/* Main content + Feedback */}
      <div className="flex-1">
        <article
          data-testid="doc-content"
          className="prose max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Feedback Widget */}
        <FeedbackWidget />
      </div>

      {/* Table of Contents */}
      <aside className="w-64 hidden lg:block">
        <TableOfContents />
      </aside>
    </div>
  );
}
