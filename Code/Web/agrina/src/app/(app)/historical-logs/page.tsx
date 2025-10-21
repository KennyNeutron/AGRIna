// src/app/(app)/historical-logs/page.tsx
export default function HistoricalLogsPage() {
  return (
    <div className="min-h-[100dvh]">
      <Header
        title="Historical Logs"
        desc="View historical data, trends, and deployment records"
      />
      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-semibold text-zinc-700">Filters</div>
            <div className="flex flex-wrap gap-2">
              <input
                className="h-10 rounded-lg border border-[color:var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[color:var(--color-brand)]"
                placeholder="Search device or site"
              />
              <input
                className="h-10 rounded-lg border border-[color:var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[color:var(--color-brand)]"
                type="date"
              />
              <input
                className="h-10 rounded-lg border border-[color:var(--color-line)] bg-white px-3 text-sm outline-none focus:border-[color:var(--color-brand)]"
                type="date"
              />
              <button className="h-10 rounded-lg bg-[color:var(--color-brand)] px-4 text-sm font-semibold text-white hover:bg-[color:var(--color-brand-hover)]">
                Apply
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-[color:var(--color-line)]">
            <div className="grid grid-cols-4 gap-0 border-b border-[color:var(--color-line)] bg-zinc-50 p-3 text-xs font-medium text-zinc-600">
              <div>Timestamp</div>
              <div>Device</div>
              <div>Metric</div>
              <div>Value</div>
            </div>
            <div className="divide-y divide-[color:var(--color-line)] text-sm">
              <Row
                ts="2025-03-10 14:22:01"
                dev="NDMC-01"
                m="Moisture"
                v="23.4%"
              />
              <Row ts="2025-03-10 14:21:44" dev="NDMC-01" m="pH" v="6.7" />
              <Row
                ts="2025-03-10 14:21:13"
                dev="SITE-B-03"
                m="Temp"
                v="27.3°C"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Header({ title, desc }: { title: string; desc: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--color-line)] bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-6">
        <h1 className="text-lg font-semibold text-zinc-700">{title}</h1>
        <p className="ml-3 text-sm text-zinc-500">{desc}</p>
      </div>
    </header>
  );
}

function Row({
  ts,
  dev,
  m,
  v,
}: {
  ts: string;
  dev: string;
  m: string;
  v: string;
}) {
  return (
    <div className="grid grid-cols-4 gap-0 p-3 text-zinc-700">
      <div className="text-zinc-600">{ts}</div>
      <div>{dev}</div>
      <div>{m}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}
