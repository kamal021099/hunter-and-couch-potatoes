"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import MobileShell from "@/components/MobileShell";
import PrimaryButton from "@/components/PrimaryButton";
import BottomDots from "@/components/BottomDots";

export default function LoginPage() {
  const router = useRouter();
  const { updateAuth } = useAuth();
  const [phone, setPhone] = useState("");

  const isValid = /^\d{10}$/.test(phone);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  }

  function handleSubmit() {
    if (!isValid) return;
    updateAuth({ phone });
    router.push("/otp");
  }

  return (
    <MobileShell>
      <div className="flex flex-col flex-1 px-6 pt-10 pb-4">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-brand-surface/20 flex items-center justify-center text-brand-surface text-lg">
            👤
          </div>
          <span className="text-brand-surface font-body text-sm">Hello!</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-[26px] leading-tight text-white mb-2">
          Welcome to<br /><span className="text-brand-primary">Hunters &amp; Couch Potatoes!</span>
        </h1>

        {/* Subtext */}
        <p className="text-brand-muted font-body text-sm mb-8">
          Enter your Mobile No.
        </p>

        {/* Phone input */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-sm text-brand-muted font-body">
            Mobile Number
          </label>
          <div className="flex items-center gap-2 w-full px-4 py-3 rounded-btn bg-white/5 border border-white/20 focus-within:ring-2 focus-within:ring-brand-primary focus-within:border-transparent transition-all duration-200">
            <span className="text-brand-muted font-body text-sm whitespace-nowrap">
              +91
            </span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="9876543210"
              className="flex-1 bg-transparent text-white font-body outline-none placeholder:text-brand-muted"
            />
          </div>
        </div>

        {/* Verify button */}
        <PrimaryButton disabled={!isValid} onClick={handleSubmit}>
          Verify
        </PrimaryButton>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom dots */}
        <BottomDots total={3} active={0} />
      </div>
    </MobileShell>
  );
}
