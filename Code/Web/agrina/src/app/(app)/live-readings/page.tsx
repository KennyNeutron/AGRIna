// src/app/(app)/live-readings/page.tsx
"use client";

import { useEffect, useState } from "react";

type Reading = {
  ts: string;
  n: string;
  p: string;
  k: string;
  ph: string;
  t: string;
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
        t: `${rnd(22, 28, 1)}°C`,
      };
    };

    const initial: Reading[] = Array.from({ length: 5 }, () => makeRow());
    setRows(initial);

    const id = setInterval(() => {
      setRows((current) => [makeRow(), ...current].slice(0, 40));
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-6">
          <h1 className="text-lg font-semibold text-zinc-700">Live Readings</h1>
          <p className="ml-3 text-sm text-zinc-500">
            Real-time sensor data from your devices
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        {/* Live metric tiles */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
            label="Temperature"
            icon={<ThermoIcon />}
            value={rows[0]?.t ?? "—"}
          />
        </div>

        {/* Live table */}
        <div className="mt-6 rounded-[var(--radius-xl)] border border-zinc-200 bg-white p-5 shadow-[var(--shadow-card)]">
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
                  <th>Temp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {rows.map((r, idx) => (
                  <tr
                    key={`${r.ts}-${idx}`}
                    className="[&>td]:py-2 [&>td]:px-3"
                  >
                    <td className="font-mono text-xs text-zinc-500">{r.ts}</td>
                    <td>{r.n}</td>
                    <td>{r.p}</td>
                    <td>{r.k}</td>
                    <td>{r.ph}</td>
                    <td>{r.t}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-zinc-500">
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

type MetricTileProps = {
  label: string;
  icon: JSX.Element;
  value: string;
};

function MetricTile({ label, icon, value }: MetricTileProps) {
  return (
    <div className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
        {icon}
      </div>
      <div>
        <div className="text-xs text-zinc-500">{label}</div>
        <div className="mt-0.5 text-base font-semibold text-zinc-800">
          {value}
        </div>
      </div>
    </div>
  );
}

/* Icons */

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
