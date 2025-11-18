// src/app/(app)/dashboard/page.tsx
"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

type RangeKey = "24h" | "7d" | "30d";

type SoilMetricKey = "N" | "P" | "K" | "pH" | "T";

type SoilMetric = {
  key: SoilMetricKey;
  label: string;
  value: string;
  hint: string;
};

const SOIL_METRICS: SoilMetric[] = [
  {
    key: "N",
    label: "Nitrogen (N)",
    value: "48 ppm",
    hint: "Average of selected range",
  },
  {
    key: "P",
    label: "Phosphorus (P)",
    value: "27 ppm",
    hint: "Average of selected range",
  },
  {
    key: "K",
    label: "Potassium (K)",
    value: "52 ppm",
    hint: "Average of selected range",
  },
  {
    key: "pH",
    label: "pH",
    value: "6.3",
    hint: "Average of selected range",
  },
  {
    key: "T",
    label: "Temperature",
    value: "24.6°C",
    hint: "Average of selected range",
  },
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function rangeLabel(range: RangeKey): string {
  if (range === "24h") return "Last 24 hours";
  if (range === "7d") return "Last 7 days";
  return "Last 30 days";
}

export default function DashboardPage() {
  const [range, setRange] = useState<RangeKey>("24h");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const lastUpdatedStr = useMemo(() => formatTime(lastUpdated), [lastUpdated]);

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-lg font-semibold text-zinc-700">Dashboard</h1>
            <p className="text-sm text-zinc-500">
              Overview of your device and soil conditions
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Time range select */}
            <div className="relative">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value as RangeKey)}
                className="h-9 rounded-lg border border-zinc-200 bg-white px-3 pr-8 text-xs font-medium text-zinc-700 shadow-sm outline-none ring-0 transition hover:bg-zinc-50 focus:border-emerald-500"
                aria-label="Select time range"
              >
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7d</option>
                <option value="30d">Last 30d</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-zinc-400">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => setLastUpdated(new Date())}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 active:bg-zinc-100"
            >
              <RefreshIcon className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        {/* Welcome and summary */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)]">
          {/* Device card */}
          <DeviceCard lastUpdatedStr={lastUpdatedStr} />

          {/* Soil metrics */}
          <div className="rounded-[var(--radius-xl)] border border-zinc-200 bg-white p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-zinc-700">
                  Soil overview
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Aggregated readings from your active AGRIna device.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                <ClockIcon className="h-3.5 w-3.5" />
                {rangeLabel(range)}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SOIL_METRICS.map((metric) => (
                <SoilMetricCard key={metric.key} metric={metric} />
              ))}
            </div>
          </div>
        </section>

        {/* Quick stats row */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <QuickStatCard
            label="Active devices"
            value="1"
            hint="Online and reporting"
          />
          <QuickStatCard
            label="Alerts (24h)"
            value="0"
            hint="No threshold breaches detected"
          />
          <QuickStatCard
            label="Logged readings"
            value="1,280+"
            hint="Stored in the last 7 days"
          />
        </section>
      </main>
    </div>
  );
}

function QuickStatCard(props: { label: string; value: string; hint: string }) {
  const { label, value, hint } = props;
  return (
    <div className="rounded-[var(--radius-lg)] border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-xs font-medium text-zinc-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-zinc-800">{value}</div>
      <div className="mt-1 text-[11px] text-zinc-500">{hint}</div>
    </div>
  );
}

function SoilMetricCard({ metric }: { metric: SoilMetric }) {
  const { key, label, value, hint } = metric;

  let icon: ReactNode | null = null;
  if (key === "N") icon = <AtomNIcon className="h-5 w-5" />;
  else if (key === "P") icon = <AtomPIcon className="h-5 w-5" />;
  else if (key === "K") icon = <AtomKIcon className="h-5 w-5" />;
  else if (key === "pH") icon = <PHFlaskIcon className="h-5 w-5" />;
  else if (key === "T") icon = <ThermoIcon className="h-5 w-5" />;

  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-zinc-500">{label}</div>
        <div className="mt-0.5 text-base font-semibold text-zinc-800">
          {value}
        </div>
        <div className="mt-0.5 text-[11px] text-zinc-500">{hint}</div>
      </div>
    </div>
  );
}

function DeviceCard({ lastUpdatedStr }: { lastUpdatedStr: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-zinc-200 bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-zinc-700">
            <HomeSmallIcon className="h-4 w-4 text-emerald-600" />
            <span>AGRIna Demo Device</span>
          </div>
          <div className="mt-0.5 text-xs text-zinc-500">AGR-DEMO01</div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          <StatusDotIcon className="h-2.5 w-2.5" />
          Online
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-zinc-700">
        <div className="flex items-start gap-2">
          <CheckCircleIcon className="mt-[1px] h-4 w-4 text-emerald-600" />
          <div>
            <div className="text-xs font-semibold text-zinc-700">
              Stable readings
            </div>
            <div className="mt-0.5 text-xs text-zinc-500">
              All monitored parameters are within your configured thresholds.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <ClockIcon className="h-3.5 w-3.5" />
          <span>
            Last sync:{" "}
            <span className="font-medium text-zinc-700">{lastUpdatedStr}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* Icons */

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M5 7l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RefreshIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M4 4v6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 13a7 7 0 0 0 12 3l2-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 11V5h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 11a7 7 0 0 0-12-3L5 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeSmallIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M4 11.5 12 5l8 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10.5V19h11v-8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatusDotIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="6" cy="6" r="5" fill="currentColor" />
    </svg>
  );
}

function CheckCircleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 12.5 11 14l4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AtomNIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="4.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="4.5"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function AtomPIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path
        d="M5 9c2.5-2 5.5-3 7-3s4.5 1 7 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 15c2.5 2 5.5 3 7 3s4.5-1 7-3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AtomKIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path
        d="M6 6.5c2-1.5 4.5-2.5 6-2.5s4 1 6 2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6 17.5c2 1.5 4.5 2.5 6 2.5s4-1 6-2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PHFlaskIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M9 3h6M10 3v5l-4 7a3 3 0 0 0 3 4h6a3 3 0 0 0 3-4l-4-7V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 13h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ThermoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M10 5a2 2 0 0 1 4 0v7.5a3.5 3.5 0 1 1-4 0V5z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="17" r="1.3" fill="currentColor" />
    </svg>
  );
}
