"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  TrendingUp,
  Home
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
  const pathname = usePathname();
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

  // Unified, single-level sidebar navigation links per role
  const getSidebarLinks = (): { name: string; href: string; icon: any; disabled?: boolean }[] => {
    switch (role) {
      case "admin":
        return [
          {
            name: "Admin Control",
            href: "/dashboard/admin",
            icon: ShieldAlert,
          },
          {
            name: "Global Security Monitor",
            href: "/dashboard/admin", // Point directly, no segregation
            icon: ShieldAlert,
          },
          {
            name: "Manage Platform Users",
            href: "/dashboard/admin", // Point directly, no segregation
            icon: User,
          }
        ];
      case "organizer":
        return [
          {
            name: "Organizer Studio",
            href: "/dashboard/organizer",
            icon: LayoutDashboard,
          },
          {
            name: "Create Event",
            href: "/dashboard/organizer/create-event",
            icon: Plus,
          },
          {
            name: "Events",
            href: "/dashboard/organizer/events",
            icon: Calendar,
          },
          {
            name: "Payouts",
            href: "/dashboard/organizer/payouts",
            icon: CreditCard,
          },
          {
            name: "Settings",
            href: "/dashboard/organizer/settings",
            icon: Settings,
          },
        ];
      case "user":
      default:
        return [
          {
            name: "Overview",
            href: "/dashboard/attendee",
            icon: LayoutDashboard,
          },
          {
            name: "My Tickets",
            href: "/dashboard/attendee/tickets",
            icon: Ticket,
          },
          {
            name: "Orders",
            href: "/dashboard/attendee/orders",
            icon: CreditCard,
          },
          {
            name: "Profile",
            href: "/dashboard/attendee/profile",
            icon: User,
          },
          {
            name: "Settings",
            href: "/dashboard/attendee/settings",
            icon: Settings,
          }
        ];
    }
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <div className="min-h-screen flex bg-slate-100 font-sans">

      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR PANEL */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col
        transform lg:transform-none lg:opacity-100 transition-all duration-300 ease-out
        ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100"}
      `}>
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Logo Section */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex flex-col gap-0.5">
                <Image
                  src="/tikkety-main-logo.png"
                  alt="Tikkety Logo"
                  width={130}
                  height={36}
                  loading="eager"
                  style={{ width: "130px", height: "auto" }}
                  className="object-contain"
                />
                <span className="text-[10px] text-gray-400">Event Management</span>
              </Link>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 -mr-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-4">
            <nav className="space-y-1">
              {sidebarLinks.map((link, idx) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

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
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? role === "admin"
                          ? "bg-red-50/80 text-red-700 font-bold shadow-sm"
                          : role === "organizer"
                          ? "bg-blue-50/80 text-blue-700 font-bold shadow-sm"
                          : "bg-emerald-50/80 text-emerald-700 font-bold shadow-sm"
                        : link.disabled
                        ? "opacity-50 cursor-not-allowed text-zinc-400"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 ${
                        isActive
                          ? role === "admin"
                            ? "border-red-200 text-red-500 bg-red-100/30"
                            : role === "organizer"
                            ? "border-blue-200 text-blue-500 bg-blue-100/30"
                            : "border-emerald-200 text-emerald-500 bg-emerald-100/30"
                          : "border-zinc-200/80 bg-zinc-50/50 text-zinc-400 group-hover:border-zinc-300/80 group-hover:bg-zinc-100/20 group-hover:text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:group-hover:border-zinc-700/80 dark:group-hover:bg-zinc-800/20 dark:group-hover:text-zinc-300"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">
                        {link.name}
                      </span>
                    </div>

                    {link.disabled && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Back to Home Link */}
            <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 mt-4">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:bg-blue-950/20 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-200/80 bg-zinc-50/50 text-zinc-400 group-hover:border-blue-200 group-hover:bg-blue-100/20 group-hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:group-hover:border-blue-800/50 dark:group-hover:text-blue-400">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>

          <div className="flex justify-between items-center text-[10px] text-gray-400 px-1 pt-3">
            <span>Tikkety v1.0.0</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              System Online
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-72">


        {/* NAVBAR */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, tickets..."
                  className="bg-transparent text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none min-w-[180px] lg:min-w-[240px]"
                />
                <kbd className="hidden lg:block text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">⌘K</kbd>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              {/* Settings */}
              <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="w-4 h-4 text-gray-500" />
              </button>

              <div className="hidden sm:block w-px h-6 bg-gray-200" />

              {/* User Profile */}
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                    {fullName}
                  </p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      role === 'admin' ? 'bg-red-500' : 
                      role === 'organizer' ? 'bg-blue-500' : 
                      'bg-emerald-500'
                    }`} />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                </div>

                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
} 