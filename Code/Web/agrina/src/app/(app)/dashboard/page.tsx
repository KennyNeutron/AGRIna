// src/app/(app)/dashboard/page.tsx
"use client";

import { useMemo, useState } from "react";

type RangeKey = "24h" | "7d" | "30d";

export default function DashboardPage() {
  const [range, setRange] = useState<RangeKey>("24h");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const lastUpdatedStr = useMemo(() => formatTime(lastUpdated), [lastUpdated]);

  // Demo values. Wire these up to Supabase later.
  const soilMetrics = [
    { key: "N", label: "Nitrogen (N)", value: "48 ppm", hint: "Avg. last 24h" },
    {
      key: "P",
      label: "Phosphorus (P)",
      value: "27 ppm",
      hint: "Avg. last 24h",
    },
    {
      key: "K",
      label: "Potassium (K)",
      value: "52 ppm",
      hint: "Avg. last 24h",
    },
    { key: "pH", label: "pH", value: "6.3", hint: "Avg. last 24h" },
    {
      key: "EC",
      label: "Electrical Conductivity",
      value: "1.8 mS/cm",
      hint: "Avg. last 24h",
    },
    { key: "T", label: "Temperature", value: "24.6°C", hint: "Avg. last 24h" },
    { key: "H", label: "Humidity", value: "72%", hint: "Avg. last 24h" },
  ];

  return (
    <div className="min-h-[100dvh]">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-[color:var(--color-line)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-lg font-semibold text-zinc-700">Dashboard</h1>
            <p className="text-sm text-zinc-500">
              Overview of all your devices and recent activity
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Time range select */}
            <div className="relative">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value as RangeKey)}
                className="h-9 rounded-lg border border-[color:var(--color-line)] bg-white px-3 pr-8 text-sm text-zinc-700 outline-none hover:bg-zinc-50 focus:border-[color:var(--color-brand)]"
                aria-label="Select time range"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7d</option>
                <option value="30d">Last 30d</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Refresh */}
            <button
              onClick={() => setLastUpdated(new Date())}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-[color:var(--color-line)] bg-white px-3 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 active:bg-zinc-100"
            >
              <RefreshIcon className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Hero + content */}
      <section className="bg-[radial-gradient(1400px_600px_at_20%_0%,#f5f8ef,transparent_60%),radial-gradient(1200px_600px_at_80%_0%,#eef7ea,transparent_60%)]">
        <div className="mx-auto max-w-screen-2xl px-6 py-7">
          {/* Welcome hero */}
          <div className="flex items-start gap-4">
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
              <LeafBadgeIcon className="h-7 w-7 text-[color:var(--color-brand)]" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-700">
                Welcome back, System Administrator!
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                Monitoring{" "}
                <span className="font-semibold text-zinc-700">1</span> total
                system devices
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <ShieldIcon className="h-4 w-4 text-[color:var(--color-brand)]" />
                  <span>System Administrator</span>
                </span>
                <Dot />
                <span>AGRIna System</span>
                <Dot />
                <span>Full System Access</span>
              </div>
            </div>
          </div>

          {/* Top counters */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<WifiIcon className="h-5 w-5" />}
              title="Online Devices"
              value="1"
              hint="Across 4 locations"
            />
            <StatCard
              icon={<DeployIcon className="h-5 w-5" />}
              title="Active Deployments"
              value="1"
              hint="System Testing"
            />
            <StatCard
              icon={<BarsIcon className="h-5 w-5" />}
              title="Recent Readings"
              value="1"
              hint="Last 24h"
            />
            <StatCard
              icon={<CheckCircleIcon className="h-5 w-5" />}
              title="System Health"
              value="100%"
              hint="All collectors healthy"
            />
          </div>

          {/* Segmented control and timestamp */}
          <div className="mt-6 flex items-center justify-between">
            <div className="mx-auto max-w-lg flex-1">
              <Segmented
                items={["Device Overview", "Device Management"]}
                activeIndex={0}
                onChange={() => {}}
              />
            </div>
            <div className="hidden text-xs text-zinc-500 md:block">
              Last updated:{" "}
              <span className="font-medium text-zinc-600">
                {lastUpdatedStr}
              </span>
            </div>
          </div>

          {/* Key Soil Metrics */}
          <div className="mt-6">
            <h3 className="px-1 text-sm font-semibold text-zinc-700">
              Key Soil Metrics
            </h3>
            <p className="px-1 text-xs text-zinc-500">
              Averages for the selected period
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {soilMetrics.map((m) => (
                <MetricPill
                  key={m.key}
                  k={m.key}
                  label={m.label}
                  value={m.value}
                  hint={m.hint}
                />
              ))}
            </div>
          </div>

          {/* Featured device card */}
          <div className="mt-6 grid gap-6">
            <DeviceCard />
          </div>

          {/* Quick tiles */}
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Tile
              icon={
                <PulseLineIcon className="h-7 w-7 text-[color:var(--color-brand)]" />
              }
              title="View Live Data"
              desc="Monitor real-time readings from all your devices"
              href="/live-readings"
            />
            <Tile
              icon={<ChartIcon className="h-7 w-7 text-amber-500" />}
              title="Historical Data"
              desc="Analyze trends and view deployment history"
              href="/historical-logs"
            />
            <Tile
              icon={<DownloadIcon className="h-7 w-7 text-emerald-600" />}
              title="Export Data"
              desc="Download your data in CSV or PDF format"
              href="/export-data"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* Components */

