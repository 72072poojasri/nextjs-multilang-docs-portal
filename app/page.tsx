import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Documentation Portal
        </h1>

        <Link
          href="/en/docs/v1/introduction"
          className="rounded border px-4 py-2"
        >
          Open Documentation
        </Link>
      </div>
    </main>
  );
}