"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Activity,
  History,
  Download,
  Settings,
  Info,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signout } from "@/app/(auth)/login/actions";

const navItems = [
  {
    href: "/home",
    label: "Dashboard",
    icon: Home,
    description: "Overview of all your devices and recent activity",
  },
  {
    href: "/live-readings",
    label: "Live Readings",
    icon: Activity,
    description: "Real-time sensor data from your devices",
  },
  {
    href: "/history",
    label: "Historical Logs",
    icon: History,
    description: "View historical data, trends, and deployment records",
  },
  {
    href: "/export",
    label: "Export Data",
    icon: Download,
    description: "Download your data in CSV or PDF format",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Profile, notifications, and system preferences",
  },
  {
    href: "/about",
    label: "About",
    icon: Info,
    description: "Learn more about AGRina platform",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-80 flex-col bg-card border-r border-border text-card-foreground">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-border/50">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border bg-muted p-1">
          <Image
            src="/logo.jpg"
            alt="Logo"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-primary">
            AGRina
          </h1>
          <p className="text-xs text-muted-foreground">Soil Analytics</p>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 p-6 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <User className="h-6 w-6" />
        </div>
        <div className="flex-1 overflow-hidden">
          <h2 className="truncate text-sm font-semibold text-foreground">
            System Administrator
          </h2>
          <p className="truncate text-xs text-primary">admin@agrina.system</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">
              System Administrator
            </span>
            <span className="h-1 w-1 rounded-full bg-primary/50" />
            <span className="text-[10px] text-muted-foreground">
              All Access
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50",
                isActive
                  ? "bg-primary/10 hover:bg-primary/15"
                  : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 rounded-lg p-2 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div
                  className={cn(
                    "font-medium",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                >
                  {item.label}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 p-6 space-y-4">
        <Button
          variant="outline"
          className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
          onClick={() => signout()}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">AGRina Platform</p>
          <p className="text-xs text-muted-foreground">Version 2.1.3 • 2025</p>
        </div>
      </div>
    </div>
  );
}
