"use client";

import { useAuth } from "../context/AuthContext";
import MobileShell from "@/components/MobileShell";
import Link from "next/link";

export default function DashboardPage() {
  const { resetAuth } = useAuth();

  return (
    <MobileShell>
      <div className="flex flex-col flex-1 items-center justify-center px-6 text-center">
        <span className="text-5xl mb-6">🚧</span>

        <h1 className="font-heading font-extrabold text-2xl text-brand-primary mb-2">
          Hunters &amp; Couch Potatoes
        </h1>

        <p className="text-brand-surface font-heading font-bold text-lg mb-1">
          Coming Soon
        </p>

        <p className="text-brand-muted font-body text-sm mb-10">
          The hunt begins soon.
        </p>

        <Link
          href="/login"
          onClick={() => resetAuth()}
          className="text-brand-primary font-body text-sm underline hover:brightness-90 transition-all duration-200"
        >
          Start over
        </Link>
      </div>
    </MobileShell>
  );
}
