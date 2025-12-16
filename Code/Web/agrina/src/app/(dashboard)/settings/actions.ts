"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const fullName = formData.get("fullName") as string;
  const company = formData.get("company") as string;
  // email is usually handled separately due to verification, skipping for now unless specific

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      company: company,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/settings");
  revalidatePath("/home"); // Update sidebar name potentially
  return { success: true };
}

export async function updateDeviceSettings(formData: FormData) {
  const supabase = await createClient();

  const deviceId = formData.get("deviceId") as string;
  const name = formData.get("deviceName") as string;
  const interval = parseInt(formData.get("updateInterval") as string);
  const tempUnit = formData.get("temperatureUnit") as string;
  const autoSync = formData.get("autoSync") === "on";

  if (!deviceId) return { error: "Device ID missing" };

  const { error } = await supabase
    .from("devices")
    .update({
      name,
      update_interval_seconds: interval,
      temperature_unit: tempUnit,
      auto_sync: autoSync,
    })
    .eq("id", deviceId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/settings");
  return { success: true };
}

export async function updateUserPreferences(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const alertsEnabled = formData.get("alertsEnabled") === "on";
  const emailNotifications = formData.get("emailNotifications") === "on";
  const retentionDays = parseInt(formData.get("dataRetention") as string);
  const timezone = formData.get("timezone") as string;

  // Upsert preferences
  const { error } = await supabase.from("user_preferences").upsert({
    user_id: user.id,
    alerts_enabled: alertsEnabled,
    email_notifications: emailNotifications,
    data_retention_days: retentionDays,
    timezone: timezone,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/settings");
  return { success: true };
}
