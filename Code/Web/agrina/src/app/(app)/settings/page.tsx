// src/app/(app)/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="min-h-[100dvh]">
      <Header
        title="Settings"
        desc="Profile, notifications, and system preferences"
      />
      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="Profile">
            <form className="grid gap-3">
              <Field label="Display Name" placeholder="System Administrator" />
              <Field
                label="Email"
                placeholder="admin@agrina.system"
                type="email"
              />
              <div>
                <button className="rounded-lg bg-[color:var(--color-brand)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--color-brand-hover)]">
                  Save Changes
                </button>
              </div>
            </form>
          </Card>

          <Card title="Notifications">
            <form className="grid gap-3">
              <Toggle id="emails" label="Email notifications" />
              <Toggle id="alerts" label="Alert push notifications" />
            </form>
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

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[color:var(--color-line)] bg-white px-3 text-sm outline-none placeholder:text-zinc-400 focus:border-[color:var(--color-brand)]"
      />
    </label>
  );
}

function Toggle({ id, label }: { id: string; label: string }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-3 text-sm"
    >
      <span className="text-zinc-700">{label}</span>
      <input
        id={id}
        type="checkbox"
        className="h-5 w-10 cursor-pointer appearance-none rounded-full bg-zinc-300 transition checked:bg-[color:var(--color-brand)]"
      />
    </label>
  );
}
