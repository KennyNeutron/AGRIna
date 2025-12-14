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
} from "lucide-react";

export default function SettingsPage() {
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
              <Input defaultValue="System Administrator" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input defaultValue="admin@agrina.system" />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input defaultValue="AGRina System" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-md text-sm">
                <span className="font-medium">System Administrator</span>
                <span className="text-xs text-muted-foreground">
                  • All Devices • All Data
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                  Device Management
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                  View All Data
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                  Export Data
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>{" "}
                  User Management
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-background">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Device Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-500">
              <Smartphone className="h-5 w-5" /> Device Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Device Name</Label>
              <Input defaultValue="AGRina-001" />
            </div>
            <div className="space-y-2">
              <Label>Update Interval (seconds)</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Temperature Unit</Label>
              <Select defaultValue="celsius">
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label className="text-base">Auto Sync</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically sync data to cloud
                </p>
              </div>
              <Switch defaultChecked />
            </div>
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
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Send alerts via email
                </p>
              </div>
              <Switch defaultChecked />
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
              <Select defaultValue="365">
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
              <Select defaultValue="asia_manila">
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

        {/* System Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-700 dark:text-slate-400">
              <Shield className="h-5 w-5" /> System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm py-1 border-b border-border">
              <span className="text-muted-foreground">Application Version</span>
              <span className="font-medium">v2.1.3</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-border">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-medium">admin-001</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-border">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-medium">1/1/2025</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-border">
              <span className="text-muted-foreground">Access Level</span>
              <span className="font-medium">Full Access</span>
            </div>

            <div className="space-y-2 pt-2">
              <Button
                variant="outline"
                className="w-full gap-2 bg-background h-9 text-xs"
              >
                <Wifi className="h-3 w-3" /> Test Connection
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 bg-background h-9 text-xs"
              >
                <Activity className="h-3 w-3" /> Calibrate Sensors
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 bg-background h-9 text-xs"
              >
                <Users className="h-3 w-3" /> User Management
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-500">
            <Users className="h-5 w-5" /> User Management
          </CardTitle>
          <CardDescription>
            Manage system users, roles, and permissions. Total users: 1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4 flex items-center justify-between bg-card hover:bg-muted/30 transition-colors">
            <div>
              <div className="font-medium text-green-800 dark:text-green-500">
                System Administrator
              </div>
              <div className="text-xs text-muted-foreground">
                admin@agrina.system
              </div>
              <div className="text-[10px] font-bold text-foreground mt-1">
                System Administrator
              </div>
            </div>
          </div>

          <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4" /> Add New User
          </Button>
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 mt-8 pb-8">
        <Button variant="ghost" className="gap-2">
          <RotateCcw className="h-4 w-4" /> Reset to Defaults
        </Button>
        <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20">
          <Save className="h-4 w-4" /> Save Settings
        </Button>
      </div>
    </div>
  );
}
