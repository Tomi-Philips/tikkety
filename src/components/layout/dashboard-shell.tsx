"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signOutAction } from "@/app/actions/auth-actions";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  ShieldAlert,
  LogOut,
  Ticket,
  Sparkles,
  Bell,
  Search,
  Settings,
  Sun,
  Moon,
  CreditCard,
  Calendar,
  Clock,
  Award,
  Plus,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type DashboardShellProps = {
  children: ReactNode;
  user: any;
  profile: any;
};

export default function DashboardShell({ children, user, profile }: DashboardShellProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = profile?.role || "user";
  const fullName = profile?.full_name || user?.email?.split("@")[0];

  const handleLogout = async () => {
    try {
      await signOutAction();
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Role-based navigation
  const getNavLinks = () => {
    switch (role) {
      case "admin":
        return [
          {
            name: "Admin Control",
            href: "/dashboard/admin",
            icon: ShieldAlert,
          }
        ];
      case "organizer":
        return [
          {
            name: "Organizer Studio",
            href: "/dashboard/organizer",
            icon: LayoutDashboard,
          }
        ];
      case "user":
      default:
        return [
          {
            name: "Attendee Dashboard",
            href: "/dashboard/user",
            icon: User,
          }
        ];
    }
  };

  const navLinks = getNavLinks();

  // Get dynamic quick links based on user role
  const getQuickLinks = () => {
    switch (role) {
      case "admin":
        return [
          { name: "Global Security Monit", href: "/dashboard/admin", icon: ShieldAlert },
          { name: "Manage Platform Users", href: "/dashboard/admin", icon: User }
        ];
      case "organizer":
        return [
          {
            name: "Dashboard",
            href: "/dashboard/organizer",
            icon: LayoutDashboard,
          },
          {
            name: "Create Event",
            href: "/dashboard/organizer/create-event",
            icon: Plus,
          },
          {
            name: "Attendees",
            href: "#",
            icon: User,
            disabled: true,
          },
          {
            name: "QR Check-In",
            href: "#",
            icon: Ticket,
            disabled: true,
          },
          {
            name: "Payouts",
            href: "#",
            icon: CreditCard,
            disabled: true,
          },
        ];
      case "user":
      default:
        return [
          { name: "Explore Campus Events", href: "/dashboard/user", icon: Search },
          { name: "My Purchased Tickets", href: "/dashboard/user", icon: Ticket }
        ];
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-zinc-100 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 font-sans">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-900/60 backdrop-blur-md lg:hidden transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR PANEL - Modern Glass Design */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-blue-500/30 dark:border-zinc-800/50 shadow-4xl shadow-zinc-200 dark:shadow-black/30 flex flex-col justify-between
        transform lg:transform-none lg:opacity-100 transition-all duration-300 ease-out
        ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100"}
      `}>
        <div className="flex-1 flex flex-col">
          {/* Logo Section with Enhanced Design */}
          <div className="px-6 pb-1 pt-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Image
                  src="/tikkety-main-logo.png"
                  alt="Tikkety Logo"
                  width={144}
                  height={40}
                  loading="eager"
                  style={{ width: "144px", height: "auto" }}
                  className="object-contain"
                />
                <p className="text-xs text-zinc-400 mt-0.5">Event Management</p>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 -mr-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Profile Summary */}
          <div className="px-4 py-3">
            <div className="bg-gradient-to-br from-blue-50/50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/30 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate">
                    {fullName}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border
                    ${role === 'admin'
                    ? 'border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                    : role === 'organizer'
                      ? 'border-violet-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                      : 'border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                  }`}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Active now
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Area with Enhanced Design */}
          <div className="flex-1 px-4">
            <div className="mb-2">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Main Menu
              </p>
              <nav className="space-y-0.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
                    >
                      {/* Icon pill — coloured border, transparent interior */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border
                        ${role === "admin"
                          ? "border-red-300 dark:border-red-700 text-red-500"
                          : role === "organizer"
                            ? "border-violet-300 dark:border-blue-700 text-blue-500"
                            : "border-emerald-300 dark:border-emerald-700 text-emerald-500"
                        }
                        group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700/50`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {/* Title — single line, no subtitle */}
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 truncate">
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions Section */}
            <div className="px-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Quick Actions
              </p>
              <div className="space-y-1">
                {getQuickLinks().map((link, idx) => {
                  const LinkIcon = link.icon;

                  return (
                    <Link
                      key={idx}
                      href={link.disabled ? "#" : link.href}
                      onClick={(e) => {
                        if (link.disabled) {
                          e.preventDefault();
                          return;
                        }
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        flex items-center justify-between px-2.5 py-2 rounded-xl transition-all group
                        ${
                          link.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <LinkIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-xs font-semibold">
                          {link.name}
                        </span>
                      </div>

                      {link.disabled && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                          Soon
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-semibold">Sign Out</span>
            </div>
            <span className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
          </button>

          <div className="flex justify-between items-center text-[10px] text-zinc-400 px-3 pt-3">
            <span>Tikkety v1.0.0</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              System Online
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-80">

        {/* Enhanced NAVBAR with Glass Morphism */}
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-white/20 dark:border-zinc-800/50 shadow-md shadow-blue-300/20 dark:shadow-black/30">
          <div className="flex items-center justify-between px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <Search className="w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search events, tickets..."
                  className="bg-transparent text-sm text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-400 focus:outline-none min-w-[240px]"
                />
                <kbd className="hidden sm:block text-[10px] font-mono text-zinc-400 bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded">⌘K</kbd>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                <Bell className="w-4 h-4 text-zinc-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
              </button>

              {/* Settings */}
              <button className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                <Settings className="w-4 h-4 text-zinc-500" />
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

              {/* User Profile Dropdown Trigger */}
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {fullName}
                  </p>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-1 justify-end">
                    <span className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-red-500' : role === 'organizer' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                </div>

                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT with Enhanced Styling */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}