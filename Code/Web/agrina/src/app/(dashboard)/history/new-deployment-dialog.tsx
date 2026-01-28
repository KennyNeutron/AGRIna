"use client";

import { useState } from "react";
import { Plus, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createDevice } from "@/app/actions/device";
import { cn } from "@/lib/utils";

export function NewDeploymentDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createDevice(formData);

    setLoading(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      setOpen(false);
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4" />
          New Deployment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Device Deployment</DialogTitle>
          <DialogDescription>
            Register a new device to the AGRina system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            {/* Device Identification */}
            <div className="space-y-2">
              <Label htmlFor="serial_number">Serial Number</Label>
              <Input
                id="serial_number"
                name="serial_number"
                placeholder="AGR-XXXX"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Field 1 Sensor"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="Active">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firmware_version">Firmware Version</Label>
                <Input
                  id="firmware_version"
                  name="firmware_version"
                  defaultValue="1.0.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="update_interval">Update Interval (s)</Label>
                <Input
                  id="update_interval"
                  name="update_interval_seconds"
                  type="number"
                  defaultValue="300"
                />
              </div>

              <div className="flex flex-col space-y-3 pt-1">
                <Label htmlFor="auto_sync">Auto Sync</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="auto_sync" name="auto_sync" defaultChecked />
                  <span className="text-sm text-muted-foreground">
                    Enable data sync
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t my-2"></div>

            {/* Deployment Details */}
            <div className="space-y-2">
              <Label htmlFor="lot_owner">Lot Owner</Label>
              <Input id="lot_owner" name="lot_owner" placeholder="Owner Name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <input
                  type="hidden"
                  name="start_date"
                  value={startDate ? startDate.toISOString() : ""}
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <input
                  type="hidden"
                  name="end_date"
                  value={endDate ? endDate.toISOString() : ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Coordinates</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="lat"
                  placeholder="Latitude"
                  type="number"
                  step="any"
                />
                <Input
                  name="lng"
                  placeholder="Longitude"
                  type="number"
                  step="any"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop_type">Crop Type</Label>
              <Input
                id="crop_type"
                name="crop_type"
                placeholder="e.g. Corn, Rice"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field_description">Field Description</Label>
              <Textarea
                id="field_description"
                name="field_description"
                placeholder="Description of the field..."
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional notes..."
                className="resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deploy Device
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
