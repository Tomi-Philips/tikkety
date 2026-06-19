// organizer-stats.tsx
import { DollarSign, Ticket, Calendar, TrendingUp } from "lucide-react";

type OrganizerStatsProps = {
  totalRevenue: number;
  totalTicketsSold: number;
  maxCapacity: number;
  totalEvents: number;
  salePercentage: number;
};

export default function OrganizerStats({
  totalRevenue,
  totalTicketsSold,
  maxCapacity,
  totalEvents,
  salePercentage,
}: OrganizerStatsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      change: "+12.4%",
      changeLabel: "from last month",
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
      ringColor: "ring-emerald-500/20"
    },
    {
      title: "Tickets Sold",
      value: totalTicketsSold,
      subtitle: `/ ${maxCapacity}`,
      icon: Ticket,
      gradient: "from-violet-500 to-indigo-500",
      bgGradient: "from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30",
      ringColor: "ring-violet-500/20",
      progress: salePercentage
    },
    {
      title: "Active Events",
      value: totalEvents,
      change: totalEvents > 0 ? "Active" : "Draft",
      changeLabel: totalEvents > 0 ? "live on public feed" : "no public events",
      icon: Calendar,
      gradient: "from-blue-500 to-blue-500",
      bgGradient: "from-blue-50 to-blue-50 dark:from-blue-950/30 dark:to-blue-950/30",
      ringColor: "ring-blue-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`group relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-zinc-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between`}
        >
          {/* Animated ring effect on hover */}
          <div className={`absolute inset-0 rounded-2xl ring-1 ${stat.ringColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

          {/* Top Content */}
          <div>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-0.5">
                  <h3 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </h3>
                  {stat.subtitle && (
                    <span className="text-sm font-medium text-zinc-400">{stat.subtitle}</span>
                  )}
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="mt-auto pt-4">
            {/* Progress bar for tickets sold */}
            {stat.progress !== undefined && (
              <div className="space-y-1.5">
                <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-700`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-medium">
                  <span className="text-zinc-500">{stat.progress}% filled</span>
                  <span className="text-zinc-400">{maxCapacity - totalTicketsSold} remaining</span>
                </div>
              </div>
            )}

            {/* Change indicator */}
            {stat.change && (
              <div className="flex items-center gap-1.5">
                <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${stat.change.includes('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'
                  }`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
                <span className="text-[10px] text-zinc-400">{stat.changeLabel}</span>
              </div>
            )}
          </div>

          {/* Decorative gradient line at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </div>
      ))}
    </div>
  );
}