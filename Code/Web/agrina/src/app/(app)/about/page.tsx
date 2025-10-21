// src/app/(app)/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-[100dvh]">
      <Header title="About" desc="Learn more about AGRIna platform" />
      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
          <p className="text-sm text-zinc-600">
            AGRIna is a multi-user soil analytics platform providing live sensor
            readings, historical analysis, and exportable reports. This
            interface is designed with clarity and low visual noise so operators
            can focus on data quality and actions.
          </p>
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
