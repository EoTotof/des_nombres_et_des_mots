export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        role="status"
        aria-label="Loading"
        className="size-36 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
      />
    </div>
  );
}
