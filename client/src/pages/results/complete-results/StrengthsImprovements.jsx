import { ArrowUpRight, Check } from "lucide-react";

// Accepts both {title, description} objects (current AI schema) and plain
// strings (older interviews), rendering strings as title-only takeaways.
function toTakeaway(item) {
  return typeof item === "string"
    ? { title: item, description: null }
    : item;
}

function TakeawayCard({ icon: Icon, title, items, dotClassName }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-6 rounded-2xl border border-[#e4e5df] bg-white p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex-center size-8 shrink-0 rounded-lg bg-[#fffbe9]">
          <Icon size={16} color="#dab628" />
        </span>
        <h2 className="text-lg font-semibold leading-normal text-[#20221f]">
          {title}
        </h2>
      </div>

      <div className="h-px w-full bg-[#f3f4ef]" />

      <div className="flex w-full flex-col items-start gap-5">
        {items.map((item, index) => {
          const { title: takeawayTitle, description } = toTakeaway(item);
          return (
            <div key={index} className="flex w-full flex-col items-start gap-[5px]">
              <div className="flex items-center gap-2">
                <span className={`size-1.5 shrink-0 rounded-full ${dotClassName}`} />
                <p className="text-sm font-semibold leading-normal text-[#20221f]">
                  {takeawayTitle}
                </p>
              </div>
              {description && (
                <p className="text-[13px] font-normal leading-[1.6] text-[#686b64]">
                  {description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StrengthsImprovements({ strengths, improvements }) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
      <TakeawayCard
        icon={Check}
        title="Strengths"
        items={strengths}
        dotClassName="bg-[#f4ce38]"
      />
      <TakeawayCard
        icon={ArrowUpRight}
        title="Areas to improve"
        items={improvements}
        dotClassName="bg-[#e4e5df]"
      />
    </div>
  );
}
