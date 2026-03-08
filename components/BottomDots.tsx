interface BottomDotsProps {
  total: number;
  active: number; // 0-indexed
}

export default function BottomDots({ total, active }: BottomDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`rounded-pill transition-all duration-200 ${
            i === active
              ? "w-3 h-3 bg-brand-surface"
              : "w-2 h-2 bg-brand-muted"
          }`}
        />
      ))}
    </div>
  );
}