function StatCard(props: {
  icon: React.ReactNode;
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-zinc-300 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--color-pill)] ring-1 ring-[color:var(--color-pill-ring)] text-[color:var(--color-brand)]">
          {props.icon}
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-zinc-700">
            {props.title}
          </div>
          <div className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900">
            {props.value}
          </div>
          <div className="mt-0.5 text-xs text-zinc-500">{props.hint}</div>
        </div>
      </div>
    </div>
  );
}

function Segmented(props: {
  items: string[];
  activeIndex: number;
  onChange: (ix: number) => void;
}) {
  return (
    <div className="mx-auto grid grid-cols-2 rounded-full bg-white p-1 shadow-sm ring-1 ring-[color:var(--color-line)]">
      {props.items.map((label, i) => {
        const active = i === props.activeIndex;
        return (
          <button
            key={label}
            onClick={() => props.onChange(i)}
            className={`h-9 rounded-full text-sm font-medium transition ${
              active
                ? "bg-[color:var(--color-pill)] ring-1 ring-[color:var(--color-pill-ring)] text-zinc-800 shadow-sm"
                : "text-zinc-500 hover:bg-zinc-50"
            }`}
          >
            <span className="px-5">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function MetricPill({
  k,
  label,
  value,
  hint,
}: {
  k: string;
  label: string;
  value: string;
  hint: string;
}) {
  const icon =
    k === "N" ? (
      <AtomNIcon className="h-5 w-5" />
    ) : k === "P" ? (
      <AtomPIcon className="h-5 w-5" />
    ) : k === "K" ? (
      <AtomKIcon className="h-5 w-5" />
    ) : k === "pH" ? (
      <PHFlaskIcon className="h-5 w-5" />
    ) : k === "EC" ? (
      <ECProbeIcon className="h-5 w-5" />
    ) : k === "T" ? (
      <ThermoIcon className="h-5 w-5" />
    ) : k === "H" ? (
      <HumidityIcon className="h-5 w-5" />
    ) : null;

  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-4 shadow-sm">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--color-pill)] ring-1 ring-[color:var(--color-pill-ring)] text-[color:var(--color-brand)]">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-zinc-700">{label}</div>
        <div className="mt-1 text-xl font-bold text-zinc-900">{value}</div>
        <div className="text-[11px] text-zinc-500">{hint}</div>
      </div>
    </div>
  );
}

function DeviceCard() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-pill-ring)] bg-[color:var(--color-pill)]/60 p-0 shadow-[var(--shadow-card)]">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-zinc-700">
              <HomeSmallIcon className="h-4 w-4 text-[color:var(--color-brand)]" />
              <span>AGRIna Demo Device</span>
            </div>
            <div className="mt-0.5 text-xs text-zinc-500">AGR-DEMO01</div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 text-sm text-zinc-700">
          <div className="flex items-start gap-2">
            <PinIcon className="mt-0.5 h-4 w-4 text-zinc-400" />
            <div>
              <div>Demo Field – System Testing</div>
              <div className="text-xs text-zinc-500">AGRIna System Testing</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-zinc-400" />
            <span className="text-sm text-zinc-600">Last seen: 1h ago</span>
          </div>
        </div>

        {/* Latest readings now include all seven metrics */}
        <div className="mt-5">
          <div className="text-[13px] font-semibold text-zinc-700">
            Latest Readings
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <Reading label="N" value="48 ppm" />
            <Reading label="P" value="27 ppm" />
            <Reading label="K" value="52 ppm" />
            <Reading label="pH" value="6.3" />
            <Reading label="EC" value="1.8 mS/cm" />
            <Reading label="Temp" value="24.6°C" />
            <Reading label="Humidity" value="72%" />
          </div>
          <div className="mt-2 text-xs text-zinc-500">Updated: 11:30:55 AM</div>
        </div>
      </div>
    </div>
  );
}

function Reading({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--color-pill-ring)] bg-white px-3 py-2 shadow-sm">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-base font-semibold text-zinc-800">{value}</div>
    </div>
  );
}

