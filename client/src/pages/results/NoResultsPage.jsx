import { Link } from "react-router-dom";
import { ArrowRight, SearchX } from "lucide-react";

export default function NoResultsPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-[#e4e5df] bg-white px-6 py-14 text-center">
        <span className="flex-center size-14 rounded-2xl bg-[#fffbe9]">
          <SearchX size={26} color="#20221f" />
        </span>
        <h1 className="mt-5 text-2xl font-bold leading-[1.2] text-[#20221f]">
          No results yet
        </h1>
        <p className="mt-2 max-w-md text-sm leading-[1.6] text-[#686b64]">
          There is no interview here. Complete an interview and your results
          will show up on this page.
        </p>
        <Link
          to="/interview"
          className="mt-6 flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#f4ce38] bg-[#f4ce38] px-6 text-sm font-semibold text-[#20221f] transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
        >
          Start an Interview
          <ArrowRight size={16} color="#20221f" />
        </Link>
      </div>
    </div>
  );
}
