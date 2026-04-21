export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-page-soft">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin" />
        <span className="text-xs text-[#6B7280] font-medium tracking-wider uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
