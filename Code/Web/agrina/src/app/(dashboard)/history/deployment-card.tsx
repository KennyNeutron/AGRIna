"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar as CalendarIcon,
  User,
  Activity,
  Thermometer,
  Leaf,
  Droplets,
  Clock,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface DeploymentCardProps {
  device: any;
  readings: any[];
  now: Date;
}

export function DeploymentCard({ device, readings, now }: DeploymentCardProps) {
  // Sort readings by date descending (newest first)
  const sortedReadings = [...readings].sort(
    (a, b) =>
      new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime(),
  );
  const latestReading = sortedReadings[0];
  const totalReadings = readings.length;

  // Status Logic
  const lastSeen = device.last_seen ? new Date(device.last_seen) : null;
  const isOffline = !lastSeen || now.getTime() - lastSeen.getTime() > 60000;
  const isActive = !device.end_date; // Assuming active if no end date

  // Calculate Statistics
  const calculateStats = (key: string) => {
    // Check if readings exist and key exists
    const validReadings = readings.filter(
      (r) => r[key] !== undefined && r[key] !== null,
    );

    if (validReadings.length === 0) return { avg: "N/A", min: 0, max: 0 };

    const values = validReadings
      .map((r) => Number(r[key]))
      .filter((n) => !isNaN(n));

    if (values.length === 0) return { avg: "N/A", min: 0, max: 0 };

    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length).toFixed(1);
    const min = Math.min(...values).toFixed(1);
    const max = Math.max(...values).toFixed(1);
    return { avg, min: Number(min), max: Number(max) };
  };

  const phStats = calculateStats("ph");
  const tempStats = calculateStats("temperature");
  const nStats = calculateStats("nitrogen"); // Just average for NPK usually? Or raw.
  const pStats = calculateStats("phosphorus");
  const kStats = calculateStats("potassium");

  return (
    <Card className="border-border overflow-hidden">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="p-6 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">
                {device.lot_owner || "Unknown Owner"}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              {device.serial_number}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={
                isActive
                  ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                  : ""
              }
            >
              {isActive ? "Active" : "Completed"}
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" /> View Full Record
            </Button>
          </div>
        </div>

        {/* Deployment Info Container */}
        <div className="px-6 pb-6">
          <div className="rounded-xl border border-border bg-muted/40 p-4 grid md:grid-cols-2 gap-6">
            {/* Left: Location */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2 mb-2">
                  <User className="h-3.5 w-3.5" /> Lot Owner
                </h4>
                <p className="text-lg font-semibold text-foreground">
                  {device.lot_owner || "N/A"}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2 mb-2">
                  <MapPin className="h-3.5 w-3.5" /> GPS Coordinates
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latitude:</span>
                    <span className="font-mono font-medium">
                      {typeof device.coordinates === "object"
                        ? device.coordinates?.lat
                        : typeof device.coordinates === "string"
                          ? device.coordinates.split(",")[0]
                          : "N/A"}
                      °
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longitude:</span>
                    <span className="font-mono font-medium">
                      {typeof device.coordinates === "object"
                        ? device.coordinates?.lng
                        : typeof device.coordinates === "string"
                          ? device.coordinates.split(",")[1]?.trim() || "N/A"
                          : "N/A"}
                      °
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Period */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2 mb-2">
                  <CalendarIcon className="h-3.5 w-3.5" /> Deployment Period
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      Start Date:
                    </span>
                    <span className="font-medium">
                      {device.start_date
                        ? new Date(device.start_date).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground block">
                      End Date:
                    </span>
                    <span className="font-medium">
                      {device.end_date
                        ? new Date(device.end_date).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )
                        : "Ongoing"}
                    </span>
                  </div>
                </div>
                {/* Visual Progress Bar placeholder */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden relative">
                  <div
                    className={`absolute left-0 top-0 h-full w-full ${isActive ? "bg-green-500/50" : "bg-muted-foreground/30"}`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-foreground/50 uppercase tracking-widest">
                    {isActive ? "Currently Active" : "Deployment Ended"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Info Strip */}
        <div className="px-6 pb-6 grid md:grid-cols-12 gap-6 text-sm">
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 gap-y-4">
            <div>
              <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Activity className="h-3 w-3" /> Device
              </span>
              <p className="font-medium">{device.name}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Clock className="h-3 w-3" /> Last Reading
              </span>
              <p className="font-medium">
                {latestReading
                  ? new Date(latestReading.recorded_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )
                  : "No readings"}
              </p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Leaf className="h-3 w-3" /> Crop Type
              </span>
              <p className="font-medium">{device.crop_type || "N/A"}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3" /> Total Readings
              </span>
              <p className="font-medium">{totalReadings}</p>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-5 space-y-2">
            <div>
              <span className="text-xs text-muted-foreground mb-1 block">
                Field Description:
              </span>
              <p className="text-muted-foreground leading-snug">
                {device.field_description || "No description provided."}
              </p>
            </div>
            {device.notes && (
              <div className="pt-2">
                <span className="text-xs text-muted-foreground mb-1 block">
                  Notes:
                </span>
                <p className="text-muted-foreground leading-snug">
                  "{device.notes}"
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Sensor Stats */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4" /> Sensor Data Statistics
          </h4>

          <div className="grid md:grid-cols-3 gap-4">
            {/* pH Card */}
            <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium flex items-center gap-2 text-green-600">
                  <Droplets className="h-4 w-4" /> pH Level
                </span>
                <span className="text-xs text-muted-foreground">—</span>
              </div>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average:</span>
                  <span className="font-bold">{phStats.avg}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Range:</span>
                  <span>
                    {phStats.min} - {phStats.max}
                  </span>
                </div>
              </div>
              <div className="w-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-semibold text-center py-1 rounded">
                Optimal for Rice
              </div>
            </div>

            {/* Temp Card */}
            <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium flex items-center gap-2 text-blue-600">
                  <Thermometer className="h-4 w-4" /> Temperature
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average:</span>
                  <span className="font-bold">{tempStats.avg}°C</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Range:</span>
                  <span>
                    {tempStats.min}°C - {tempStats.max}°C
                  </span>
                </div>
              </div>
              <div className="w-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-semibold text-center py-1 rounded">
                Optimal Range
              </div>
            </div>

            {/* NPK Card */}
            <div className="rounded-lg border border-border p-4 bg-muted/50">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium flex items-center gap-2 text-foreground">
                  <Leaf className="h-4 w-4" /> NPK Levels
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nitrogen (N):</span>
                  <span className="font-medium">{nStats.avg} mg/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phosphorus (P):</span>
                  <span className="font-medium">{pStats.avg} mg/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potassium (K):</span>
                  <span className="font-medium">{kStats.avg} mg/kg</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NPK Ratio:</span>
                  {readings.length > 0 ? (
                    <span className="font-mono">
                      {Math.round(Number(nStats.avg) / 10)}:
                      {Math.round(Number(pStats.avg) / 10)}:
                      {Math.round(Number(kStats.avg) / 10)}
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Reading Strip */}
        <div className="bg-muted/20 border-t border-border p-4">
          <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3">
            <Activity className="h-3.5 w-3.5" /> Latest Reading (
            {latestReading
              ? new Date(latestReading.recorded_at).toLocaleString()
              : "N/A"}
            )
          </h4>

          <div className="grid grid-cols-5 gap-2 md:gap-4">
            <div className="bg-background border border-border rounded p-2 text-center">
              <span className="text-[10px] text-muted-foreground block uppercase">
                pH
              </span>
              <span className="font-bold text-lg">
                {latestReading?.ph || "-"}
              </span>
            </div>
            <div className="bg-background border border-border rounded p-2 text-center">
              <span className="text-[10px] text-muted-foreground block uppercase">
                Temp
              </span>
              <span className="font-bold text-lg">
                {latestReading?.temperature
                  ? latestReading.temperature + "°C"
                  : "-"}
              </span>
            </div>
            <div className="bg-background border border-border rounded p-2 text-center">
              <span className="text-[10px] text-muted-foreground block uppercase">
                N
              </span>
              <span className="font-bold text-lg text-amber-600">
                {latestReading?.nitrogen || "-"}
              </span>
            </div>
            <div className="bg-background border border-border rounded p-2 text-center">
              <span className="text-[10px] text-muted-foreground block uppercase">
                P
              </span>
              <span className="font-bold text-lg text-orange-600">
                {latestReading?.phosphorus || "-"}
              </span>
            </div>
            <div className="bg-background border border-border rounded p-2 text-center">
              <span className="text-[10px] text-muted-foreground block uppercase">
                K
              </span>
              <span className="font-bold text-lg text-purple-600">
                {latestReading?.potassium || "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-muted/40 border-t border-border px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-muted/60 transition-colors">
          <span className="text-xs font-medium flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" /> View All {totalReadings}{" "}
            Records (Ready to Export)
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
