import { createClient } from "@/utils/supabase/server";
import { DeviceSelector } from "./device-selector";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Thermometer,
  Droplets,
  Wind,
  RefreshCw,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Cpu,
  Wifi,
} from "lucide-react";

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

  // Helper for status colors
  const getPhStatus = (ph: number) => {
    if (ph >= 6.0 && ph <= 7.0)
      return {
        label: "Optimal",
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "bg-green-500",
      };
    return {
      label: "Attention",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "bg-yellow-500",
    };
  };

  const phStatus = latestReading
    ? getPhStatus(latestReading.ph)
    : { label: "--", color: "text-muted", bg: "bg-muted", border: "bg-muted" };

  const lastSeen = latestReading?.recorded_at
    ? new Date(latestReading.recorded_at).toLocaleTimeString()
    : "Never";
  const lastDate = latestReading?.recorded_at
    ? new Date(latestReading.recorded_at).toLocaleDateString()
    : "";

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

      {/* Device Info Card */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
                <div className="p-1 rounded bg-primary/10">
                  <Cpu className="h-4 w-4" />
                </div>
                {selectedDevice.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 ml-7">
                Production Field - Active Deployment
              </p>
              <div className="flex flex-col gap-1 mt-3 ml-7 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-1.5 py-0.5 rounded">
                    ID: {selectedDevice.serial_number}
                  </span>
                  <span>
                    Firmware: {selectedDevice.firmware_version || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    selectedDevice.status === "online"
                      ? "bg-primary/20 text-primary"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  <Wifi className="h-3 w-3" />
                  {selectedDevice.status.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Last updated:{" "}
                  <span className="text-foreground font-medium">
                    {lastDate}, {lastSeen}
                  </span>
                </span>
                <span>
                  Last seen:{" "}
                  <span className="font-medium text-foreground">
                    {lastSeen}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* pH Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Droplets className="h-4 w-4" /> pH Level
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">
                {latestReading?.ph ?? "--"}
              </span>
              {latestReading && (
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded ${phStatus.color} ${phStatus.bg}`}
                >
                  {phStatus.label}
                </span>
              )}
            </div>

            {/* Simple Visualizer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Current pH</span>
                <span>0 - 14</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full relative overflow-hidden">
                <div className="absolute left-[42%] w-[15%] h-full bg-green-500/20" />
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${phStatus.border}`}
                  style={{ width: `${((latestReading?.ph || 0) / 14) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>0</span>
                <span>7</span>
                <span>14</span>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground border-t border-border pt-2">
              Rice Optimal: 6.0 - 7.0
            </div>
          </CardContent>
        </Card>

        {/* Temperature Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Thermometer className="h-4 w-4" /> Temperature
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">
                {latestReading?.temperature ?? "--"}°C
              </span>
              <span className="text-sm font-medium text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
                Acceptable
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Soil Temp</span>
                <span>0°C - 50°C</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full relative overflow-hidden">
                <div className="absolute left-[50%] w-[10%] h-full bg-green-500/20" />
                <div
                  className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((latestReading?.temperature || 0) / 50) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>0°C</span>
                <span>25°C</span>
                <span>50°C</span>
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground border-t border-border pt-2">
              Rice Optimal: 25-30°C
            </div>
          </CardContent>
        </Card>

        {/* NPK Card */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Activity className="h-4 w-4" /> NPK Nutrients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wind className="h-4 w-4" /> Nitrogen (N)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  {latestReading?.nitrogen ?? "--"}
                </span>
                <span className="text-[10px] text-muted-foreground">ppm</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" /> Phosphorus (P)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  {latestReading?.phosphorus ?? "--"}
                </span>
                <span className="text-[10px] text-muted-foreground">ppm</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" /> Potassium (K)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  {latestReading?.potassium ?? "--"}
                </span>
                <span className="text-[10px] text-muted-foreground">ppm</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground pt-2">
              Optimal Ranges: N: 40-60, P: 20-35, K: 150-250 ppm
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations - Could be dynamic based on values later */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Smart Recommendations for {selectedDevice.name}
          </h2>
        </div>

        <Card className="bg-green-500/5 border-green-500/20">
          <CardContent className="p-4 flex gap-4">
            <div className="mt-1">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-green-600 dark:text-green-400">
                pH Status: Optimal
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Current pH level of {latestReading?.ph} is within optimal range
                (6.0-7.0) for rice cultivation. Continue current soil management
                practices.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Warning Example */}
        {latestReading && (latestReading.ph < 6 || latestReading.ph > 7) && (
          <Card className="bg-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-4 flex gap-4">
              <div className="mt-1">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">
                  pH Warning
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  pH is outside optimal range. Consider soil amendment.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
