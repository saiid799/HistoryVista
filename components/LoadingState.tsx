export default function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Hero image skeleton */}
      <div className="w-full h-[400px] bg-primary/5 rounded-xl animate-pulse" />

      {/* Summary skeleton */}
      <div className="bg-white rounded-lg p-6">
        <div className="space-y-2">
          <div className="w-3/4 h-6 bg-primary/5 rounded animate-pulse" />
          <div className="w-2/3 h-6 bg-primary/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Timeline skeletons */}
      <div className="space-y-6">
        <div className="flex gap-6 items-start p-6 bg-white rounded-lg">
          <div className="w-24 h-6 bg-primary/5 rounded animate-pulse animate-delay-150" />
          <div className="flex-1 space-y-3">
            <div className="w-3/4 h-6 bg-primary/5 rounded animate-pulse animate-delay-150" />
            <div className="w-2/4 h-6 bg-primary/5 rounded animate-pulse animate-delay-300" />
          </div>
        </div>

        <div className="flex gap-6 items-start p-6 bg-white rounded-lg">
          <div className="w-24 h-6 bg-primary/5 rounded animate-pulse animate-delay-300" />
          <div className="flex-1 space-y-3">
            <div className="w-3/4 h-6 bg-primary/5 rounded animate-pulse animate-delay-300" />
            <div className="w-2/4 h-6 bg-primary/5 rounded animate-pulse animate-delay-450" />
          </div>
        </div>

        <div className="flex gap-6 items-start p-6 bg-white rounded-lg">
          <div className="w-24 h-6 bg-primary/5 rounded animate-pulse animate-delay-450" />
          <div className="flex-1 space-y-3">
            <div className="w-3/4 h-6 bg-primary/5 rounded animate-pulse animate-delay-450" />
            <div className="w-2/4 h-6 bg-primary/5 rounded animate-pulse animate-delay-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
