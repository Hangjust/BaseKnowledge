"use client";

import { signOut } from "next-auth/react";

export default function AdminSignOut() {
  return (
    <button className="ghost-button" onClick={() => signOut({ callbackUrl: "/" })} type="button">
      Sign out
    </button>
  );
}
