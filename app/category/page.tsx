"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import MobileShell from "@/components/MobileShell";
import PrimaryButton from "@/components/PrimaryButton";
import type { AuthState } from "../context/AuthContext";

type CategoryValue = NonNullable<AuthState["category"]>;

interface CategoryCard {
  id: CategoryValue;
  icon: string;
  title: string;
  subtitle: string;
  distinct?: boolean; // Couch Potato is visually different
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "flats",
    icon: "🏠",
    title: "Flats",
    subtitle: "I need a flat or room",
  },
  {
    id: "flatmates",
    icon: "🤝",
    title: "Flatmates",
    subtitle: "I need a flatmate for my place",
  },
  {
    id: "couch-potato",
    icon: "🛋️",
    title: "Couch Potato",
    subtitle: "I have a place — list it",
    distinct: true,
  },
];

export default function CategoryPage() {
  const router = useRouter();
  const { name, updateAuth } = useAuth();
  const [selected, setSelected] = useState<CategoryValue | null>(null);

  const greeting = name ? `Hi ${name}!` : "Hi there!";

  function handleSubmit() {
    if (!selected) return;
    updateAuth({ category: selected });
    router.push("/dashboard");
  }

  return (
    <MobileShell>
      <div className="flex flex-col flex-1 px-6 pt-10 pb-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-surface/20 flex items-center justify-center text-brand-surface text-lg">
              👤
            </div>
            <span className="text-brand-surface font-body text-sm">
              {greeting}
            </span>
          </div>

          {/* Hamburger menu icon (non-functional) */}
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center text-brand-surface"
            aria-label="Menu"
          >
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1h20M1 8h20M1 15h20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Section heading */}
        <h1 className="font-heading font-extrabold text-[26px] leading-tight text-white mb-2">
          Choose your category!
        </h1>
        <p className="text-brand-muted font-body text-sm mb-8">
          I&apos;m looking for...
        </p>

        {/* Category cards — 2 on top row, 1 centered below */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {CATEGORIES.filter((c) => !c.distinct).map((card) => (
            <Card
              key={card.id}
              card={card}
              isSelected={selected === card.id}
              onSelect={() => setSelected(card.id)}
            />
          ))}
        </div>
        <div className="flex justify-center mb-8">
          {CATEGORIES.filter((c) => c.distinct).map((card) => (
            <div key={card.id} className="w-1/2">
              <Card
                card={card}
                isSelected={selected === card.id}
                onSelect={() => setSelected(card.id)}
              />
            </div>
          ))}
        </div>

        {/* Activate button */}
        <PrimaryButton disabled={!selected} onClick={handleSubmit}>
          Activate your profile
        </PrimaryButton>

        {/* Spacer */}
        <div className="flex-1" />
      </div>
    </MobileShell>
  );
}

/* ── Card sub-component ── */
function Card({
  card,
  isSelected,
  onSelect,
}: {
  card: CategoryCard;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const base = card.distinct
    ? "bg-brand-dark border border-brand-accent/40 text-brand-accent"
    : "bg-brand-surface text-brand-dark";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center justify-center gap-2 p-5 rounded-card w-full
        transition-all duration-200 cursor-pointer
        ${base}
        ${isSelected ? "ring-2 ring-brand-primary scale-[1.03]" : "hover:scale-[1.02]"}`}
    >
      <span className="text-3xl">{card.icon}</span>
      <span className="font-heading font-bold text-sm">{card.title}</span>
      <span className={`text-xs font-body ${card.distinct ? "text-brand-accent/70" : "text-brand-dark/60"}`}>
        {card.subtitle}
      </span>
    </button>
  );
}
