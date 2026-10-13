import { TriangleAlert, Trash2 } from "lucide-react";

export default function DangerZone({ onDelete }) {
  return (
    <div className="flex w-full flex-col gap-8 pt-1 lg:flex-row lg:items-start">
      {/* Section introduction */}
      <div className="flex w-full flex-col items-start gap-3 lg:w-[280px] lg:shrink-0">
        <span className="flex-center size-10 rounded-[10px] bg-[#fff6f5]">
          <TriangleAlert size={20} color="#b83d36" />
        </span>
        <h2 className="text-xl font-semibold leading-normal text-[#b83d36]">
          Danger Zone
        </h2>
        <p className="text-sm leading-[1.6] text-[#686b64]">
          Permanent actions for your account. Please proceed with care.
        </p>
      </div>

      {/* Account deletion card */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#ebcdc9] bg-white">
        <div className="flex w-full flex-col items-start gap-2.5 p-7">
          <p className="w-full text-base font-semibold leading-normal text-[#20221f]">
            Delete your account permanently
          </p>
          <p className="w-full text-sm leading-[1.6] text-[#686b64]">
            Permanently delete account metrics, progress statistics, and
            credentials.
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-b-2xl border-t border-[#ebcdc9] bg-[#fff6f5] px-7 py-5">
          <p className="whitespace-nowrap text-[13px] font-medium leading-normal text-[#b83d36]">
            This action cannot be undone.
          </p>
          <button
            type="button"
            onClick={onDelete}
            className="flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#ebcdc9] bg-white px-[18px] text-sm font-semibold text-[#b83d36] transition-colors duration-200 hover:bg-[#b83d36] hover:text-white"
          >
            <Trash2 size={16} />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
