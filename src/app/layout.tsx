import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaseKnowledge",
  description: "Accountless AI-powered learning for high school students."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="header-inner">
              <Link className="brand" href="/">
                <span className="brand-mark">BK</span>
                <span>BaseKnowledge</span>
              </Link>
              <nav className="main-nav" aria-label="Main navigation">
                <Link href="/subjects/physics">Physics</Link>
                <Link href="/subjects/biology">Biology</Link>
                <Link href="/assistant">AI Assistant</Link>
                <Link href="/admin">Admin</Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
