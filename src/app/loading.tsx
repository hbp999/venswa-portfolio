export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-soft-grey border-t-royal-blue" />
        <p className="text-sm font-medium text-text-secondary animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
