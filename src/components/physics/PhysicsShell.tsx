/**
 * =============================================================================
 * PhysicsShell — layout wrapper for every physics template page
 * =============================================================================
 *
 * Provides consistent top bar, breadcrumbs, and topic accent CSS variable.
 * All physics pages should wrap content in <PhysicsShell>.
 *
 * Props:
 *   accentColor  — from topic.meta.accentColor; drives --topic-accent variable
 *   breadcrumbs  — array of { label, href? }; last item has no href (current page)
 * =============================================================================
 */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PhysicsShellProps = {
  children: ReactNode;
  /** Topic accent hex; omit on hub page to use default cyan. */
  accentColor?: string;
  breadcrumbs?: BreadcrumbItem[];
};

export default function PhysicsShell({ children, accentColor, breadcrumbs }: PhysicsShellProps) {
  return (
    <div
      className="physics-root"
      style={accentColor ? ({ "--topic-accent": accentColor } as CSSProperties) : undefined}
    >
      <div className="physics-shell">
        <header className="physics-topbar">
          <Link className="physics-brand" href="/physics">
            <span className="physics-brand-icon">⚛</span>
            <span>Physics Lab</span>
          </Link>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="physics-breadcrumb" aria-label="Breadcrumb">
              {breadcrumbs.map((item, index) => (
                <span key={item.label} style={{ display: "contents" }}>
                  {index > 0 && <span aria-hidden="true">›</span>}
                  {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                </span>
              ))}
            </nav>
          )}
        </header>

        {children}
      </div>
    </div>
  );
}