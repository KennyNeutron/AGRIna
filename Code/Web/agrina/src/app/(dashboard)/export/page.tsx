"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import {
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Calendar,
  Layers,
  CheckCircle2,
  Mail,
  Share2,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Activity,
  Droplets,
  Leaf,
  Thermometer,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Mock Data
const recentExports = [
  {
    name: "Comprehensive Report",
    period: "Last 30 Days",
    records: "4,800 records",
    size: "12.4 MB",
    date: "2025-01-27 14:30",
    type: "pdf",
  },
  {
    name: "PDF Report",
    period: "Last 7 Days",
    records: "1,200 records",
    size: "8.7 MB",
    date: "2025-01-25 09:15",
    type: "pdf",
  },
  {
    name: "Excel Report",
    period: "Last 3 Months",
    records: "14,400 records",
    size: "5.1 MB",
    date: "2025-01-22 16:45",
    type: "xlsx",
  },
];

const phData = [
  { name: "Nov 16", value: 6.5 },
  { name: "Nov 19", value: 6.8 },
  { name: "Nov 22", value: 6.4 },
  { name: "Nov 25", value: 6.6 },
  { name: "Nov 28", value: 6.5 },
  { name: "Dec 01", value: 6.7 },
  { name: "Dec 04", value: 6.5 },
  { name: "Dec 07", value: 6.8 },
  { name: "Dec 10", value: 6.9 },
  { name: "Dec 14", value: 6.6 },
];

const nutrientData = [
  { name: "Nitrogen (N)", value: 45, color: "#22c55e" },
  { name: "Phosphorus (P)", value: 26, color: "#eab308" },
  { name: "Potassium (K)", value: 186, color: "#166534" },
];

const tempData = [
  { name: "Nov 16", value: 27 },
  { name: "Nov 19", value: 31 },
  { name: "Nov 22", value: 28 },
  { name: "Nov 25", value: 32 },
  { name: "Nov 28", value: 29 },
  { name: "Dec 01", value: 31 },
  { name: "Dec 04", value: 27 },
  { name: "Dec 07", value: 29 },
  { name: "Dec 10", value: 33 },
  { name: "Dec 14", value: 30 },
];

const devicePerformanceData = [
  { name: "Uptime", value: 98 },
  { name: "Connectivity", value: 95 },
  { name: "Battery", value: 0 },
];

