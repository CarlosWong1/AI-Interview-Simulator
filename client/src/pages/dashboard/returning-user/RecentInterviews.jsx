import { DEFAULT_TOPIC_ICON, TOPIC_ICONS } from "../../../lib/topicIcons";

function RecentInterviewRow({ interview }) {
  const Icon = TOPIC_ICONS[interview.topic?.toLowerCase()] ?? DEFAULT_TOPIC_ICON;
  const score = interview.feedback.overall_score;

  return (
    <div className="flex w-full items-center gap-4 border-b border-line px-4 py-4 md:gap-6 md:px-7">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <span className="flex-center size-10 shrink-0 rounded-[10px] bg-hover">
          <Icon size={18} className="text-ink" />
        </span>
        <p className="min-w-0 flex-1 truncate text-base font-semibold leading-normal text-ink">
          {interview.topic}
        </p>
      </div>
      <p className="hidden w-[140px] shrink-0 text-sm leading-normal text-muted sm:block lg:w-[200px]">
        {new Date(interview.created_at).toLocaleDateString("en-GB")}
      </p>
      <div className="flex w-[160px] shrink-0 items-center gap-3.5 lg:w-[210px]">
        <p className="w-11 text-base font-semibold leading-normal text-ink">
          {score}%
        </p>
        <div className="h-1.5 w-full max-w-[116px] rounded-full bg-hover">
          <div
            className="h-1.5 rounded-full bg-accent"
            style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RecentInterviews({ interviews, onViewAll }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-surface">
      {/* Toolbar */}
      <div className="flex h-[72px] w-full items-center justify-between gap-4 px-4 md:px-7">
        <p className="whitespace-nowrap text-xl font-semibold leading-normal text-ink">
          Recent Mock Interviews
        </p>
        <button
          type="button"
          onClick={onViewAll}
          className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-[10px] border border-accent bg-accent px-3.5 text-sm font-semibold leading-normal text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
        >
          View All
        </button>
      </div>

      {/* Column headings */}
      <div className="flex h-10 w-full items-center gap-4 border-y border-line bg-background px-4 text-[13px] font-semibold text-muted md:gap-6 md:px-7">
        <p className="flex-1 min-w-0">Topic</p>
        <p className="hidden w-[140px] shrink-0 sm:block lg:w-[200px]">Date</p>
        <p className="w-[160px] shrink-0 lg:w-[210px]">Score</p>
      </div>

      {/* Rows */}
      {interviews.map((interview) => (
        <RecentInterviewRow key={interview.id} interview={interview} />
      ))}

      {/* Footer */}
      <div className="flex h-10 w-full items-center justify-between whitespace-nowrap px-4 text-xs leading-normal text-muted md:px-7">
        <p>
          Your {interviews.length} most recent{" "}
          {interviews.length === 1 ? "interview" : "interviews"}
        </p>
        <p>Scores are out of 100</p>
      </div>
    </div>
  );
}
