export default function OverallScoreBanner({score, headline, summary, questionScores}) {
  return (
    <div className="flex flex-col gap-8 rounded-[20px] bg-coal p-8 lg:flex-row lg:items-center lg:gap-9">
      {/* Score display */}
      <div className="flex w-40 shrink-0 flex-col items-center gap-1.5 self-center">
        <div className="flex-center size-[120px] flex-col rounded-full bg-ink-strong">
          <p className="text-[44px] font-bold leading-normal text-accent">
            {score}
          </p>
          <p className="text-[13px] leading-normal text-muted">
            out of 100
          </p>
        </div>
        <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold leading-normal text-on-accent">
          Overall score
        </span>
      </div>

      {/* Divider */}
      <div className="hidden w-px shrink-0 self-center bg-surface/10 lg:block h-[110px]" />

      {/* Score summary */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3.5">
        <h2 className="w-full text-2xl font-semibold leading-[1.2] text-white">
          {headline}
        </h2>
        <p className="w-full text-sm font-normal leading-[1.7] text-white/65">
          {summary}
        </p>
      </div>

      {/* Question scores */}
      <div className="flex shrink-0 flex-col items-start gap-2.5">
        {questionScores.map((questionScore, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 rounded-[10px] bg-surface/8 px-3.5 py-2.5"
          >
            <span className="rounded bg-surface/12 px-1.5 py-0.5 text-[10px] font-semibold leading-normal text-white/60">
              Q{index + 1}
            </span>
            <p className="whitespace-nowrap text-white flex-center">
              <span className="text-sm font-normal leading-normal text-white">
                {`${questionScore} / 10`}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
