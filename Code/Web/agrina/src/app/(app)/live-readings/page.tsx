// src/app/(app)/live-readings/page.tsx
"use client";

import { useEffect, useState } from "react";

type Reading = {
  ts: string;
  n: string;
  p: string;
  k: string;
  ph: string;
  ec: string;
  t: string;
  h: string;
};

export default function LiveReadingsPage() {
  // Demo stream: updates every 3s so you can see the UI working.
  const [rows, setRows] = useState<Reading[]>([]);

  useEffect(() => {
    const makeRow = (): Reading => {
      const now = new Date();
      const ts = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const rnd = (min: number, max: number, d = 1) =>
        (Math.random() * (max - min) + min).toFixed(d);
      return {
        ts,
        n: `${rnd(35, 55, 0)} ppm`,
        p: `${rnd(20, 35, 0)} ppm`,
        k: `${rnd(40, 70, 0)} ppm`,
        ph: rnd(5.8, 6.8, 1),
        ec: `${rnd(1.2, 2.2, 1)} mS/cm`,
        t: `${rnd(22, 28, 1)}°C`,
        h: `${rnd(55, 80, 0)}%`,
      };
    };

    setRows([makeRow(), makeRow(), makeRow(), makeRow(), makeRow()]);
    const id = setInterval(
      () => setRows((r) => [makeRow(), ...r].slice(0, 40)),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-[100dvh]">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-[color:var(--color-line)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-6">
          <h1 className="text-lg font-semibold text-zinc-700">Live Readings</h1>
          <p className="ml-3 text-sm text-zinc-500">
            Real-time sensor data from your devices
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        {/* Live metric tiles */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricTile
            label="Nitrogen (N)"
            icon={<AtomNIcon />}
            value={rows[0]?.n ?? "—"}
          />
          <MetricTile
            label="Phosphorus (P)"
            icon={<AtomPIcon />}
            value={rows[0]?.p ?? "—"}
          />
          <MetricTile
            label="Potassium (K)"
            icon={<AtomKIcon />}
            value={rows[0]?.k ?? "—"}
          />
          <MetricTile
            label="pH"
            icon={<PHFlaskIcon />}
            value={rows[0]?.ph ?? "—"}
          />
          <MetricTile
            label="Electrical Conductivity"
            icon={<ECProbeIcon />}
            value={rows[0]?.ec ?? "—"}
          />
          <MetricTile
            label="Temperature"
            icon={<ThermoIcon />}
            value={rows[0]?.t ?? "—"}
          />
          <MetricTile
            label="Humidity"
            icon={<HumidityIcon />}
            value={rows[0]?.h ?? "—"}
          />
        </div>

        {/* Live table */}
        <div className="mt-6 rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="mb-3 text-sm font-semibold text-zinc-700">Stream</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs text-zinc-600">
                <tr className="[&>th]:py-2 [&>th]:px-3">
                  <th>Time</th>
                  <th>N</th>
                  <th>P</th>
                  <th>K</th>
                  <th>pH</th>
                  <th>EC</th>
                  <th>Temp</th>
                  <th>Humidity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--color-line)] text-zinc-700">
                {rows.map((r, i) => (
                  <tr key={i} className="[&>td]:py-2 [&>td]:px-3">
                    <td className="text-zinc-500">{r.ts}</td>
                    <td>{r.n}</td>
                    <td>{r.p}</td>
                    <td>{r.k}</td>
                    <td>{r.ph}</td>
                    <td>{r.ec}</td>
                    <td>{r.t}</td>
                    <td>{r.h}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-zinc-500">
                      Waiting for data…
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* UI pieces */

function MetricTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-4 shadow-sm">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-[color:var(--color-pill)] ring-1 ring-[color:var(--color-pill-ring)] text-[color:var(--color-brand)]">
        {icon}
      </div>
      <div>
        <div className="text-[13px] font-semibold text-zinc-700">{label}</div>
        <div className="mt-1 text-xl font-bold text-zinc-900">{value}</div>
      </div>
    </div>
  );
}

/* Inline icons */
function AtomNIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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
function AtomPIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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
function AtomKIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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
function PHFlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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
function ECProbeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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
function ThermoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
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
function HumidityIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M12 3s7 6 7 11a7 7 0 1 1-14 0c0-5 7-11 7-11z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
