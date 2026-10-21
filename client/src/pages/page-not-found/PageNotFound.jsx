import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-[#e4e5df] bg-white px-6 py-14 text-center">
        <span className="flex-center size-14 rounded-2xl bg-[#fffbe9]">
          <Compass size={26} color="#20221f" />
        </span>
        <p className="mt-5 text-[13px] font-semibold uppercase leading-normal tracking-wide text-[#686b64]">
          Error 404
        </p>
        <h1 className="mt-1 text-2xl font-bold leading-[1.2] text-[#20221f]">
          Page not found
        </h1>
        <p className="mt-2 max-w-md text-sm leading-[1.6] text-[#686b64]">
          We couldn&apos;t find{" "}
          <span className="font-medium text-[#20221f]">{location.pathname}</span>
          . It may have been moved, or it never existed.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#f4ce38] bg-[#f4ce38] px-6 text-sm font-semibold text-[#20221f] transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
          >
            Back to Home
            <ArrowRight size={16} color="#20221f" />
          </Link>
          <Link
            to="/interview"
            className="flex h-12 cursor-pointer items-center justify-center rounded-[10px] border border-[#e4e5df] bg-white px-6 text-sm font-semibold text-[#20221f] transition-colors duration-200 hover:bg-[#f3f4ef]"
          >
            Start an Interview
          </Link>
        </div>
      </div>
    </div>
  );
}
