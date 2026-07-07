import SettingsManager from "@/components/events/settings-manager";
import { Settings } from "lucide-react";

export default function AttendeeSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-600" />
          Settings
        </h1>
        <p className="text-xs text-zinc-400">Configure theme preferences and manage account sessions.</p>
      </div>

      <SettingsManager />
    </div>
  );
}
