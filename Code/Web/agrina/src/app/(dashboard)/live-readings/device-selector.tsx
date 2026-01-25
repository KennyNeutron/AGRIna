"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wifi } from "lucide-react";

interface Device {
  id: string;
  name: string;
  serial_number: string;
  status: string;
}

export function DeviceSelector({
  devices,
  selectedDeviceId,
  baseUrl = "/live-readings",
}: {
  devices: Device[];
  selectedDeviceId: string;
  baseUrl?: string;
}) {
  const router = useRouter();
  const selectedDevice =
    devices.find((d) => d.id === selectedDeviceId) || devices[0];

  const handleValueChange = (value: string) => {
    router.push(`${baseUrl}?device=${value}`);
  };

  if (!devices || devices.length === 0) {
    return (
      <div className="text-xs text-muted-foreground">No devices found</div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
      <Wifi className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground hidden sm:inline-block">
        {selectedDevice?.name || "Select Device"}
      </span>
      <Separator orientation="vertical" className="h-4 hidden sm:block" />
      <Select value={selectedDeviceId} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[140px] h-7 border-none bg-transparent shadow-none p-0 focus:ring-0 text-xs font-medium">
          <SelectValue placeholder="Select Device">
            {selectedDevice?.serial_number}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {devices.map((device) => (
            <SelectItem key={device.id} value={device.id}>
              {device.serial_number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
