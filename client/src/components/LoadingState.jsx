import { LoaderCircle } from "lucide-react";

export default function LoadingState({ label = "Loading..." }) {
  return (
    <div role="status" aria-live="polite" className="flex-center flex-col min-h-full gap-6">
      <div className="relative flex-center">
        <span className="absolute w-15 h-15 rounded-full bg-accent/50 animate-ping" />
        <div className="flex-center w-15 h-15 bg-accent-tint border border-accent-hover rounded">
          <LoaderCircle className="w-7 h-7 text-accent-hover animate-spin" strokeWidth={2} />
        </div>
      </div>
      <p className="font-semibold opacity-70 md:text-2xl animate-pulse">{label}</p>
    </div>
  );
}
