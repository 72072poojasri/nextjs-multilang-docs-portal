import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">


        <Header />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
