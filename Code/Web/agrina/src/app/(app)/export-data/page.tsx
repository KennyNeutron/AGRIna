// src/app/(app)/export-data/page.tsx
export default function ExportDataPage() {
  return (
    <div className="min-h-[100dvh]">
      <Header
        title="Export Data"
        desc="Download your data in CSV or PDF format"
      />
      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="Quick Export (CSV)">
            <p className="text-sm text-zinc-600">
              Export the last 7 days of data for all devices.
            </p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg bg-[color:var(--color-brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-brand-hover)]">
                Download CSV
              </button>
              <button className="rounded-lg border border-[color:var(--color-line)] bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-50">
                Advanced
              </button>
            </div>
          </Card>

          <Card title="PDF Report">
            <p className="text-sm text-zinc-600">
              Generate a printable report including charts and summaries.
            </p>
            <div className="mt-3">
              <button className="rounded-lg bg-[color:var(--color-brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-brand-hover)]">
                Generate PDF
              </button>
            </div>
          </Card>
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

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="text-sm font-semibold text-zinc-700">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
