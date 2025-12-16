import { createClient } from "@/utils/supabase/server";
import { SettingsView } from "./settings-view";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to view settings.</div>;
  }

  // Fetch all necessary data in parallel
  const [profileResult, devicesResult, prefsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("devices").select("*").limit(1).single(), // Fetch first device for now
    supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single(),
  ]);

  const profile = profileResult.data;
  const device = devicesResult.data; // Might be null if no devices
  const preferences = prefsResult.data;

  return (
    <SettingsView profile={profile} device={device} preferences={preferences} />
  );
}
