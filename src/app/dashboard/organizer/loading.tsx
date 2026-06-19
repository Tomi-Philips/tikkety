export default function OrganizerLoading() {
  return (
    <div className="space-y-8 animate-pulse p-1">
      {/* Header section skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
          <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>
        <div className="h-12 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
      </div>

      {/* Metrics Dashboard Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </div>
            <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Main content list skeleton */}
      <div className="space-y-6">
        <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl overflow-hidden flex flex-col h-96">
              <div className="h-44 bg-zinc-200 dark:bg-zinc-800 w-full" />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                  <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                  <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                  <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
