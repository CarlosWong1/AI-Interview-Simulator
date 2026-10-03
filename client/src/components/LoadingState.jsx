import { LoaderCircle } from "lucide-react";

export default function LoadingState({ label = "Loading..." }) {
  return (
    <div role="status" aria-live="polite" className="flex-center flex-col min-h-full gap-6">
      <div className="relative flex-center">
        <span className="absolute w-15 h-15 rounded-full bg-yellow-300/50 animate-ping" />
        <div className="flex-center w-15 h-15 bg-yellow-100 border border-yellow-500 rounded">
          <LoaderCircle className="w-7 h-7 text-yellow-600 animate-spin" strokeWidth={2} />
        </div>
      </div>
      <p className="font-semibold opacity-70 md:text-2xl animate-pulse">{label}</p>
    </div>
  );
}
