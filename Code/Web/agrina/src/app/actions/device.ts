"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createDevice(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const serial_number = formData.get("serial_number") as string;
  const status = formData.get("status") as string;
  const firmware_version = formData.get("firmware_version") as string;
  const update_interval_seconds = parseInt(
    (formData.get("update_interval_seconds") as string) || "300",
  );
  const auto_sync = formData.get("auto_sync") === "on";

  if (!name || !serial_number) {
    return { error: "Name and Serial Number are required" };
  }

  const { data, error } = await supabase
    .from("devices")
    .insert({
      name,
      serial_number,
      status: status || "Active",
      firmware_version: firmware_version || "1.0.0",
      update_interval_seconds,
      auto_sync,
      // last_seen will be null initially
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating device:", error);
    return { error: error.message };
  }

  revalidatePath("/history");
  revalidatePath("/home"); // Update dashboard count
  revalidatePath("/live-readings"); // Update live selector

  return { success: true, device: data };
}
