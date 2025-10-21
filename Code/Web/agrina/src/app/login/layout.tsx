// src/app/login/layout.tsx
import { createSupabaseRSC } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseRSC();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect("/dashboard");
  return <>{children}</>;
}
