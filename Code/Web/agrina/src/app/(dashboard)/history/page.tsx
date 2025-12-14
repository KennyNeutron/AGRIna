"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Mock Data for Chart with multiple parameters
const data = [
  { name: "Nov 15 09:32", pH: 6.4, temp: 24.5, n: 45, p: 28, k: 180 },
  { name: "Nov 18 02:40", pH: 6.5, temp: 24.8, n: 48, p: 30, k: 185 },
  { name: "Nov 21 21:36", pH: 6.6, temp: 25.1, n: 42, p: 29, k: 175 },
  { name: "Nov 24 08:24", pH: 6.7, temp: 25.4, n: 46, p: 31, k: 190 },
  { name: "Nov 27 04:30", pH: 6.5, temp: 24.9, n: 44, p: 28, k: 182 },
  { name: "Nov 30 06:24", pH: 6.5, temp: 24.2, n: 47, p: 30, k: 188 },
  { name: "Dec 03 09:59", pH: 6.8, temp: 23.8, n: 45, p: 29, k: 184 },
  { name: "Dec 06 04:30", pH: 6.8, temp: 24.1, n: 49, p: 32, k: 192 },
  { name: "Dec 09 22:54", pH: 6.5, temp: 23.9, n: 46, p: 28, k: 180 },
  { name: "Dec 12 11:04", pH: 6.7, temp: 24.6, n: 43, p: 30, k: 186 },
  { name: "Dec 14 21:42", pH: 6.6, temp: 25.2, n: 45, p: 31, k: 189 },
];

const logs = [
  {
    timestamp: "2025-12-14 21:42:51",
    device: "AGRina Demo Device",
    deviceId: "AGR-DEMO001",
    owner: "AGRina System Testing",
    ownerDesc: "System demonstration field for testing device functionality",
    ph: 6.47,
    temp: 23.8,
    n: 45.0,
    p: 30.0,
    k: 175.0,
  },
  {
    timestamp: "2025-12-14 15:49:50",
    device: "AGRina Demo Device",
    deviceId: "AGR-DEMO001",
    owner: "Unassigned",
    ownerDesc: "",
    ph: 6.67,
    temp: 24.8,
    n: 48.0,
    p: 26.0,
    k: 185.0,
  },
  {
    timestamp: "2025-12-14 15:49:48",
    device: "AGRina Demo Device",
    deviceId: "AGR-DEMO001",
    owner: "AGRina System Testing",
    ownerDesc: "System demonstration field for testing device functionality",
    ph: 6.31,
    temp: 23.4,
    n: 47.0,
    p: 26.0,
    k: 178.0,
  },
  {
    timestamp: "2025-12-13 08:45:51",
    device: "AGRina Demo Device",
    deviceId: "AGR-DEMO001",
    owner: "AGRina System Testing",
    ownerDesc: "System demonstration field for testing device functionality",
    ph: 6.69,
    temp: 23.1,
    n: 41.0,
    p: 30.0,
    k: 186.0,
  },
  {
    timestamp: "2025-12-12 11:04:51",
    device: "AGRina Demo Device",
    deviceId: "AGR-DEMO001",
    owner: "AGRina System Testing",
    ownerDesc: "System demonstration field for testing device functionality",
    ph: 6.58,
    temp: 24.8,
    n: 40.0,
    p: 30.0,
    k: 175.0,
  },
];

// Parameter Configuration
const parameterConfig: Record<
  string,
  {
    label: string;
    key: keyof (typeof data)[0];
    domain: [number, number];
    unit: string;
    color: string;
    icon: any;
  }
> = {
  ph: {
    label: "pH Level",
    key: "pH",
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
        <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4" />
          New Deployment
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-end">
          <div className="space-y-2 col-span-1 lg:col-span-1">
            <label className="text-xs font-medium text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search deployments..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Device
            </label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Devices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="demo001">AGRina Demo Device</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Deployment
            </label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Deployments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deployments</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
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
              Date Range
            </label>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal text-muted-foreground bg-transparent"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Pick a date range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        defaultValue="trends"
        className="space-y-6"
        onValueChange={setActiveTab}
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
                  <div className="text-2xl font-bold">32</div>
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
                  <div className="text-2xl font-bold">29</div>
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
                  <div className="text-2xl font-bold">1</div>
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
                    data={data}
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
                      interval={1}
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
          {/* ... Deployment content - keeping same */}
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      AGRina System Testing
                    </h3>
                    <p className="text-xs text-primary font-mono mt-1">
                      DEP-DEMO001
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-4">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <span>
                        Device:{" "}
                        <span className="text-foreground font-medium">
                          AGRina Demo Device
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4"></div>
                      <span>
                        Crop:{" "}
                        <span className="text-foreground font-medium">
                          Test Rice Variety
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4">
                        <MapPin className="h-3.5 w-3.5" />
                      </div>
                      <span>Location: 14.5995, 120.9842</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:text-right">
                  <div>
                    <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      Active
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 md:justify-end">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>Started: Dec 07, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 md:justify-end">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>Readings: 31</span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Description:
                  </h4>
                  <p className="text-sm text-foreground">
                    System demonstration field for testing device functionality
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Notes:
                  </h4>
                  <p className="text-sm text-foreground">
                    Demo deployment for system testing and calibration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  32 readings
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
                {logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">
                          {log.device}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {log.deviceId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{log.owner}</span>
                        <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-[200px]">
                          {log.ownerDesc}
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
                        {log.temp.toFixed(1)}°C
                      </span>
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">
                      {log.n.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">
                      {log.p.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-xs tabular-nums">
                      {log.k.toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
