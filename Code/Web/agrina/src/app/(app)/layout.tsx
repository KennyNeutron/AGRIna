// src/app/(app)/layout.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-white text-zinc-800">
      <div className="mx-auto grid min-h-[100dvh] max-w-screen-2xl grid-cols-1 md:grid-cols-[290px_1fr]">
        <aside className="border-r border-[color:var(--color-line)] bg-white">
          <div className="flex h-full flex-col">
            {/* Brand */}
            <div className="flex items-center gap-3 px-4 py-5">
              <div className="relative h-11 w-11 rounded-full bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="AGRIna"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="font-semibold">AGRIna</div>
                <div className="text-xs text-zinc-500">Soil Analytics</div>
              </div>
            </div>

            <div className="h-px w-full bg-[color:var(--color-line)]" />

            {/* User block */}
            <div className="px-4 py-4">
              <div className="text-sm font-semibold text-zinc-700">
                System Administrator
              </div>
              <div className="text-xs text-zinc-500">admin@agrina.system</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                <ShieldIcon className="h-4 w-4 text-[color:var(--color-brand)]" />
                <span>All Access</span>
              </div>
              <div className="mt-1 text-xs text-zinc-500">AGRIna System</div>
            </div>

            {/* Nav */}
            <nav className="mt-1 flex-1 px-3">
              <NavLink
                href="/dashboard"
                icon={<HomeIcon className="h-5 w-5" />}
                name="Dashboard"
                desc="Overview of all your devices and recent activity"
              />
              <NavLink
                href="/live-readings"
                icon={<PulseIcon className="h-5 w-5" />}
                name="Live Readings"
                desc="Real-time sensor data from your devices"
              />
              <NavLink
                href="/historical-logs"
                icon={<ClockIcon className="h-5 w-5" />}
                name="Historical Logs"
                desc="View historical data, trends, and deployment records"
              />
              <NavLink
                href="/export-data"
                icon={<DownloadIcon className="h-5 w-5" />}
                name="Export Data"
                desc="Download your data in CSV or PDF format"
              />
              <NavLink
                href="/settings"
                icon={<SettingsIcon className="h-5 w-5" />}
                name="Settings"
                desc="Profile, notifications, and system preferences"
              />
              <NavLink
                href="/about"
                icon={<InfoIcon className="h-5 w-5" />}
                name="About"
                desc="Learn more about AGRIna platform"
              />
            </nav>

            {/* Footer */}
            <div className="mt-auto space-y-3 p-4">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--color-line)] bg-white py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 active:bg-zinc-100 transition"
              >
                <SignOutIcon className="h-4 w-4" />
                <span>Sign Out</span>
              </button>

              <div className="rounded-xl border border-[color:var(--color-line)] bg-white p-3 text-center">
                <div className="text-xs text-zinc-500">AGRIna Platform</div>
                <div className="text-[11px] text-zinc-400">
                  Version 2.1.3 · 2025
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content area */}
        <section className="min-h-[100dvh] bg-white">{children}</section>
      </div>
    </div>
  );
}

/* Nav item with active pill styling */
function NavLink(props: {
  href: string;
  icon: React.ReactNode;
  name: string;
  desc?: string;
}) {
  const pathname = usePathname();
  const active = pathname === props.href;

  return (
    <Link
      href={props.href}
      className={`group block rounded-[var(--radius-lg)] px-3 py-3 transition
        ${
          active
            ? "bg-[color:var(--color-pill)] ring-1 ring-[color:var(--color-pill-ring)] shadow-sm"
            : "hover:bg-zinc-50"
        }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 grid h-7 w-7 place-items-center rounded-lg ring-1 ring-black/5
            ${
              active
                ? "bg-white text-[color:var(--color-brand)]"
                : "bg-white text-zinc-500"
            }`}
        >
          {props.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-semibold ${
                active ? "text-zinc-800" : "text-zinc-700"
              }`}
            >
              {props.name}
            </span>
            <ChevronRightIcon
              className={`h-4 w-4 ${
                active
                  ? "text-[color:var(--color-brand)]"
                  : "text-zinc-400 group-hover:text-zinc-500"
              }`}
            />
          </div>
          {props.desc && (
            <p
              className={`mt-1 text-xs ${
                active ? "text-zinc-600" : "text-zinc-500"
              }`}
            >
              {props.desc}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

/* Inline icons */
function ShieldIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3l8 3v6c0 5-3.5 7.7-8 9-4.5-1.3-8-4-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function HomeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function PulseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M3 12h4l2 6 4-12 2 6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function DownloadIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 21h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SettingsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8c.2.6.7 1 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function InfoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 10v6M12 7h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function SignOutIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M15 17l5-5-5-5M20 12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function ChevronRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
