import { createClient } from "@/utils/supabase/server";
import { DeviceSelector } from "./device-selector";
import { LiveDashboard } from "./live-dashboard";

import { Button } from "@/components/ui/button";
import { Activity, RefreshCw, Wifi } from "lucide-react";

export default async function LiveReadingsPage(props: {
  searchParams: Promise<{ device?: string }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  // 1. Fetch all devices for the selector
  const { data: devices } = await supabase
    .from("devices")
    .select("id, name, serial_number, status, firmware_version, last_seen");

  if (!devices || devices.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">No Devices Found</h1>
        <p className="text-muted-foreground">
          Please register a device to view live readings.
        </p>
      </div>
    );
  }

  // 2. determine selected device
  const selectedDeviceId = searchParams.device || devices[0].id; // Force string key if array access
  const selectedDevice =
    devices.find((d) => d.id === selectedDeviceId) || devices[0];

  // 3. Fetch latest reading for selected device
  const { data: latestReading } = await supabase
    .from("sensor_readings")
    .select("*")
    .eq("device_id", selectedDevice.id)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .single();

  return (
    <div className="space-y-8 fade-in h-screen pb-20">
      {/* Header content */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-foreground" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Live Sensor Readings
            </h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of soil conditions from AGRina devices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DeviceSelector
            devices={devices}
            selectedDeviceId={selectedDevice.id}
          />

          <Button variant="outline" size="sm" className="gap-2 bg-card">
            <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
            Refresh
          </Button>
          <div
            className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg ${
              selectedDevice.status === "online"
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full animate-pulse ${
                selectedDevice.status === "online"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                selectedDevice.status === "online"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {selectedDevice.status === "online" ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <LiveDashboard initialReading={latestReading} device={selectedDevice} />
    </div>
  );
}
