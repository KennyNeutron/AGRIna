"use client";

import { Eye, EyeOff, User, Lock, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AGRIna</h1>
          <p className="text-slate-400 mb-6">
            Professional Soil Analytics Platform
          </p>

          {/* Features */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Shield className="w-4 h-4" />
              <span>Secure Access</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <TrendingUp className="w-4 h-4" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-2">
            Sign in to continue
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            Access your agricultural analytics dashboard
          </p>

          <form className="space-y-4">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Sign In
            </button>
          </form>

          {/* Demo Environment */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="text-center text-slate-400 text-sm mb-3">
              Demo Environment
            </div>

            <div className="bg-slate-700 rounded-md p-4 border border-slate-600">
              <div className="text-sm font-medium text-white mb-2">
                Demo Access:
              </div>
              <div className="text-xs text-slate-400">
                Use any email address with any password to access the platform
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-slate-500">
          © 2025 AGRIna Team. Professional Agricultural Analytics.
          <div className="mt-1 space-x-4">
            <span className="text-green-400">Secure</span>
            <span>•</span>
            <span className="text-slate-400">Reliable</span>
            <span>•</span>
            <span className="text-slate-400">Professional</span>
          </div>
        </div>
      </div>
    </div>
  );
}
