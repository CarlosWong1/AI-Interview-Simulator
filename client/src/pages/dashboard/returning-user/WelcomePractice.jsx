import { ArrowRight, MessagesSquare } from "lucide-react";

export default function WelcomePractice({ name, onStartPractice }) {
  return (
    <div className="flex w-full flex-col items-start gap-7">
      {/* Page introduction */}
      <div className="flex w-full flex-col items-start gap-2.5">
        <p className="text-[13px] font-semibold uppercase leading-normal text-[#686b64]">
          Your practice, at a glance
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal leading-[1.2] text-[#20221f]">
          Welcome back, {name}!
        </h1>
        <p className="text-base font-normal leading-[1.6] text-[#686b64]">
          Track your interviews, see your progress, and keep building
          confidence.
        </p>
      </div>

      {/* Practice invitation */}
      <div className="flex w-full flex-col gap-6 rounded-2xl border border-[#e4e5df] bg-[#fffbe9] p-7 sm:flex-row sm:items-center">
        <span className="flex-center size-14 shrink-0 rounded-2xl border border-[#e4e5df] bg-white">
          <MessagesSquare size={24} color="#20221f" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <p className="text-[22px] font-semibold leading-normal text-[#20221f]">
            Ready to ace your next interview?
          </p>
          <p className="text-[15px] font-normal leading-normal text-[#686b64]">
            Practice any topic with PrepFlow AI and challenge yourself to be
            your best.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartPractice}
          className="flex h-12 shrink-0 cursor-pointer items-center gap-2.5 self-start rounded-[10px] border border-[#f4ce38] bg-[#f4ce38] px-5 text-sm font-semibold leading-normal text-[#20221f] transition-all duration-200 hover:brightness-95 active:scale-[0.99] sm:self-auto"
        >
          Start Practice Interview
          <ArrowRight size={16} color="#20221f" />
        </button>
      </div>
    </div>
  );
}