export default function ExportPage() {
  const [selectedFormat, setSelectedFormat] = useState("json");

  return (
    <div className="space-y-6 fade-in h-screen pb-20">
      <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
        <div className="p-3 bg-card rounded-full shadow-sm border border-border">
          <Download className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Data Export & Reports
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Generate comprehensive reports and export your agricultural sensor
          data with advanced analytics and insights.
        </p>
        <Button
          variant="outline"
          className="mt-4 gap-2 text-white border-green-300 bg-green-100/50 hover:bg-green-100 dark:text-green-300 dark:border-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50"
        >
          <BarChartIcon className="h-4 w-4" />
          Advanced Reporting Ready
        </Button>
      </div>

      <Tabs defaultValue="export" className="space-y-6">
        <TabsList className="bg-card w-full justify-center border border-border h-12 p-1 max-w-3xl mx-auto rounded-full">
          <TabsTrigger
            value="export"
            className="flex-1 rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Data Export
          </TabsTrigger>
          <TabsTrigger
            value="report"
            className="flex-1 rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Report Generator
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="flex-1 rounded-full data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Analytics Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Export Format */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Export Format
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: "csv",
                      label: "CSV Data",
                      desc: "Raw data in comma-separated format",
                      icon: FileText,
                    },
                    {
                      id: "json",
                      label: "JSON Data",
                      desc: "Structured data for API integration",
                      icon: FileJson,
                    },
                    {
                      id: "excel",
                      label: "Excel Report",
                      desc: "Formatted spreadsheet with analysis",
                      icon: FileSpreadsheet,
                    },
                    {
                      id: "pdf",
                      label: "PDF Report",
                      desc: "Professional report with charts and insights",
                      icon: FileText,
                    },
                    {
                      id: "comprehensive",
                      label: "Comprehensive Report",
                      desc: "Full analysis with trends and recommendations",
                      icon: BarChartIcon,
                      colSpan: "sm:col-span-2",
                    },
                  ].map((format) => (
                    <div
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={`
                        relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50
                        ${
                          selectedFormat === format.id
                            ? "border-green-500 bg-green-50/10 ring-1 ring-green-500"
                            : "border-border"
                        }
                        ${format.colSpan || ""}
                      `}
                    >
                      <div
                        className={`p-2 rounded-md ${
                          selectedFormat === format.id
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <format.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">
                          {format.label}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format.desc}
                        </p>
                      </div>
                      {selectedFormat === format.id && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Time Range */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Time Range Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    "Last 7 Days",
                    "Last 30 Days",
                    "Last 3 Months",
                    "Last 6 Months",
                    "Last Year",
                    "All Data",
                  ].map((range) => (
                    <Button
                      key={range}
                      variant="outline"
                      className={`justify-center h-auto py-4 flex-col gap-1 ${
                        range === "Last 30 Days"
                          ? "border-green-500 bg-green-50/10 text-green-600"
                          : ""
                      }`}
                    >
                      <span className="font-semibold">{range}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        ~4,800 records
                      </span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Data Type Selection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    Data Type Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "pH Levels", tag: "Essential" },
                    { label: "Temperature", tag: "Essential" },
                    { label: "Nitrogen (N)", tag: "Essential" },
                    { label: "Phosphorus (P)", tag: "Essential" },
                    { label: "Potassium (K)", tag: "Essential" },
                    { label: "Device Information", tag: null },
                  ].map((type) => (
                    <div
                      key={type.label}
                      className="flex items-center space-x-2 p-3 border border-border rounded-md bg-muted/20"
                    >
                      <Checkbox
                        id={type.label}
                        defaultChecked={type.tag === "Essential"}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={type.label}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type.label}
                        </label>
                        {type.tag && (
                          <span className="text-[10px] font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded w-fit">
                            {type.tag}
                          </span>
                        )}
                        {!type.tag && (
                          <span className="text-[10px] text-muted-foreground">
                            Standard metadata
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="sm:col-span-2 flex items-center space-x-2 p-3 border border-border rounded-md bg-muted/20">
                    <Checkbox id="alerts" />
                    <label
                      htmlFor="alerts"
                      className="text-sm font-medium leading-none"
                    >
                      Alert History
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-base">Export Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded text-xs">
                        {selectedFormat.toUpperCase()} Data
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Range:</span>
                      <span className="font-medium">Last 30 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Types:</span>
                      <span className="font-medium">5 selected</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-dashed">
                      <span className="text-muted-foreground">
                        Est. Records:
                      </span>
                      <span className="font-medium">~4,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Size:</span>
                      <span className="font-medium">~4.8 MB</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Button variant="outline" className="w-full gap-2">
                      <FileText className="h-4 w-4" />
                      Preview Report
                    </Button>
                    <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                      <Download className="h-4 w-4" />
                      Generate Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Report Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Title</label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="AGRina Soil Analysis Report - December 2025"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Report Notes (Optional)
                    </label>
                    <Textarea placeholder="Add any notes or context for this report..." />
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Report Components</h4>
                    <div className="space-y-2">
                      {[
                        "Executive Summary & Key Insights",
                        "Charts & Visualizations",
                        "Device Performance & Status",
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox id={item} defaultChecked />
                          <label
                            htmlFor={item}
                            className="text-sm font-medium leading-none"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-muted-foreground">
                    Report Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                    <FileText className="h-4 w-4" /> Generate PDF Report
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <PieChartIcon className="h-4 w-4" /> Create Infographic
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" /> Email Report
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Share2 className="h-4 w-4" /> Share Link
                  </Button>
                </CardContent>
                <div className="px-6 pb-6">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                      Quick Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-background p-2 rounded border border-border">
                        <div className="text-lg font-bold">1</div>
                        <div className="text-[10px] text-muted-foreground">
                          Devices
                        </div>
                      </div>
                      <div className="bg-background p-2 rounded border border-border">
                        <div className="text-lg font-bold">30</div>
                        <div className="text-[10px] text-muted-foreground">
                          Readings
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-card">
              <CardContent className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground text-sm font-medium">
                  <Droplets className="h-4 w-4" /> Average pH
                </div>
                <div className="text-2xl font-bold">6.54</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground text-sm font-medium">
                  <Thermometer className="h-4 w-4" /> Average Temp
                </div>
                <div className="text-2xl font-bold">23.9°C</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground text-sm font-medium">
                  <Leaf className="h-4 w-4" /> Avg N (ppm)
                </div>
                <div className="text-2xl font-bold">45</div>
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground text-sm font-medium">
                  <Activity className="h-4 w-4" /> Total Readings
                </div>
                <div className="text-2xl font-bold">30</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* pH Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-600">
                  <Activity className="h-4 w-4" /> pH Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={phData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis
                        dataKey="name"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        domain={[0, 8]}
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "none" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#16a34a"
                        strokeWidth={2}
                        dot={{ fill: "#16a34a" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Nutrient Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-yellow-600">
                  <PieChartIcon className="h-4 w-4" /> Nutrient Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={nutrientData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {nutrientData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Device Performance (Bar) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-600">
                  <BarChartIcon className="h-4 w-4" /> Device Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={devicePerformanceData} layout="vertical">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        opacity={0.1}
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis
                        type="number"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        width={100}
                      />
                      <Tooltip cursor={{ fill: "transparent" }} />
                      <Bar
                        dataKey="value"
                        fill="#86efac"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Temp Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                  <Thermometer className="h-4 w-4" /> Temperature Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tempData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis
                        dataKey="name"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        domain={[0, 40]}
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: "8px", border: "none" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#64748b"
                        strokeWidth={2}
                        dot={{ fill: "#64748b" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Exports Section - Shared */}
      <Card>
        <CardHeader className="py-4 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Recent Exports & Reports</h3>
          </div>
        </CardHeader>
        <div className="divide-y divide-border">
          {recentExports.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                             h-10 w-10 rounded-lg flex items-center justify-center 
                             ${
                               item.type === "pdf"
                                 ? "bg-red-500/10 text-red-500"
                                 : "bg-green-500/10 text-green-500"
                             }
                          `}
                >
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 rounded">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.records} • {item.size} • {item.date}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <CheckCircle2 className="h-4 w-4" /> Download Again
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
