"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Wifi,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  RefreshCw,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Cpu,
} from "lucide-react";

export default function LiveReadingsPage() {
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
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
            <Wifi className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              AGRina Demo Device
            </span>
            <Separator orientation="vertical" className="h-4" />
            <Select defaultValue="demo001">
              <SelectTrigger className="w-[110px] h-7 border-none bg-transparent shadow-none p-0 focus:ring-0 text-xs font-medium">
                <SelectValue placeholder="Device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo001">AGR-DEMO001</SelectItem>
                <SelectItem value="demo002">AGR-DEMO002</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="sm" className="gap-2 bg-card">
            <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
            Refresh
          </Button>
          <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-500">1 Online</span>
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
                AGRina Demo Device
              </h2>
              <p className="text-sm text-muted-foreground mt-1 ml-7">
                Demo Field - System Testing
              </p>
              <div className="flex flex-col gap-1 mt-3 ml-7 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-1.5 py-0.5 rounded">
                    ID: AGR-DEM001
                  </span>
                  <span>Firmware: v2.1.3</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-primary/20 text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  <Wifi className="h-3 w-3" />
                  ONLINE
                </div>
                {/* Battery Removed as requested */}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Last updated:{" "}
                  <span className="text-foreground font-medium">
                    12/14/2025, 1:11:36 AM
                  </span>
                </span>
                <span>
                  Last seen:{" "}
                  <span className="font-medium text-foreground">1h ago</span>
                </span>
                <span className="flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded-full">
                  <Activity className="h-3 w-3" /> Reading from: 1:11:36 AM
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
              <span className="text-3xl font-bold text-foreground">6.68</span>
              <span className="text-sm font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                Optimal
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Current pH</span>
                <span>0 - 14</span>
              </div>
              {/* Scale representation */}
              <div className="h-3 w-full bg-muted rounded-full relative overflow-hidden">
                {/* Optimal Zone Marker (approx 6-7) */}
                <div className="absolute left-[42%] w-[15%] h-full bg-green-500/20" />
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: "47.7%" }}
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
              <span className="text-3xl font-bold text-foreground">23.6°C</span>
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
                {/* Optimal Zone Marker (approx 25-30) */}
                <div className="absolute left-[50%] w-[10%] h-full bg-green-500/20" />
                <div
                  className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full transition-all duration-1000"
                  style={{ width: "47.2%" }}
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
                <span className="text-lg font-bold text-foreground">49</span>
                <span className="text-[10px] text-muted-foreground">ppm</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" /> Phosphorus (P)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">30</span>
                <span className="text-[10px] text-muted-foreground">ppm</span>
                <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" /> Potassium (K)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">189</span>
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
            Smart Recommendations for AGRina Demo Device
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
                Current pH level of 6.68 is optimal for rice cultivation.
                Continue current soil management practices.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardContent className="p-4 flex gap-4">
            <div className="mt-1">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">
                Temperature Status: Acceptable
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Current temperature of 23.6°C is acceptable. Monitor closely for
                optimal growth conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
