import { Search } from "lucide-react";
import { DEFAULT_TOPIC_ICON, TOPIC_ICONS } from "../../lib/topicIcons";

function TopicBadge({ topic }) {
  const Icon = TOPIC_ICONS[topic?.toLowerCase()] ?? DEFAULT_TOPIC_ICON;
  return (
    <span className="flex-center size-10 shrink-0 rounded-[10px] bg-hover">
      <Icon size={18} className="text-ink" />
    </span>
  );
}

function ScoreBar({ score }) {
  return (
    <div className="flex w-[200px] shrink-0 items-center gap-3.5">
      <p className="w-[42px] text-base font-semibold leading-normal text-ink">
        {score}%
      </p>
      <div className="h-1.5 w-[100px] rounded-full bg-hover">
        <div
          className="h-1.5 rounded-full bg-accent"
          style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function HistoryTable({
  interviews,
  search,
  onSearchChange,
  onViewResult,
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-surface">
      {/* Toolbar */}
      <div className="flex h-[88px] w-full items-center justify-between gap-4 px-4 md:px-7">
        <div className="flex items-center gap-2.5">
          <p className="whitespace-nowrap text-lg font-semibold leading-normal text-ink">
            All interviews
          </p>
          <span className="rounded-full bg-hover px-[9px] py-1 text-xs font-semibold leading-normal text-muted">
            {interviews.length}
          </span>
        </div>
        <div className="flex h-11 w-full max-w-[340px] items-center gap-2.5 rounded-[10px] border border-line bg-surface px-3.5">
          <Search size={18} className="shrink-0 text-muted" />
          <input
            type="text"
            placeholder="Search Interview"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </div>
      </div>

      {/* Column headings */}
      <div className="flex h-12 w-full items-center gap-4 border-y border-line bg-background px-4 text-[13px] font-semibold text-muted md:gap-6 md:px-7">
        <p className="hidden w-[180px] shrink-0 sm:block lg:w-[220px]">Date</p>
        <p className="flex-1 min-w-0">Topic</p>
        <p className="hidden w-[200px] shrink-0 sm:block">Score</p>
        <p className="w-[130px] shrink-0 text-right lg:w-[156px]">Action</p>
      </div>

      {/* Rows */}
      {interviews.map((item) => (
        <div
          key={item.id}
          className="flex w-full items-center gap-4 border-b border-line px-4 py-5 md:gap-6 md:px-7"
        >
          <p className="hidden w-[180px] shrink-0 text-sm leading-normal text-muted sm:block lg:w-[220px]">
            {new Date(item.created_at).toLocaleDateString("en-GB")}
          </p>
          <div className="flex min-w-0 flex-1 items-center gap-3.5">
            <TopicBadge topic={item.topic} />
            <p className="min-w-0 flex-1 truncate text-base font-semibold leading-normal text-ink">
              {item.topic}
            </p>
          </div>
          <div className="hidden sm:block">
            <ScoreBar score={item.feedback.overall_score} />
          </div>
          <div className="flex w-[130px] shrink-0 justify-end lg:w-[156px]">
            <button
              type="button"
              onClick={() => onViewResult(item.id)}
              className="flex h-10 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-accent bg-accent px-4 text-sm font-semibold leading-normal text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
            >
              View Result
            </button>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="flex h-[52px] w-full items-center justify-between whitespace-nowrap px-4 text-xs leading-normal text-muted md:px-7">
        <p>
          Showing all {interviews.length}{" "}
          {interviews.length === 1 ? "interview" : "interviews"}
        </p>
        <p>Scores are out of 100</p>
      </div>
    </div>
  );
}
