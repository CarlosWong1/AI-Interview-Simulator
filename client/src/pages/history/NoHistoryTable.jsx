import { Link } from "react-router-dom";
import { ClipboardX } from "lucide-react";

export default function NoHistoryTable() {
  return (
    <div className="flex w-full flex-col items-center rounded-2xl border border-line bg-surface px-6 py-14 text-center">
      <span className="flex-center size-14 rounded-2xl bg-accent-tint">
        <ClipboardX size={26} className="text-ink" />
      </span>
      <h2 className="mt-5 text-2xl font-bold leading-[1.2] text-ink">
        You have no interviews yet
      </h2>
      <p className="mt-2 max-w-md text-sm leading-[1.6] text-muted">
        Complete an interview and your results will show up here.
      </p>
      <Link
        to="/interview"
        className="mt-6 flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-accent bg-accent px-6 text-sm font-semibold text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
      >
        Start an Interview
      </Link>
    </div>
  );
}
