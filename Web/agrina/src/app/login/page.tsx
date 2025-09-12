"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Leaf, BarChart3, Sprout } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-800 mb-3">AGRIna</h1>
          <p className="text-lg text-amber-700 mb-4">
            Professional Soil Analytics for Rice Cultivation
          </p>

          {/* Sustainable tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Leaf className="w-4 h-4" />
            Sustainable Agriculture Technology
          </div>
        </div>

        {/* Card */}
        <Card className="border-green-200 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-amber-800 mb-2">
              Sign In
            </CardTitle>
            <CardDescription className="text-amber-600 text-base">
              Access your agricultural analytics dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-800 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-10 h-12 border-green-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-800 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 border-green-200 focus:border-green-400 focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium text-base"
            >
              Sign In
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 px-8 pb-8">
            {/* Features */}
            <div className="w-full text-center">
              <p className="text-amber-700 font-medium mb-4">
                New to AGRIna? Experience the future of sustainable farming.
              </p>

              <div className="flex justify-center gap-8 text-sm">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-green-700 font-medium">
                    Real-time Soil Analytics
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-blue-700 font-medium">
                    Smart Insights
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-emerald-700 font-medium">
                    Sustainable Practices
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-amber-600">
          © 2025 AGRIna Development Team
        </div>
        <div className="text-center mt-1 text-xs text-amber-500">
          Empowering sustainable agriculture through innovative technology
        </div>
      </div>
    </div>
  );
}
