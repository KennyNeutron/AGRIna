"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  User,
  Smartphone,
  Bell,
  Database,
  Shield,
  RotateCcw,
  Save,
  Wifi,
  Activity,
  Users,
  Plus,
  Loader2,
} from "lucide-react";
import { useState, useTransition } from "react";
import {
  updateProfile,
  updateDeviceSettings,
  updateUserPreferences,
} from "./actions";

interface SettingsViewProps {
  profile: any;
  device: any;
  preferences: any;
}

export function SettingsView({
  profile,
  device,
  preferences,
}: SettingsViewProps) {
  const [isPending, startTransition] = useTransition();

  // Profile State
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [company, setCompany] = useState(profile?.company || "");

  // Device State
  const [deviceName, setDeviceName] = useState(device?.name || "");
  const [updateInterval, setUpdateInterval] = useState(
    device?.update_interval_seconds?.toString() || "30"
  );
  const [tempUnit, setTempUnit] = useState(
    device?.temperature_unit || "celsius"
  );
  const [autoSync, setAutoSync] = useState(device?.auto_sync ?? true);

  // Preferences State
  const [alertsEnabled, setAlertsEnabled] = useState(
    preferences?.alerts_enabled ?? true
  );
  const [emailNotifications, setEmailNotifications] = useState(
    preferences?.email_notifications ?? true
  );
  const [dataRetention, setDataRetention] = useState(
    preferences?.data_retention_days?.toString() || "365"
  );
  const [timezone, setTimezone] = useState(
    preferences?.timezone || "asia_manila"
  );

  const handleSave = () => {
    startTransition(async () => {
      // 1. Update Profile
      const profileData = new FormData();
      profileData.append("fullName", fullName);
      profileData.append("company", company);
      await updateProfile(profileData);

      // 2. Update Device (if exists)
      if (device?.id) {
        const deviceData = new FormData();
        deviceData.append("deviceId", device.id);
        deviceData.append("deviceName", deviceName);
        deviceData.append("updateInterval", updateInterval);
        deviceData.append("temperatureUnit", tempUnit);
        if (autoSync) deviceData.append("autoSync", "on");
        await updateDeviceSettings(deviceData);
      }

      // 3. Update Preferences
      const prefData = new FormData();
      if (alertsEnabled) prefData.append("alertsEnabled", "on");
      if (emailNotifications) prefData.append("emailNotifications", "on");
      prefData.append("dataRetention", dataRetention);
      prefData.append("timezone", timezone);
      await updateUserPreferences(prefData);

      alert("Settings saved successfully!");
    });
  };

  return (
    <div className="space-y-8 fade-in h-screen pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
        <div className="p-3 bg-card rounded-full shadow-sm border border-border">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Settings & Preferences
          </h1>
          <p className="text-muted-foreground">
            Configure your AGRina devices, notifications, and account
            preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-green-700 dark:text-green-500">
              <User className="h-5 w-5" /> User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={profile?.email || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-md text-sm">
                <span className="font-medium">{profile?.role || "User"}</span>
                <span className="text-xs text-muted-foreground">
                  • All Devices • All Data
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-background">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-700 dark:text-emerald-500">
              <Bell className="h-5 w-5" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Alerts</Label>
                <p className="text-xs text-muted-foreground">
                  Receive alerts for critical conditions
                </p>
              </div>
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Send alerts via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-700 dark:text-emerald-500">
              <Database className="h-5 w-5" /> Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Data Retention (days)</Label>
              <Select
                value={dataRetention}
                onValueChange={(v) => setDataRetention(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select retention" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="365">1 Year</SelectItem>
                  <SelectItem value="730">2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <Select value={timezone} onValueChange={(v) => setTimezone(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                  <SelectItem value="asia_manila">
                    Asia/Manila (GMT+8)
                  </SelectItem>
                  <SelectItem value="america_new_york">
                    New York (GMT-5)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full gap-2 bg-background mt-2"
            >
              <Database className="h-4 w-4" /> Export All Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 mt-8 pb-8">
        <Button variant="ghost" className="gap-2">
          <RotateCcw className="h-4 w-4" /> Reset to Defaults
        </Button>
        <Button
          onClick={handleSave}
          disabled={isPending}
          className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
