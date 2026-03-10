"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  MapPin,
  Calendar,
  User,
  Activity,
  Thermometer,
  Leaf,
  Droplets,
  Clock,
  ArrowDown,
} from "lucide-react";
import { format } from "date-fns";

interface DeploymentDetailsProps {
  device: any;
  readings: any[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeploymentDetailsDialog({
  device,
  readings,
  open,
  onOpenChange,
}: DeploymentDetailsProps) {
  // Sort readings by date descending (newest first)
  const sortedReadings = [...readings].sort(
    (a, b) =>
      new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime(),
  );

  const exportData = () => {
    // Basic CSV export
    const headers = [
      "Timestamp",
      "Device Name",
      "Serial Number",
      "Lot Owner",
      "pH",
      "Temperature (C)",
      "Nitrogen (ppm)",
      "Phosphorus (ppm)",
      "Potassium (ppm)",
    ];

    const rows = sortedReadings.map((r) => [
      new Date(r.recorded_at).toISOString(),
      device.name,
      device.serial_number,
      device.lot_owner || "N/A",
      r.ph,
      r.temperature,
      r.nitrogen,
      r.phosphorus,
      r.potassium,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `deployment_data_${device.serial_number}_${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isActive = !device.end_date;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b bg-muted/40 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl flex items-center gap-2">
                {device.lot_owner || "Unknown Owner"}
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className="ml-2"
                >
                  {isActive ? "Active" : "Completed"}
                </Badge>
              </DialogTitle>
              <DialogDescription className="mt-1 flex items-center gap-4 text-xs font-mono">
                <span>SN: {device.serial_number}</span>
                <span>•</span>
                <span>{device.name}</span>
                <span>•</span>
                <span>{readings.length} Records</span>
              </DialogDescription>
            </div>
            <Button size="sm" variant="outline" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel: Details */}
          <div className="w-full md:w-1/3 bg-muted/10 border-r p-6 space-y-6 overflow-y-auto shrink-0">
            {/* Location */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Deployment Location
              </h4>
              <div className="p-3 bg-card border rounded-md text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lat:</span>
                  <span className="font-mono">
                    {typeof device.coordinates === "object"
                      ? device.coordinates?.lat
                      : typeof device.coordinates === "string"
                        ? device.coordinates.split(",")[0]
                        : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lng:</span>
                  <span className="font-mono">
                    {typeof device.coordinates === "object"
                      ? device.coordinates?.lng
                      : typeof device.coordinates === "string"
                        ? device.coordinates.split(",")[1]?.trim() || "N/A"
                        : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Period */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" /> Duration
              </h4>
              <div className="p-3 bg-card border rounded-md text-sm space-y-2">
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Start Date
                  </span>
                  <span className="font-medium">
                    {device.start_date
                      ? format(new Date(device.start_date), "PPP")
                      : "N/A"}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-xs text-muted-foreground block">
                    End Date
                  </span>
                  <span className="font-medium">
                    {device.end_date
                      ? format(new Date(device.end_date), "PPP")
                      : "Ongoing"}
                  </span>
                </div>
              </div>
            </div>

            {/* Crop Info */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-2">
                <Leaf className="h-3.5 w-3.5" /> Crop Information
              </h4>
              <div className="p-3 bg-card border rounded-md text-sm">
                <span className="text-xs text-muted-foreground block">
                  Target Crop
                </span>
                <span className="font-medium">
                  {device.crop_type || "Not Specified"}
                </span>
                {device.field_description && (
                  <div className="mt-2 pt-2 border-t">
                    <span className="text-xs text-muted-foreground block">
                      Description
                    </span>
                    <p className="text-muted-foreground leading-snug text-xs mt-1">
                      {device.field_description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Data Table */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-[300px]">
            <div className="px-4 py-2 border-b bg-muted/5 text-xs text-muted-foreground flex justify-between items-center">
              <span>Sensor Readings Log</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Newest first
              </span>
            </div>
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
                  <TableRow>
                    <TableHead className="w-[160px]">Timestamp</TableHead>
                    <TableHead className="text-right">pH</TableHead>
                    <TableHead className="text-right">Temp (°C)</TableHead>
                    <TableHead className="text-right">N</TableHead>
                    <TableHead className="text-right">P</TableHead>
                    <TableHead className="text-right">K</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedReadings.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center h-32 text-muted-foreground"
                      >
                        No readings recorded for this deployment.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedReadings.map((reading, i) => (
                      <TableRow key={i} className="hover:bg-muted/50">
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {format(
                            new Date(reading.recorded_at),
                            "MMM d, yyyy HH:mm",
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <span
                            className={
                              reading.ph < 6 || reading.ph > 7.5
                                ? "text-amber-600"
                                : "text-green-600"
                            }
                          >
                            {Number(reading.ph).toFixed(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {Number(reading.temperature).toFixed(1)}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {Number(reading.nitrogen).toFixed(0)}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {Number(reading.phosphorus).toFixed(0)}
                        </TableCell>
                        <TableCell className="text-right text-xs">
                          {Number(reading.potassium).toFixed(0)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
