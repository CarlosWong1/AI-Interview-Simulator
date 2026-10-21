import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

export default function NoResultsPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-line bg-surface px-6 py-14 text-center">
        <span className="flex-center size-14 rounded-2xl bg-accent-tint">
          <SearchX size={26} className="text-ink" />
        </span>
        <h1 className="mt-5 text-2xl font-bold leading-[1.2] text-ink">
          No results yet
        </h1>
        <p className="mt-2 max-w-md text-sm leading-[1.6] text-muted">
          There is no interview here. Complete an interview and your results
          will show up on this page.
        </p>
        <Link
          to="/interview"
          className="mt-6 flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-accent bg-accent px-6 text-sm font-semibold text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
        >
          Start an Interview
        </Link>
      </div>
    </div>
  );
}
