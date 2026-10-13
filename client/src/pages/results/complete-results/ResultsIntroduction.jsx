function formatCompletedLabel(dateString) {
  const date = new Date(dateString);
  if (date.toDateString() === new Date().toDateString()) {
    return "Completed today";
  }
  return `Completed ${date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

export default function ResultsIntroduction({
  topic,
  createdAt,
  questionsAnswered,
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
        <p className="text-[13px] font-semibold uppercase leading-normal text-[#686b64]">
          Interview results
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal leading-[1.2] text-[#20221f]">
          {topic}
        </h1>
        <p className="text-base font-normal leading-[1.6] text-[#686b64]">
          A closer look at the answers, what worked well, and where to improve.
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="rounded-full bg-[#f3f4ef] px-3 py-1.5 text-xs leading-normal text-[#686b64]">
          {formatCompletedLabel(createdAt)}
        </span>
        <p className="text-xs leading-normal text-[#92958c]">
          {questionsAnswered}{" "}
          {questionsAnswered === 1 ? "question" : "questions"} answered
        </p>
      </div>
    </div>
  );
}
