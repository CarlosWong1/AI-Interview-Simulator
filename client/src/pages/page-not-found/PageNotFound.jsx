import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-line bg-surface px-6 py-14 text-center">
        <span className="flex-center size-14 rounded-2xl bg-accent-tint">
          <Compass size={26} className="text-ink" />
        </span>
        <p className="mt-5 text-[13px] font-semibold uppercase leading-normal tracking-wide text-muted">
          Error 404
        </p>
        <h1 className="mt-1 text-2xl font-bold leading-[1.2] text-ink">
          Page not found
        </h1>
        <p className="mt-2 max-w-md text-sm leading-[1.6] text-muted">
          We couldn&apos;t find{" "}
          <span className="font-medium text-ink">{location.pathname}</span>
          . It may have been moved, or it never existed.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-accent bg-accent px-6 text-sm font-semibold text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
          >
            Back to Home
            <ArrowRight size={16} className="text-ink" />
          </Link>
          <Link
            to="/interview"
            className="flex h-12 cursor-pointer items-center justify-center rounded-[10px] border border-line bg-surface px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-hover"
          >
            Start an Interview
          </Link>
        </div>
      </div>
    </div>
  );
}
