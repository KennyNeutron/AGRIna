"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Cpu,
  Wifi,
} from "lucide-react";

interface Reading {
  id: string;
  created_at?: string;
  recorded_at?: string;
  device_id: string;
  ph: number;
  temperature: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  signal_quality?: number;
}

interface Device {
  id: string;
  name: string;
  serial_number: string;
  status: string;
  firmware_version?: string;
  last_seen?: string;
}

interface LiveDashboardProps {
  initialReading: Reading | null;
  device: Device;
  totalDevices?: number;
}

export function LiveDashboard({
  initialReading,
  device,
  totalDevices = 1,
}: LiveDashboardProps) {
  const [reading, setReading] = useState<Reading | null>(initialReading);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const supabase = createClient();

  // Update local state if prop changes (e.g. device switch)
  useEffect(() => {
    setReading(initialReading);
  }, [initialReading]);

  // Polling fallback to ensure data freshness
  useEffect(() => {
    if (!device?.id) return;

    const fetchLatest = async () => {
      const { data } = await supabase
        .from("sensor_readings")
        .select("*")
        .eq("device_id", device.id)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setReading((current) => {
          // Only update if the new reading is actually newer or different
          if (
            !current ||
            (data.recorded_at && current.recorded_at !== data.recorded_at)
          ) {
            console.log("Polled new reading:", data);
            setLastUpdated(new Date());
            return data as Reading;
          }
          return current;
        });
      }
    };

    // Initial fetch on mount/device change
    fetchLatest();

    // Poll every 5 seconds
    const interval = setInterval(fetchLatest, 5000);

    // Subscribe to INSERT events on sensor_readings for this device
    const channel = supabase
      .channel("sensor_readings_insert")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sensor_readings",
          filter: `device_id=eq.${device.id}`,
        },
        (payload) => {
          console.log("Realtime event received:", payload.new);
          setReading(payload.new as Reading);
          setLastUpdated(new Date());
        },
      )
      .subscribe();

    // Check offline status every 5 seconds
    const statusInterval = setInterval(() => {
      setNow(new Date()); // Force re-render relative times
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
      supabase.removeChannel(channel);
    };
  }, [device.id, supabase]);

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

  const [now, setNow] = useState(new Date());

  // Helper to parse timestamp safely (assume UTC if no offset)
  const parseTimestamp = (ts: string | undefined) => {
    if (!ts) return null;
    // If it looks like ISO but has no Z and no offset, append Z
    if (
      ts.includes("T") &&
      !ts.endsWith("Z") &&
      !ts.includes("+") &&
      !ts.includes("-")
    ) {
      return new Date(ts + "Z");
    }
    return new Date(ts);
  };

  const readingDate = parseTimestamp(reading?.recorded_at);
  const timeSinceReading = readingDate
    ? Math.floor((now.getTime() - readingDate.getTime()) / 1000)
    : null;

  const phStatus = reading
    ? getPhStatus(reading.ph)
    : { label: "--", color: "text-muted", bg: "bg-muted", border: "bg-muted" };

  const lastSeenTime = readingDate ? readingDate.toLocaleTimeString() : "Never";
  const lastSeenDate = readingDate ? readingDate.toLocaleDateString() : "";

  // Calculate device status based on last reading time
  // Threshold: 60 seconds * totalDevices
  const thresholdSec = 60 * totalDevices;
  const isOffline = !timeSinceReading || timeSinceReading > thresholdSec;

  const statusColor = isOffline
    ? "bg-red-500/20 text-red-500"
    : "bg-green-500/20 text-green-500";
  const statusText = isOffline ? "OFFLINE" : "ONLINE";

  const connectionStatus = isOffline ? (
    <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Connection Offline (
      {timeSinceReading ? `${Math.floor(timeSinceReading)}s ago` : "Never"})
    </span>
  ) : (
    <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      Live Data Connection Active ({Math.floor(timeSinceReading || 0)}s latency)
    </span>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Device Info Card */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
                <div className="p-1 rounded bg-primary/10">
                  <Cpu className="h-4 w-4" />
                </div>
                {device.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 ml-7">
                Production Field - Active Deployment
              </p>
              <div className="flex flex-col gap-1 mt-3 ml-7 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-1.5 py-0.5 rounded">
                    ID: {device.serial_number}
                  </span>
                  <span>Firmware: {device.firmware_version || "Unknown"}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {connectionStatus}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${statusColor}`}
                >
                  <Wifi className="h-3 w-3" />
                  {statusText}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Latest Reading:{" "}
                  <span className="text-foreground font-medium">
                    {lastSeenDate}, {lastSeenTime}
                  </span>
                </span>
                <span>
                  Reading age:{" "}
                  <span
                    className={
                      isOffline
                        ? "text-red-500 font-bold"
                        : "text-green-500 font-bold"
                    }
                  >
                    {timeSinceReading !== null ? `${timeSinceReading}s` : "--"}
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
            <div className="flex items-baseline justify-between transition-all duration-300">
              <span className="text-3xl font-bold text-foreground">
                {reading?.ph ?? "--"}
              </span>
              {reading && (
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
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${phStatus.border}`}
                  style={{ width: `${((reading?.ph || 0) / 14) * 100}%` }}
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
            <div className="flex items-baseline justify-between transition-all duration-300">
              <span className="text-3xl font-bold text-foreground">
                {reading?.temperature ?? "--"}°C
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
                  className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${((reading?.temperature || 0) / 50) * 100}%`,
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
                <span className="text-lg font-bold text-foreground transition-all duration-300">
                  {reading?.nitrogen ?? "--"}
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
                <span className="text-lg font-bold text-foreground transition-all duration-300">
                  {reading?.phosphorus ?? "--"}
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
                <span className="text-lg font-bold text-foreground transition-all duration-300">
                  {reading?.potassium ?? "--"}
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

      {/* Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-green-500/10">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Smart Recommendations for {device.name}
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
                Current pH level of {reading?.ph} is within optimal range
                (6.0-7.0) for rice cultivation. Continue current soil management
                practices.
              </p>
            </div>
          </CardContent>
        </Card>

        {reading && (reading.ph < 6 || reading.ph > 7) && (
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
