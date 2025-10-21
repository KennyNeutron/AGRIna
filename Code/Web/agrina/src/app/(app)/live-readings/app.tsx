// src/app/(app)/live-readings/page.tsx
export default function LiveReadingsPage() {
  return (
    <div className="min-h-[100dvh]">
      <Header
        title="Live Readings"
        desc="Real-time sensor data from your devices"
      />
      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <Panel title="Soil Moisture">Live chart goes here.</Panel>
          <Panel title="Soil pH">Live chart goes here.</Panel>
          <Panel title="Temperature">Live chart goes here.</Panel>
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

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="text-sm font-semibold text-zinc-700">{title}</div>
      <div className="mt-3 text-sm text-zinc-600">{children}</div>
    </div>
  );
}
