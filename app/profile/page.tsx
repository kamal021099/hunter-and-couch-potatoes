"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import MobileShell from "@/components/MobileShell";
import PrimaryButton from "@/components/PrimaryButton";
import InputField from "@/components/InputField";

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"];

export default function ProfilePage() {
  const router = useRouter();
  const { updateAuth } = useAuth();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; gender?: string }>({});

  const greeting = name.trim() ? `Hi ${name.trim()}!` : "Hi there!";

  function handleSubmit() {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!gender) newErrors.gender = "Please select a gender";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    updateAuth({ name: name.trim(), dob, gender, email: email.trim() });
    router.push("/category");
  }

  return (
    <MobileShell>
      <div className="flex flex-col flex-1 px-6 pt-8 pb-4 overflow-y-auto">
        {/* Close (X) button */}
        <button
          onClick={() => router.push("/login")}
          className="self-end w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-brand-surface text-lg hover:bg-white/20 transition-all duration-200 mb-4"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Avatar circle */}
        <div className="w-24 h-24 mx-auto rounded-full bg-brand-surface/20 flex items-center justify-center text-4xl mb-4">
          👤
        </div>

        {/* Dynamic greeting */}
        <h1 className="font-heading font-extrabold text-[26px] leading-tight text-white text-center mb-1">
          {greeting}
        </h1>
        <p className="text-brand-muted font-body text-sm text-center mb-8">
          Welcome
        </p>

        {/* Form fields */}
        <div className="flex flex-col gap-5 mb-8">
          {/* Full Name */}
          <InputField
            label="Full Name"
            type="text"
            placeholder="Arjun Mehta"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
          />

          {/* Date of Birth */}
          <InputField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          {/* Gender (select) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-brand-muted font-body">Gender</label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                if (errors.gender) setErrors((prev) => ({ ...prev, gender: undefined }));
              }}
              className={`w-full px-4 py-3 rounded-btn bg-white/5 text-white font-body
                border border-white/20
                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
                transition-all duration-200 appearance-none
                ${errors.gender ? "border-red-500 focus:ring-red-500" : ""}
                ${!gender ? "text-brand-muted" : ""}`}
            >
              <option value="" disabled className="bg-brand-dark text-brand-muted">
                Select gender
              </option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-brand-dark text-white">
                  {opt}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-0.5">{errors.gender}</p>
            )}
          </div>

          {/* Email ID */}
          <InputField
            label="Email ID (optional)"
            type="email"
            placeholder="arjun@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Continue button */}
        <PrimaryButton onClick={handleSubmit}>Continue</PrimaryButton>

        {/* Spacer */}
        <div className="flex-1" />
      </div>
    </MobileShell>
  );
}
