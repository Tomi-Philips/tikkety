export default function EventLoading() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>

      {/* Banner skeleton */}
      <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full" />

      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 space-y-3">
            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          </div>
          <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 space-y-4">
            <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-5 space-y-3">
            <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-4 w-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              </div>
            ))}
          </div>
          <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-5 space-y-4">
            <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl" />
              <div className="h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
