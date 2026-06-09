import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaseKnowledge — Free learning for everyone",
  description: "Learn physics, math, chemistry, biology, and more for free. Read lessons, take quizzes, and get AI help."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);return}if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}})()`}
        </Script>
        <div className="site-shell">
          <header className="site-header">
            <div className="header-inner">
              <Link className="brand" href="/">
                <span className="brand-mark">BK</span>
                <span>BaseKnowledge</span>
              </Link>
              <div className="header-actions">
                <nav className="main-nav" aria-label="Main navigation">
                  <Link href="/discover">Discover</Link>
                  <Link href="/#subjects">Subjects</Link>
                  <Link href="/assistant">AI Assistant</Link>
                  <span className="nav-link-muted" title="Coming soon">
                    Dashboard
                  </span>
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}