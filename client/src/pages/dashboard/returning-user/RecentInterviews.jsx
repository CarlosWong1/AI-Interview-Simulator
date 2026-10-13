import { ArrowRight } from "lucide-react";
import { DEFAULT_TOPIC_ICON, TOPIC_ICONS } from "../../../lib/topicIcons";

function RecentInterviewRow({ interview }) {
  const Icon = TOPIC_ICONS[interview.topic?.toLowerCase()] ?? DEFAULT_TOPIC_ICON;
  const score = interview.feedback.overall_score;

  return (
    <div className="flex w-full items-center gap-4 border-b border-[#e4e5df] px-4 py-4 md:gap-6 md:px-7">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <span className="flex-center size-10 shrink-0 rounded-[10px] bg-[#f3f4ef]">
          <Icon size={18} color="#20221f" />
        </span>
        <p className="min-w-0 flex-1 truncate text-base font-semibold leading-normal text-[#20221f]">
          {interview.topic}
        </p>
      </div>
      <p className="hidden w-[140px] shrink-0 text-sm leading-normal text-[#686b64] sm:block lg:w-[200px]">
        {new Date(interview.created_at).toLocaleDateString("en-GB")}
      </p>
      <div className="flex w-[160px] shrink-0 items-center gap-3.5 lg:w-[210px]">
        <p className="w-11 text-base font-semibold leading-normal text-[#20221f]">
          {score}%
        </p>
        <div className="h-1.5 w-full max-w-[116px] rounded-full bg-[#f3f4ef]">
          <div
            className="h-1.5 rounded-full bg-[#f4ce38]"
            style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RecentInterviews({ interviews, onViewAll }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#e4e5df] bg-white">
      {/* Toolbar */}
      <div className="flex h-[72px] w-full items-center justify-between gap-4 px-4 md:px-7">
        <p className="whitespace-nowrap text-xl font-semibold leading-normal text-[#20221f]">
          Recent Mock Interviews
        </p>
        <button
          type="button"
          onClick={onViewAll}
          className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-[10px] bg-[#fffbe9] px-3.5 text-sm font-semibold leading-normal text-[#20221f] transition-colors duration-200 hover:bg-[#f4ce38]"
        >
          View All
          <ArrowRight size={16} color="#20221f" />
        </button>
      </div>

      {/* Column headings */}
      <div className="flex h-10 w-full items-center gap-4 border-y border-[#e4e5df] bg-[#f8f8f6] px-4 text-[13px] font-semibold text-[#686b64] md:gap-6 md:px-7">
        <p className="flex-1 min-w-0">Topic</p>
        <p className="hidden w-[140px] shrink-0 sm:block lg:w-[200px]">Date</p>
        <p className="w-[160px] shrink-0 lg:w-[210px]">Score</p>
      </div>

      {/* Rows */}
      {interviews.map((interview) => (
        <RecentInterviewRow key={interview.id} interview={interview} />
      ))}

      {/* Footer */}
      <div className="flex h-10 w-full items-center justify-between whitespace-nowrap px-4 text-xs leading-normal text-[#686b64] md:px-7">
        <p>
          Your {interviews.length} most recent{" "}
          {interviews.length === 1 ? "interview" : "interviews"}
        </p>
        <p>Scores are out of 100</p>
      </div>
    </div>
  );
}
