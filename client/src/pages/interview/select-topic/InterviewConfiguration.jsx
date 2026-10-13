import {
  PanelsTopLeft,
  Database,
  Network,
  CodeXml,
  MessagesSquare,
  ChartNoAxesCombined,
  Info,
  Check,
  Clock3,
  MessageSquare,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const TOPICS = [
  {
    value: "Frontend development",
    icon: PanelsTopLeft,
    description:
      "Build better interfaces, from browser fundamentals to modern frameworks.",
    tags: "JavaScript · React · CSS",
    overview: "Practice the skills behind thoughtful, responsive web experiences.",
  },
  {
    value: "Backend development",
    icon: Database,
    description:
      "Go deeper on APIs, databases, and reliable server-side architecture.",
    tags: "APIs · Databases · Security",
    overview:
      "Strengthen the server-side thinking that keeps applications reliable.",
  },
  {
    value: "System design",
    icon: Network,
    description: "Think through trade-offs and design systems that scale.",
    tags: "Architecture · Scaling · Trade-offs",
    overview: "Learn to reason about scale, trade-offs, and architecture.",
  },
  {
    value: "Data structures & algorithms",
    icon: CodeXml,
    description: "Sharpen your problem-solving skills and explain your approach.",
    tags: "Arrays · Trees · Complexity",
    overview: "Build confidence solving problems and explaining your approach.",
  },
  {
    value: "Behavioral interview",
    icon: MessagesSquare,
    description:
      "Tell your story with clarity and turn your experience into strong answers.",
    tags: "Leadership · Teamwork · STAR",
    overview: "Turn your experience into clear, compelling answers.",
  },
  {
    value: "Product management",
    icon: ChartNoAxesCombined,
    description:
      "Practice product thinking, prioritization, and decisions grounded in data.",
    tags: "Strategy · Metrics · Execution",
    overview: "Sharpen product thinking and data-driven decision making.",
  },
];

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
            ? "border-[1.5px] border-[#dab628] bg-[#fffbe9]"
            : "border border-[#e4e5df] bg-white hover:border-[#ced0c7]"
        }`}
      >
        <div className="flex w-full items-center gap-3">
          <span
            className={`flex-center size-9 shrink-0 rounded-lg ${
              isSelected ? "bg-[#f4ce38]" : "bg-[#f3f4ef]"
            }`}
          >
            <Icon size={20} color="#20221f" />
          </span>
          <p className="flex-1 text-base leading-[1.3] text-[#20221f]">
            {t.value}
          </p>
          {isSelected ? (
            <span className="flex-center size-5 shrink-0 rounded-full border-[1.5px] border-[#20221f] bg-[#20221f]">
              <Check size={13} color="#ffffff" strokeWidth={3} />
            </span>
          ) : (
            <span className="size-5 shrink-0 rounded-full border-[1.5px] border-[#ced0c7] bg-white" />
          )}
        </div>
        <p className="w-full text-[13px] leading-normal text-[#686b64]">
          {t.description}
        </p>
        <p className="w-full text-[11px] font-medium leading-[1.4] text-[#686b64]">
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
          <p className="text-lg text-[#20221f]">Choose your topic</p>
          <p className="text-xs text-[#686b64]">
            {TOPICS.length} topics available
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {TOPICS.map(renderTopicCard)}
        </div>

        <div className="flex items-center gap-2">
          <Info size={15} color="#686b64" />
          <p className="text-xs text-[#686b64]">
            Pick one topic per session. You can try a different one anytime.
          </p>
        </div>
      </div>

      {/* Interview overview */}
      <div className="flex w-full flex-col items-start gap-5 lg:w-[360px] lg:pt-11">
        <div className="flex w-full flex-col items-start gap-6 rounded-2xl border border-[#e4e5df] bg-white p-6">
          <div className="flex w-full items-center justify-between">
            <p className="text-base text-[#20221f]">Your interview</p>
            <span
              className={`flex items-center gap-[5px] rounded-full px-[9px] py-[5px] ${
                hasTopic ? "bg-[#fffbe9]" : "bg-[#f3f4ef]"
              }`}
            >
              {hasTopic && <Check size={12} color="#20221f" strokeWidth={3} />}
              <p className="text-[11px] font-medium text-[#20221f]">
                {hasTopic ? "Ready" : "Pick a topic"}
              </p>
            </span>
          </div>

          <div className="flex w-full flex-col items-start gap-2.5">
            <p className="text-[11px] font-semibold uppercase text-[#686b64]">
              Selected topic
            </p>
            <p className="text-2xl leading-[1.2] text-[#20221f]">
              {hasTopic ? topic.value : "No topic selected"}
            </p>
            <p className="text-[13px] leading-normal text-[#686b64]">
              {hasTopic
                ? topic.overview
                : "Pick a topic to see your session overview."}
            </p>
          </div>

          <div className="flex w-full items-start gap-5 rounded-[10px] bg-[#f8f8f6] p-4">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <div className="flex items-center gap-1.5">
                <Clock3 size={14} color="#686b64" />
                <p className="text-[11px] text-[#686b64]">Duration</p>
              </div>
              <p className="text-sm font-semibold text-[#20221f]">
                ~15 minutes
              </p>
            </div>
            <div className="h-10 w-px bg-[#e4e5df]" />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <div className="flex items-center gap-1.5">
                <MessageSquare size={14} color="#686b64" />
                <p className="text-[11px] text-[#686b64]">Questions</p>
              </div>
              <p className="text-sm font-semibold text-[#20221f]">
                3 questions
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3">
            <p className="text-[13px] font-semibold text-[#20221f]">
              Here&apos;s what to expect
            </p>
            {EXPECTATIONS.map((expectation) => (
              <div key={expectation} className="flex w-full items-start gap-[9px]">
                <Check size={14} color="#686b64" className="mt-[3px] shrink-0" />
                <p className="flex-1 text-xs leading-normal text-[#686b64]">
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
              className={`flex h-[52px] w-full items-center justify-center gap-3 rounded-[10px] bg-[#f4ce38] text-[15px] text-[#20221f] transition-all duration-200 ${
                hasTopic && !loading
                  ? "cursor-pointer hover:brightness-95 active:scale-[0.99]"
                  : "cursor-not-allowed opacity-40"
              }`}
            >
              Start interview
              <ArrowRight size={18} color="#20221f" />
            </button>
            <p className="text-[11px] text-[#686b64]">
              Just practice. No pressure.
            </p>
          </div>
        </div>

        <div className="flex w-full items-start gap-2.5 px-2">
          <Lightbulb size={19} color="#686b64" className="shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
            <p className="text-xs font-semibold text-[#20221f]">
              Make the most of your practice
            </p>
            <p className="text-xs leading-normal text-[#686b64]">
              Find a quiet spot and explain your thinking, just like you would
              in a real interview.
            </p>
          </div>
        </div>        
      </div>
    </div>
  );
}
