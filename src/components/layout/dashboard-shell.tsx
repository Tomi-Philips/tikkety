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
  const getQuickLinks = (): { name: string; href: string; icon: any; disabled?: boolean }[] => {
    switch (role) {
      case "admin":
        return [
          { name: "Global Security Monitor", href: "/dashboard/admin", icon: ShieldAlert },
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
            name: "Events",
            href: "/dashboard/organizer/events",
            icon: Calendar,
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
          { name: "Explore Campus Events", href: "/dashboard/user", icon: Search },
          { name: "My Purchased Tickets", href: "/dashboard/user", icon: Ticket }
        ];
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">

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
          <div className="flex-1 px-4">
            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">
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
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border
                        ${role === "admin"
                          ? "border-red-200 text-red-500 bg-red-50"
                          : role === "organizer"
                            ? "border-blue-200 text-blue-500 bg-blue-50"
                            : "border-emerald-200 text-emerald-500 bg-emerald-50"
                        }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">
                Quick Actions
              </p>
              <div className="space-y-0.5">
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
                        flex items-center justify-between px-3 py-2 rounded-lg transition-colors
                        ${
                          link.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">
                          {link.name}
                        </span>
                      </div>

                      {link.disabled && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          Soon
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Home Link */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link
                href="/"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Back to Home</span>
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
          <div className="flex items-center justify-between px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, tickets..."
                  className="bg-transparent text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none min-w-[200px]"
                />
                <kbd className="hidden sm:block text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">⌘K</kbd>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="w-4 h-4 text-gray-500" />
              </button>

              <div className="w-px h-6 bg-gray-200" />

              {/* User Profile */}
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">
                    {fullName}
                  </p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                    <span className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-red-500' : role === 'organizer' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                </div>

                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
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