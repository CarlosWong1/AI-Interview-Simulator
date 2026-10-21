function QuestionReviewCard({ review, index, total }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-surface">
      {/* Question header */}
      <div className="flex w-full flex-col gap-2.5 border-b border-line bg-accent-tint px-7 py-6">
        <div className="flex w-full flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-accent px-2 py-[3px] text-[11px] font-bold leading-normal text-on-accent">
              Q{index + 1} OF {total}
            </span>
            {review.topic && (
              <p className="text-xs leading-normal text-muted">
                {review.topic}
              </p>
            )}
          </div>
          <span className="rounded-full bg-coal px-2.5 py-1 text-xs font-semibold leading-normal text-white">
            {review.score} / 10
          </span>
        </div>
        <p className="w-full text-xl font-semibold leading-[1.45] text-ink">
          {review.question}
        </p>
      </div>

      {/* Answer and feedback */}
      <div className="flex w-full flex-col gap-6 p-7 lg:flex-row lg:items-start lg:gap-6">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="h-4 w-[3px] shrink-0 rounded-[2px] bg-accent" />
            <p className="text-[13px] font-semibold leading-normal text-ink">
              Your answer
            </p>
          </div>
          <p className="text-sm font-normal leading-[1.75] text-ink">
            {review.answer}
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-3.5 rounded-xl bg-background p-[22px] lg:w-[380px] lg:shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-4 w-[3px] shrink-0 rounded-[2px] bg-ink" />
            <p className="text-[13px] font-semibold leading-normal text-ink">
              Feedback
            </p>
          </div>
          <p className="text-[13px] font-normal leading-[1.7] text-muted">
            {review.feedback}
          </p>

          {review.improvement && (
            <>
              <div className="h-px w-full bg-line" />
              <p className="text-[13px] font-semibold leading-normal text-ink">
                To make it stronger
              </p>
              <p className="text-[13px] font-normal leading-[1.7] text-muted">
                {review.improvement}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuestionReviews({ reviews, overallFeedback }) {
  return (
    <div className="flex w-full flex-col items-start gap-5">
      <div className="flex w-full flex-col items-start gap-1">
        <h2 className="text-2xl font-bold leading-normal text-ink">
          Question-Answer-Feedback
        </h2>
        <p className="text-sm leading-normal text-muted">
          All {reviews.length} questions · Your answers and feedback
        </p>
      </div>

      {reviews.map((review, index) => (
        <QuestionReviewCard
          key={index}
          review={review}
          index={index}
          total={reviews.length}
        />
      ))}

      {overallFeedback && (
        <div className="w-full rounded-2xl border border-line bg-surface p-7">
          <div className="flex items-center gap-2">
            <span className="h-4 w-[3px] shrink-0 rounded-[2px] bg-accent" />
            <h3 className="text-[13px] font-semibold uppercase leading-normal tracking-wide text-ink">
              Overall feedback
            </h3>
          </div>
          <div className="my-5 h-px w-full bg-hover" />
          <p className="text-sm font-normal leading-[1.75] text-ink">
            {overallFeedback}
          </p>
        </div>
      )}
    </div>
  );
}
