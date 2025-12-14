"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Target,
  Users,
  Mail,
  Phone,
  MapPin,
  Globe,
  Cpu,
  Code2,
  Server,
  Database,
  Wifi,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-8 fade-in h-screen pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-4">
        <div className="p-3 bg-card rounded-full shadow-sm border border-border">
          <Info className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-amber-900 dark:text-amber-500">
            About AGRina
          </h1>
          <p className="text-muted-foreground text-lg">
            Advanced Soil Analytics Platform for Precision Rice Cultivation
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 px-4 py-1"
        >
          Version 2.1.3 - Professional Edition • Built in 2025
        </Badge>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-green-700 dark:text-green-500">
            <Info className="h-5 w-5" /> Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            AGRina represents a breakthrough in agricultural technology,
            delivering a sophisticated portable soil analysis system
            specifically engineered for rice crop optimization. Our platform
            integrates cutting-edge Arduino microcontrollers, LoRa wireless
            communication, and ESP32 modules to provide real-time soil analytics
            including NPK nutrient levels, pH balance, and temperature
            monitoring. The comprehensive web and mobile applications feature
            advanced data visualization, predictive analytics, and historical
            trend analysis, empowering the Department of Agriculture and farming
            communities with actionable insights that eliminate traditional
            testing delays and enhance crop yield optimization.
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-amber-600 dark:text-amber-500">
            <Target className="h-5 w-5" /> Mission & Vision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            Our mission is to revolutionize agricultural sustainability through
            precision soil intelligence. We envision a future where every farmer
            has access to professional-grade, real-time soil analytics that
            enable data-driven agricultural decisions. By democratizing advanced
            soil testing technology, we aim to significantly enhance rice
            production efficiency, minimize crop failure risks, reduce resource
            waste, and promote sustainable farming practices that benefit both
            agricultural communities and environmental conservation efforts.
          </p>
        </CardContent>
      </Card>

      {/* Development Team */}
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="px-0 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-slate-700 dark:text-slate-400">
            <Users className="h-5 w-5" /> Development Team
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 gap-6 grid md:grid-cols-3">
          {[
            {
              name: "Rica Mae C. Perfas",
              role: "Hardware & Electronics",
              badge: "Project Engineer",
              img: "/profile1.jpg",
              initials: "RMCP",
            },
            {
              name: "Alsheena A. Sali",
              role: "Software Development",
              badge: "Project Engineer",
              img: "/profile2.jpg",
              initials: "AAS",
            },
            {
              name: "A.G Ross A. Demetillo",
              role: "Systems Integration",
              badge: "Project Engineer",
              img: "/profile3.jpg",
              initials: "ARAD",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-24 w-24 mb-4">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover border-4 border-background shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1 rounded-full shadow-sm">
                  <Zap className="h-3 w-3" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-sm font-bold text-amber-700/50 dark:text-amber-500/50 tracking-widest mb-1">
                  {member.initials}
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  {member.name}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] px-2 py-0.5 h-auto"
                >
                  {member.badge}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Email", value: "info@agrina.ph", icon: Mail },
          { label: "Phone", value: "+63 (02) 123-4567", icon: Phone },
          {
            label: "Address",
            value: "University Research Center, Philippines",
            icon: MapPin,
          },
          { label: "Website", value: "www.agrina.ph", icon: Globe },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm font-semibold truncate hover:text-clip hover:overflow-visible hover:whitespace-normal">
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Hardware Architecture */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-amber-800 dark:text-amber-500">
              Hardware Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                title: "Arduino Microcontroller",
                desc: "High-performance processing unit",
                icon: Cpu,
              },
              {
                title: "ESP32 WiFi Module",
                desc: "Wireless connectivity & Bluetooth",
                icon: Wifi,
              },
              {
                title: "LoRa Communication",
                desc: "Long-range data transmission",
                icon: Server,
              },
              {
                title: "NPK Sensor Array",
                desc: "Advanced soil nutrient detection",
                icon: Zap,
              },
              {
                title: "pH Probe System",
                desc: "High-precision acidity measurement",
                icon: Code2,
              },
              {
                title: "Temperature Sensors",
                desc: "Environmental monitoring",
                icon: Zap,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 p-3 bg-muted/20 border border-border/50 rounded-lg"
              >
                <div className="h-8 w-8 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 shrink-0">
                  <item.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Software Capabilities */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-amber-800 dark:text-amber-500">
              Software Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              "Real-time data visualization dashboard",
              "Multi-user collaboration platform",
              "Comprehensive historical analysis engine",
              "Advanced data export capabilities (CSV, PDF, Excel)",
              "Intelligent alert notification system",
              "Device management and deployment tracking",
              "Secure cloud synchronization",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3 border-b border-border/50 last:border-0"
              >
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-foreground/80">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Platform Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Version", value: "2.1.3", bg: "bg-green-600" },
          { label: "Build", value: "20250128", bg: "bg-amber-500" },
          { label: "Platform", value: "Web Application", bg: "bg-slate-700" },
          {
            label: "License",
            value: "Research & Development",
            bg: "bg-emerald-500",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-muted/30 border border-border rounded-lg p-4 text-center"
          >
            <Badge className={`${item.bg} text-white hover:${item.bg} mb-2`}>
              {item.label}
            </Badge>
            <p className="text-sm font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-muted-foreground border-t border-border mt-8">
        <p>© 2025 AGRina Development Team. All rights reserved.</p>
        <p className="mt-1 opacity-70">
          Dedicated to advancing sustainable agriculture through innovative
          technology solutions.
        </p>
      </div>
    </div>
  );
}
