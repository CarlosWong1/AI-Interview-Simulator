import { 
  Info,
  Check,
  Clock3,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { TOPICS } from "../../../lib/TOPICS";

const EXPECTATIONS = [
  "Real-world interview questions",
  "Space to think and answer at your pace",
  "Actionable feedback after your session",
];

export default function InterviewConfiguration({
  selectedTopic,
  onSelectTopic,
  onStart,
  loading = false,
}) {
  const topic = TOPICS.find((t) => t.value === selectedTopic);
  const hasTopic = Boolean(topic);

  const renderTopicCard = (t) => {
    const isSelected = t.value === selectedTopic;
    const Icon = t.icon;

    return (
      <button
        key={t.value}
        type="button"
        onClick={() => onSelectTopic(t.value)}
        aria-pressed={isSelected}
        className={`flex h-[178px] cursor-pointer flex-col items-start gap-3.5 rounded-2xl p-5 text-left transition-colors duration-200 ${
          isSelected
            ? "border-[1.5px] border-accent-hover bg-accent-tint"
            : "border border-line bg-surface hover:border-line-strong"
        }`}
      >
        <div className="flex w-full items-center gap-3">
          <span
            className={`flex-center size-9 shrink-0 rounded-lg ${
              isSelected ? "bg-accent text-on-accent" : "bg-hover text-ink"
            }`}
          >
            <Icon size={20} />
          </span>
          <p className="flex-1 text-base leading-[1.3] text-ink">
            {t.label}
          </p>
          {isSelected ? (
            <span className="flex-center size-5 shrink-0 rounded-full border-[1.5px] border-coal bg-coal">
              <Check size={13} color="#ffffff" strokeWidth={3} />
            </span>
          ) : (
            <span className="size-5 shrink-0 rounded-full border-[1.5px] border-line-strong bg-surface" />
          )}
        </div>
        <p className="w-full text-[13px] leading-normal text-muted">
          {t.description}
        </p>
        <p className="w-full text-[11px] font-medium leading-[1.4] text-muted">
          {t.tags}
        </p>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
      {/* Topic selection */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-5">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg text-ink">Choose your topic</p>
          <p className="text-xs text-muted">
            {TOPICS.length} topics available
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {TOPICS.map(renderTopicCard)}
        </div>

        <div className="flex items-center gap-2">
          <Info size={15} className="text-muted" />
          <p className="text-xs text-muted">
            Pick one topic per session. You can try a different one anytime.
          </p>
        </div>
      </div>

      {/* Interview overview */}
      <div className="flex w-full flex-col items-start gap-5 lg:w-[360px] lg:pt-11">
        <div className="flex w-full flex-col items-start gap-6 rounded-2xl border border-line bg-surface p-6">
          <div className="flex w-full items-center justify-between">
            <p className="text-base text-ink">Your interview</p>
            <span
              className={`flex items-center gap-[5px] rounded-full px-[9px] py-[5px] ${
                hasTopic ? "bg-accent-tint" : "bg-hover"
              }`}
            >
              {hasTopic && <Check size={12} className="text-ink" strokeWidth={3} />}
              <p className="text-[11px] font-medium text-ink">
                {hasTopic ? "Ready" : "Pick a topic"}
              </p>
            </span>
          </div>

          <div className="flex w-full flex-col items-start gap-2.5">
            <p className="text-[11px] font-semibold uppercase text-muted">
              Selected topic
            </p>
            <p className="text-2xl leading-[1.2] text-ink">
              {hasTopic ? topic.label : "No topic selected"}
            </p>
            <p className="text-[13px] leading-normal text-muted">
              {hasTopic
                ? topic.overview
                : "Pick a topic to see your session overview."}
            </p>
          </div>

          <div className="flex w-full items-start gap-5 rounded-[10px] bg-background p-4">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <div className="flex items-center gap-1.5">
                <Clock3 size={14} className="text-muted" />
                <p className="text-[11px] text-muted">Duration</p>
              </div>
              <p className="text-sm font-semibold text-ink">
                ~15 minutes
              </p>
            </div>
            <div className="h-10 w-px bg-line" />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <div className="flex items-center gap-1.5">
                <MessageSquare size={14} className="text-muted" />
                <p className="text-[11px] text-muted">Questions</p>
              </div>
              <p className="text-sm font-semibold text-ink">
                3 questions
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3">
            <p className="text-[13px] font-semibold text-ink">
              Here&apos;s what to expect
            </p>
            {EXPECTATIONS.map((expectation) => (
              <div key={expectation} className="flex w-full items-start gap-[9px]">
                <Check size={14} className="mt-[3px] shrink-0 text-muted" />
                <p className="flex-1 text-xs leading-normal text-muted">
                  {expectation}
                </p>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-2.5">
            <button
              type="button"
              onClick={onStart}
              disabled={!hasTopic || loading}
              className={`flex h-[52px] w-full items-center justify-center gap-3 rounded-[10px] bg-accent text-[15px] text-on-accent transition-all duration-200 ${
                hasTopic && !loading
                  ? "cursor-pointer hover:brightness-95 active:scale-[0.99]"
                  : "cursor-not-allowed opacity-40"
              }`}
            >
              Start interview
            </button>
            <p className="text-[11px] text-muted">
              Just practice. No pressure.
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-2.5 px-2">
          <Lightbulb size={19} className="text-muted shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <p className="text-xs font-semibold text-ink">
              Make the most of your practice
            </p>
            <p className="text-xs leading-normal text-muted">
              Find a quiet spot and explain your thinking, just like you would
              in a real interview.
            </p>
          </div>
        </div>        
      </div>
    </div>
  );
}
