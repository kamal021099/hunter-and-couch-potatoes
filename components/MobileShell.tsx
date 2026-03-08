import type { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
}

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-[#07070F] flex items-center justify-center">
      <div className="w-full max-w-[390px] min-h-screen md:min-h-0 md:h-[844px] bg-brand-dark md:rounded-[40px] overflow-hidden relative flex flex-col">
        {children}
      </div>
    </div>
  );
}