function Tile(props: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <a
      href={props.href}
      className="block rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--color-pill)] ring-1 ring-[color:var(--color-pill-ring)]">
          {props.icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-700">
            {props.title}
          </div>
          <div className="text-xs text-zinc-500">{props.desc}</div>
        </div>
      </div>
    </a>
  );
}

/* Utilities */
function Dot() {
  return <span className="inline-block h-1 w-1 rounded-full bg-zinc-300" />;
}

function formatTime(d: Date) {
  const hh = d.getHours() % 12 || 12;
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${hh}:${mm}:${ss} ${ampm}`;
}

/* Inline icons */

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none">
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M20 12a8 8 0 1 1-2.34-5.66"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 4v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeafBadgeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="#f9fcf7" />
      <path d="M12 6c4 5 1 14-5 14 2-5 4-10 5-14z" fill="currentColor" />
      <path
        d="M13 8c3 3 5 7 5 9-2 0-6-3-5-9z"
        fill="currentColor"
        opacity=".6"
      />
    </svg>
  );
}

function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function WifiIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M2 8a16 16 0 0 1 20 0M5 11a11 11 0 0 1 14 0M8 14a6 6 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function DeployIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect
        x="3"
        y="7"
        width="18"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M7 7V5h10v2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BarsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M5 19V9M12 19V5M19 19v-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckCircleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12l3 3 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeSmallIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
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

function PulseLineIcon({ className = "h-7 w-7" }: { className?: string }) {
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

function ChartIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect
        x="4"
        y="9"
        width="3"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="10.5"
        y="5"
        width="3"
        height="13"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="17"
        y="12"
        width="3"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function DownloadIcon({ className = "h-7 w-7" }: { className?: string }) {
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

/* Chemistry/metric icons */
function AtomNIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 15V9l6 6V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function AtomPIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 16V8h4a3 3 0 0 1 0 6H9z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function AtomKIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 8v8M15.5 8L9 14m6.5 2L12 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PHFlaskIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M9 3h6M10 3v5l-4 7a3 3 0 0 0 3 4h6a3 3 0 0 0 3-4l-4-7V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 11h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ECProbeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect
        x="4"
        y="5"
        width="6"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 9h6M10 15h6M16 5v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ThermoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M10 14.5V6a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 12v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function HumidityIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3s7 6 7 11a7 7 0 1 1-14 0c0-5 7-11 7-11z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
