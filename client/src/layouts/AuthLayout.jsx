import { Outlet, Link } from "react-router-dom";
import { AudioLines } from "lucide-react";

function AuthLayout() {
  return (
    <>
      <nav className="flex h-16 items-center justify-between border-b border-line bg-surface px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Brand */}
        <div className="flex flex-1 items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex-center size-8 shrink-0 rounded-lg bg-accent">
              <AudioLines size={21} color="#ffffff" strokeWidth={2.25} />
            </span>
            <span className="whitespace-nowrap text-[23px] leading-normal text-ink">
              PrepFlow
            </span>
          </Link>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default AuthLayout;
