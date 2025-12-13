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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wifi,
  Users,
  Activity,
  CheckCircle,
  Battery,
  Thermometer,
  Droplets,
  Wind,
  RefreshCw,
  Zap,
  BarChart,
  Download,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-8 fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, System Administrator!
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoring <span className="font-semibold text-primary">1</span>{" "}
            total system devices
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span className="font-medium text-primary">
              System Administrator
            </span>
            <span>•</span>
            <span>AGRina System</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Full System Access
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[120px] bg-card">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-card">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Wifi className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Online Devices
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Active Deployments
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Recent Readings
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                System Health
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Your Devices
          </h2>
          <TabsList className="bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Device Overview</TabsTrigger>
            <TabsTrigger value="management">Device Management</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Device Card */}
            <Card className="overflow-hidden border-border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 p-4">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_theme(colors.green.500)]" />
              </div>
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Wifi className="h-4 w-4 text-primary" />
                      AGRina Demo Device
                    </CardTitle>
                    <CardDescription className="text-xs font-mono mt-1 text-primary/80">
                      AGR-DEMO001
                    </CardDescription>
                  </div>
                  <div className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Connected
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Device Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
                    </div>
                    <span>Demo Field - System Testing</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Activity className="h-3.5 w-3.5" />
                    <span>AGRina System Testing</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Last seen: 1h ago</span>
                  </div>
                </div>

                {/* Health Only */}
                <div className="space-y-4 pt-4 border-t border-border/50">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Device Health</span>
                      <span className="text-primary">100%</span>
                    </div>
                    <Progress
                      value={100}
                      className="h-1.5 bg-muted"
                      indicatorClassName="bg-primary"
                    />
                  </div>
                </div>

                {/* Sensor Readings */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Droplets className="h-3 w-3" /> pH Level
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      6.56
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Thermometer className="h-3 w-3" /> Temperature
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      24.8°C
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Wind className="h-3 w-3" /> Nitrogen (N)
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      44 ppm
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Phosphorus (P)
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      29 ppm
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Activity className="h-3 w-3" /> Potassium (K)
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      35 ppm
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground text-center pt-2">
                  Updated: 12:58:33 AM
                </div>
              </CardContent>
            </Card>

            {/* Empty State / Placeholder for right column */}
            <div className="grid grid-rows-2 gap-6">
              {/* Placeholder for Map or Other content */}
              {/* <div className="rounded-xl border border-border border-dashed bg-muted/20 flex items-center justify-center text-muted-foreground">
                        Map View Placeholder
                    </div> */}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card/50 hover:bg-card hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    View Live Data
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monitor real-time readings from all your devices
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 hover:bg-card hover:border-orange-500/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-orange-500 transition-colors">
                    Historical Data
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Analyze trends and view deployment history
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 hover:bg-card hover:border-blue-500/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-blue-500 transition-colors">
                    Export Data
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Download your data in CSV or PDF format
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management">
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
            Device Management Interface Wrapper
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
