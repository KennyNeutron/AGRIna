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

  const lot_owner = formData.get("lot_owner") as string;
  const start_date = formData.get("start_date") as string; // Will need conversion if it's empty string
  const end_date = formData.get("end_date") as string;
  const lat = formData.get("lat") as string;
  const lng = formData.get("lng") as string;
  const crop_type = formData.get("crop_type") as string;
  const field_description = formData.get("field_description") as string;
  const notes = formData.get("notes") as string;

  if (!name || !serial_number) {
    return { error: "Name and Serial Number are required" };
  }

  let coordinates = null;
  if (lat && lng) {
    coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
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
      // New fields
      lot_owner: lot_owner || null,
      start_date: start_date || null,
      end_date: end_date || null,
      coordinates: coordinates,
      field_description: field_description || null,
      crop_type: crop_type || null,
      notes: notes || null,
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
