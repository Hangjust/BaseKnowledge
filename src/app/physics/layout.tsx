/**
 * =============================================================================
 * Physics route group layout
 * =============================================================================
 *
 * Loads the standalone physics.css stylesheet. Child pages use PhysicsShell
 * for markup — this layout only handles global physics styling scope.
 * =============================================================================
 */

import type { ReactNode } from "react";
import "./physics.css";

export default function PhysicsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;1,7..72,400&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}