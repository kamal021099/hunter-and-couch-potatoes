import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  error,
  disabled,
  className = "",
  ...rest
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-brand-muted font-body">{label}</label>
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-btn bg-white/5 text-white font-body
          border border-white/20
          placeholder:text-brand-muted
          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
          disabled:opacity-40 disabled:cursor-not-allowed disabled:focus:ring-0
          transition-all duration-200
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
