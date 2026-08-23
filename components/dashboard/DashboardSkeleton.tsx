export default function DashboardSkeleton() {
  return (
    <>
      <div className="h-10 w-56 animate-pulse rounded-lg bg-gray-200 mb-8" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </>
  );
}