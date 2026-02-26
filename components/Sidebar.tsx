export default function Sidebar() {
  return (
    <aside
      data-testid="sidebar"
      className="w-64 border-r p-4 hidden md:block"
    >
      <nav className="space-y-2">
        <a
          href="#"
          data-testid="sidebar-nav-link-introduction"
          className="block hover:underline"
        >
          Introduction
        </a>

        <a
          href="#"
          data-testid="sidebar-nav-link-getting-started"
          className="block hover:underline"
        >
          Getting Started
        </a>
      </nav>
    </aside>
  );
}
