// src/app/login/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState<"signin" | "register">("signin");

  return (
    <main className="min-h-[100dvh] bg-white flex items-start md:items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Logo tile */}
        <div className="mx-auto h-24 w-24 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 grid place-items-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="AGRIna Logo"
            width={96}
            height={96}
            className="object-contain"
            onErrorCapture={(e) => {
              // If /logo.png is missing, hide the <img> and show the inline SVG leaf
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Minimal inline fallback icon */}
          <svg
            aria-hidden
            viewBox="0 0 48 48"
            className="absolute inset-0 m-auto h-14 w-14 text-[color:var(--color-brand)]"
          >
            <path
              d="M24 8c6 8 2 22-8 22 2-8 6-18 8-22Z"
              fill="currentColor"
              opacity=".85"
            />
            <path
              d="M26 12c4 4 8 10 8 14-3 0-9-4-8-14Z"
              fill="currentColor"
              opacity=".55"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-zinc-700">
            Welcome to AGRIna
          </h1>
          <p className="text-sm text-zinc-600/80">
            Multi-User Soil Analytics Platform
          </p>
        </div>

        {/* Access card */}
        <section className="rounded-[var(--radius-xl)] bg-white shadow-xl ring-1 ring-[color:var(--color-line)]">
          {/* Card header */}
          <div className="px-6 pt-6">
            <div className="flex items-center gap-2 text-zinc-700">
              <LeafIcon className="h-5 w-5 text-[color:var(--color-brand)]" />
              <h2 className="text-lg font-semibold">Account Access</h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 px-2">
            <div className="mx-4 grid grid-cols-2 rounded-full bg-zinc-100 p-1">
              <button
                className={`h-10 rounded-full text-sm font-medium transition
                  ${
                    tab === "signin"
                      ? "bg-white shadow text-zinc-800"
                      : "text-zinc-500 hover:text-zinc-700"
                  }`}
                onClick={() => setTab("signin")}
              >
                <div className="inline-flex items-center gap-2 px-4">
                  <ArrowRightIcon className="h-4 w-4" />
                  <span>Sign In</span>
                </div>
              </button>
              <button
                className={`h-10 rounded-full text-sm font-medium transition
                  ${
                    tab === "register"
                      ? "bg-white shadow text-zinc-800"
                      : "text-zinc-500 hover:text-zinc-700"
                  }`}
                onClick={() => setTab("register")}
              >
                <div className="inline-flex items-center gap-2 px-4">
                  <UserPlusIcon className="h-4 w-4" />
                  <span>Register</span>
                </div>
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="px-6 pb-6 pt-4">
            {tab === "signin" ? <SigninForm /> : <RegisterForm />}
          </div>
        </section>
      </div>
    </main>
  );
}

function SigninForm() {
  return (
    <form className="space-y-4">
      <FormField
        label="Username"
        placeholder="Enter your username"
        type="text"
        icon={<UserIcon className="h-4 w-4" />}
        name="username"
        autoComplete="username"
      />
      <FormField
        label="Password"
        placeholder="Enter your password"
        type="password"
        icon={<LockIcon className="h-4 w-4" />}
        name="password"
        autoComplete="current-password"
      />

      <button
        type="submit"
        className="w-full h-11 rounded-xl bg-[color:var(--color-brand)] text-white text-sm font-semibold
                   shadow-sm hover:bg-[color:var(--color-brand-hover)] active:bg-[color:var(--color-brand-strong)] transition"
      >
        Sign In
      </button>
    </form>
  );
}

function RegisterForm() {
  return (
    <form className="space-y-4">
      <FormField
        label="Full Name"
        placeholder="Enter your full name"
        type="text"
        icon={<IdCardIcon className="h-4 w-4" />}
        name="name"
        autoComplete="name"
      />
      <FormField
        label="Email"
        placeholder="you@example.com"
        type="email"
        icon={<MailIcon className="h-4 w-4" />}
        name="email"
        autoComplete="email"
      />
      <FormField
        label="Password"
        placeholder="Create a password"
        type="password"
        icon={<LockIcon className="h-4 w-4" />}
        name="password"
        autoComplete="new-password"
      />

      <button
        type="submit"
        className="w-full h-11 rounded-xl bg-[color:var(--color-brand)] text-white text-sm font-semibold
                   shadow-sm hover:bg-[color:var(--color-brand-hover)] active:bg-[color:var(--color-brand-strong)] transition"
      >
        Create Account
      </button>
    </form>
  );
}

function FormField(props: {
  label: string;
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  name: string;
  autoComplete?: string;
}) {
  const { label, placeholder, type, icon, name, autoComplete } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </span>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full h-11 rounded-xl border border-[color:var(--color-line)] bg-zinc-50
                     pl-10 pr-3 text-[15px] outline-none ring-0
                     placeholder:text-zinc-500
                     focus:border-[color:var(--color-brand)] focus:bg-white"
        />
      </div>
    </label>
  );
}

/* Inline icons */
function LeafIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M20 4S8 6 6 12s4 10 8 6 6-14 6-14Z" fill="currentColor" />
    </svg>
  );
}
function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M5 12h12M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function UserPlusIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 8v6M17 11h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function UserIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function LockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect
        x="3"
        y="11"
        width="18"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function IdCardIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="9" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14 10h5M14 14h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
