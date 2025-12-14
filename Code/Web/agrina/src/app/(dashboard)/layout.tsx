import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Safe default for when auth check fails or returns no user
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (e) {
    // Handle auth error smoothly
  }

  let profile = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, email, role") // Select specific fields to ensure simpler object
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar profile={profile} />
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
