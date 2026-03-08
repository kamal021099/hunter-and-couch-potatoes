import type { ReactNode, ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function PrimaryButton({
  children,
  disabled,
  className = "",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`w-full py-4 rounded-btn bg-brand-primary text-white font-heading font-bold text-base
        transition-all duration-200
        hover:brightness-90 active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:scale-100
        ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
