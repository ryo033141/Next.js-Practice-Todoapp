import "./globals.css"
import Link from "next/link";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <div className="bg-lime-200 p-5">
            <h1 className="font-bold text-3xl ml-5">
              <Link href="/todos" style={{cursor: 'pointer',textDecoration: 'none',color: 'inherit'}}>To doアプリ</Link>
            </h1>
          </div>
        </header>
        <main>
          {children}
        </main>

        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
