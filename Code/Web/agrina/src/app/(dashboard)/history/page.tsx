"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { NewDeploymentDialog } from "./new-deployment-dialog";
import { DeploymentCard } from "./deployment-card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Search,
  Plus,
  History,
  TrendingUp,
  FileText,
  MapPin,
  Clock,
  ArrowDownRight,
  Activity,
  Thermometer,
  Leaf,
  Droplets,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Parameter Configuration
const parameterConfig: Record<
  string,
  {
    label: string;
    key: string;
    domain: [number, number];
    unit: string;
    color: string;
    icon: any;
  }
> = {
  ph: {
    label: "pH Level",
    key: "ph",
    domain: [5.5, 7.5],
    unit: "",
    color: "var(--primary)",
    icon: Activity,
  },
  temp: {
    label: "Temperature",
    key: "temp",
    domain: [20, 30],
    unit: "°C",
    color: "#3b82f6",
    icon: Thermometer,
  },
  n: {
    label: "Nitrogen",
    key: "n",
    domain: [30, 60],
    unit: " mg/kg",
    color: "#eab308",
    icon: Leaf,
  },
  p: {
    label: "Phosphorus",
    key: "p",
    domain: [20, 40],
    unit: " mg/kg",
    color: "#f97316",
    icon: Droplets,
  },
  k: {
    label: "Potassium",
    key: "k",
    domain: [150, 200],
    unit: " mg/kg",
    color: "#8b5cf6",
    icon: Leaf,
  },
};

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("trends");
  const [selectedParameter, setSelectedParameter] = useState("ph");
  const [timeRange, setTimeRange] = useState("24h");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [devices, setDevices] = useState<any[]>([]);
  const [readings, setReadings] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [now, setNow] = useState(new Date());
  const supabase = createClient();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const fetchDevices = async () => {
    const { data } = await supabase
      .from("devices")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setDevices(data);
  };

  const fetchReadings = async () => {
    let query = supabase
      .from("sensor_readings")
      .select("*, devices(name, serial_number, lot_owner, crop_type)")
      .order("recorded_at", { ascending: true }); // Ascending for chart

    if (selectedDevice !== "all") {
      query = query.eq("device_id", selectedDevice);
    }

    // Apply time filter
    if (timeRange !== "all") {
      const now = new Date();
      let startTime = new Date();
      switch (timeRange) {
        case "1h":
          startTime.setHours(now.getHours() - 1);
          break;
        case "24h":
          startTime.setHours(now.getHours() - 24);
          break;
        case "7d":
          startTime.setDate(now.getDate() - 7);
          break;
        case "30d":
          startTime.setDate(now.getDate() - 30);
          break;
      }
      query = query.gte("recorded_at", startTime.toISOString());
    } else {
      query = query.limit(500); // Safety limit for 'all'
    }

    const { data } = await query;

    if (data) {
      setReadings([...data].reverse()); // Store reverse for table (newest first)

      // Transform for chart (need ascending)
      const transformed = data.map((r) => ({
        name: new Date(r.recorded_at).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        ph: r.ph,
        temp: r.temperature,
        n: r.nitrogen,
        p: r.phosphorus,
        k: r.potassium,
        device_name: r.devices?.name,
      }));
      setChartData(transformed);
    }
  };

  useEffect(() => {
    fetchDevices();
    fetchReadings();

    const channelDevices = supabase
      .channel("devices_history")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "devices" },
        () => fetchDevices(),
      )
      .subscribe();

    const channelReadings = supabase
      .channel("readings_history")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sensor_readings" },
        () => fetchReadings(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelDevices);
      supabase.removeChannel(channelReadings);
    };
  }, [timeRange, selectedDevice]); // Refetch when timeRange or selectedDevice changes

  const activeConfig = parameterConfig[selectedParameter];
  const ActiveIcon = activeConfig.icon;

  return (
    <div className="space-y-6 fade-in h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-6 w-6 text-foreground" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Historical Data & Logs
            </h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Analyze trends and manage deployment records for your devices
          </p>
        </div>
        <NewDeploymentDialog />
      </div>

      {/* Filters */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end">
          <div className="space-y-2 col-span-1 lg:col-span-1">
            <label className="text-xs font-medium text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search deployments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Device
            </label>
            <Select value={selectedDevice} onValueChange={setSelectedDevice}>
              <SelectTrigger>
                <SelectValue placeholder="All Devices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                {devices.map((d: any) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Parameter
            </label>
            <Select
              value={selectedParameter}
              onValueChange={setSelectedParameter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ph">pH Level</SelectItem>
                <SelectItem value="temp">Temperature</SelectItem>
                <SelectItem value="n">Nitrogen</SelectItem>
                <SelectItem value="p">Phosphorus</SelectItem>
                <SelectItem value="k">Potassium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Time Range
            </label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        defaultValue="trends"
        className="space-y-6"
        onValueChange={(val) => {
          setActiveTab(val);
          // Auto-switch to "all" time range when viewing deployment records to ensure stats are accurate
          if (val === "deployments" && timeRange !== "all") {
            setTimeRange("all");
          }
        }}
      >
        <TabsList className="bg-card w-full justify-start border border-border h-12 p-1">
          <TabsTrigger
            value="trends"
            className="flex-1 max-w-[200px] gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Trends & Analytics
          </TabsTrigger>
          <TabsTrigger
            value="deployments"
            className="flex-1 max-w-[200px] gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Deployment Records
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="flex-1 max-w-[200px] gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Raw Data Logs
          </TabsTrigger>
        </TabsList>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div>
                  <div className="text-2xl font-bold">{readings.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total Readings
                  </p>
                </div>
                <div className="ml-auto p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-muted-foreground">Days of Data</p>
                </div>
                <div className="ml-auto p-2 bg-yellow-500/10 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div>
                  <div className="text-2xl font-bold">Stable</div>
                  <p className="text-xs text-muted-foreground">
                    {activeConfig.label} Trend
                  </p>
                </div>
                <div className="ml-auto p-2 bg-green-500/10 rounded-full">
                  <ActiveIcon className="h-4 w-4 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div>
                  <div className="text-2xl font-bold">{devices.length}</div>
                  <p className="text-xs text-muted-foreground">Deployments</p>
                </div>
                <div className="ml-auto p-2 bg-blue-500/10 rounded-full">
                  <MapPin className="h-4 w-4 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4" /> {activeConfig.label} Trends
                Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: -20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={true}
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      interval={Math.ceil(chartData.length / 5)}
                      angle={0}
                      dy={10}
                    />
                    <YAxis
                      domain={activeConfig.domain}
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tickCount={5}
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend
                      iconType="plainline"
                      wrapperStyle={{ paddingTop: "20px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey={activeConfig.key as string}
                      stroke={activeConfig.color}
                      strokeWidth={2}
                      dot={{
                        r: 4,
                        fill: activeConfig.color,
                        strokeWidth: 0,
                      }}
                      activeDot={{ r: 6 }}
                      name={activeConfig.label}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deployments Tab */}
        <TabsContent value="deployments">
          <div className="space-y-4">
            {devices.length === 0 ? (
              <div className="p-8 text-center border-dashed border rounded-lg text-muted-foreground">
                No deployments found. Add a new device to get started.
              </div>
            ) : (
              devices
                .filter((device) => {
                  if (!searchQuery) return true;
                  const s = searchQuery.toLowerCase();
                  return (
                    device.name?.toLowerCase().includes(s) ||
                    device.serial_number?.toLowerCase().includes(s) ||
                    device.lot_owner?.toLowerCase().includes(s) ||
                    device.crop_type?.toLowerCase().includes(s)
                  );
                })
                .map((device: any) => {
                  // Filter readings for this device
                  const deviceReadings = readings.filter(
                    (r) => r.device_id === device.id,
                  );

                  return (
                    <DeploymentCard
                      key={device.id}
                      device={device}
                      readings={deviceReadings}
                      now={now}
                    />
                  );
                })
            )}
          </div>
        </TabsContent>

        {/* Raw Data Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Search Raw Data Logs</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Search readings, devices, deployments, or values
            </p>
            <div className="flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by device name, owner, pH, temperature, nitrogen, timestamp..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                />
              </div>
            </div>
          </div>

          <Card className="border-border">
            <CardHeader className="py-4 border-b border-border flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Raw Sensor Data Logs</h3>
                <span className="bg-muted px-2 py-0.5 rounded text-[10px] text-muted-foreground">
                  {readings.length} readings
                </span>
              </div>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Timestamp <ArrowDownRight className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Lot Owner</TableHead>
                  <TableHead>pH Level</TableHead>
                  <TableHead>Temp (°C)</TableHead>
                  <TableHead>N (mg/kg)</TableHead>
                  <TableHead>P (mg/kg)</TableHead>
                  <TableHead>K (mg/kg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {readings.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center h-24 text-muted-foreground"
                    >
                      No readings found.
                    </TableCell>
                  </TableRow>
                ) : (
                  readings
                    .filter((log) => {
                      if (!searchQuery) return true;
                      const s = searchQuery.toLowerCase();
                      return (
                        log.devices?.name?.toLowerCase().includes(s) ||
                        log.devices?.serial_number?.toLowerCase().includes(s) ||
                        log.devices?.lot_owner?.toLowerCase().includes(s) ||
                        log.ph.toString().includes(s) ||
                        new Date(log.recorded_at)
                          .toLocaleString()
                          .toLowerCase()
                          .includes(s)
                      );
                    })
                    .map((log: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {new Date(log.recorded_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">
                              {log.devices?.name || "Unknown"}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {log.devices?.serial_number || "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium">
                              {log.devices?.lot_owner || "N/A"}
                            </span>
                            <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-[200px]">
                              {log.devices?.crop_type || "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-sm border border-border px-1.5 py-0.5 text-xs font-medium tabular-nums bg-green-500/10 text-green-600 dark:text-green-400">
                            {log.ph.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-sm border border-border px-1.5 py-0.5 text-xs font-medium tabular-nums text-blue-500 bg-blue-500/10">
                            {log.temperature.toFixed(1)}°C
                          </span>
                        </TableCell>
                        <TableCell className="text-xs tabular-nums">
                          {log.nitrogen.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-xs tabular-nums">
                          {log.phosphorus.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-xs tabular-nums">
                          {log.potassium.toFixed(1)}
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
