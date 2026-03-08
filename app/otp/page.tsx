"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import MobileShell from "@/components/MobileShell";
import PrimaryButton from "@/components/PrimaryButton";
import BottomDots from "@/components/BottomDots";

const OTP_LENGTH = 6;

export default function OtpPage() {
  const router = useRouter();
  const { phone, updateAuth } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otpValue = otp.join("");
  const isValid = otpValue.length === OTP_LENGTH;

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d?$/.test(value)) return; // only single digit

      setOtp((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });

      // Auto-focus next box
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
      if (!pasted) return;

      const chars = pasted.split("");
      setOtp((prev) => {
        const next = [...prev];
        chars.forEach((ch, i) => {
          next[i] = ch;
        });
        return next;
      });

      // Focus the box after last pasted digit (or last box)
      const focusIndex = Math.min(chars.length, OTP_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
    },
    []
  );

  function handleSubmit() {
    if (!isValid) return;
    updateAuth({ otp: otpValue });
    router.push("/profile");
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
          Welcome to<br />Hunters &amp; Couch Potatoes!
        </h1>

        {/* Subtext */}
        <p className="text-brand-muted font-body text-sm mb-8">
          Enter your Mobile No.
        </p>

        {/* Phone input — pre-filled, disabled */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-sm text-brand-muted font-body">
            Mobile Number
          </label>
          <div className="flex items-center gap-2 w-full px-4 py-3 rounded-btn bg-white/5 border border-white/20 opacity-40">
            <span className="text-brand-muted font-body text-sm whitespace-nowrap">
              +91
            </span>
            <input
              type="tel"
              value={phone}
              disabled
              className="flex-1 bg-transparent text-white font-body outline-none cursor-not-allowed"
            />
          </div>
        </div>

        {/* Disabled Verify button */}
        <PrimaryButton disabled className="mb-8">
          Verify
        </PrimaryButton>

        {/* OTP section */}
        <p className="text-brand-muted font-body text-sm mb-4">
          Enter the 6-digit OTP sent to +91 {phone}
        </p>

        {/* 6-box OTP input */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className="w-12 h-14 text-center text-xl font-heading text-white
                bg-white/5 border border-white/20 rounded-btn
                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
                transition-all duration-200"
            />
          ))}
        </div>

        {/* Resend OTP link */}
        <button
          type="button"
          className="text-brand-primary text-xs font-body mb-8 self-start hover:underline transition-all duration-200"
        >
          Resend OTP
        </button>

        {/* Submit OTP button */}
        <PrimaryButton disabled={!isValid} onClick={handleSubmit}>
          Submit OTP
        </PrimaryButton>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom dots */}
        <BottomDots total={3} active={1} />
      </div>
    </MobileShell>
  );
}
