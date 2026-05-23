import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkSlug from "remark-slug";
import { notFound } from "next/navigation";

import TableOfContents from "@/components/TableOfContents";
import FeedbackWidget from "@/components/FeedbackWidget";
import CodeBlock from "@/components/CodeBlock";

export const revalidate = 60;

/* ✅ ISR Static Generation */
export async function generateStaticParams() {
  const docsPath = path.join(process.cwd(), "_docs");

  const params: {
    lang: string;
    version: string;
    slug: string;
  }[] = [];

  const languages = fs
    .readdirSync(docsPath)
    .filter((file) =>
      fs.statSync(path.join(docsPath, file)).isDirectory()
    );

  languages.forEach((lang) => {
    const langPath = path.join(docsPath, lang);

    const versions = fs
      .readdirSync(langPath)
      .filter((file) =>
        fs.statSync(path.join(langPath, file)).isDirectory()
      );

    versions.forEach((version) => {
      const versionPath = path.join(langPath, version);

      const files = fs
        .readdirSync(versionPath)
        .filter((file) => file.endsWith(".md"));

      files.forEach((file) => {
        params.push({
          lang,
          version,
          slug: file.replace(".md", ""),
        });
      });
    });
  });

  return params;
}

export default async function DocPage({
  params,
}: {
  params: Promise<{
    lang: string;
    version: string;
    slug: string;
  }>;
}) {
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

  const processed = await remark()
    .use(remarkSlug as any)
    .use(html)
    .process(content);

  const contentHtml = processed.toString();

  return (
    <div className="flex gap-10 px-8 py-6">
      {/* Main Content */}
      <div className="flex-1">
        <article
          data-testid="doc-content"
          className="prose max-w-none dark:prose-invert"
        >
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* ✅ Code Block Copy */}
          <CodeBlock children="npm install next react react-dom" />
        </article>

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