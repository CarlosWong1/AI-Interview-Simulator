function QuestionReviewCard({ review, index, total }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#e4e5df] bg-white">
      {/* Question header */}
      <div className="flex w-full flex-col gap-2.5 border-b border-[#e4e5df] bg-[#fffbe9] px-7 py-6">
        <div className="flex w-full flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#f4ce38] px-2 py-[3px] text-[11px] font-bold leading-normal text-[#20221f]">
              Q{index + 1} OF {total}
            </span>
            {review.topic && (
              <p className="text-xs leading-normal text-[#686b64]">
                {review.topic}
              </p>
            )}
          </div>
          <span className="rounded-full bg-[#20221f] px-2.5 py-1 text-xs font-semibold leading-normal text-white">
            {review.score} / 10
          </span>
        </div>
        <p className="w-full text-xl font-semibold leading-[1.45] text-[#20221f]">
          {review.question}
        </p>
      </div>

      {/* Answer and feedback */}
      <div className="flex w-full flex-col gap-6 p-7 lg:flex-row lg:items-start lg:gap-6">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="h-4 w-[3px] shrink-0 rounded-[2px] bg-[#f4ce38]" />
            <p className="text-[13px] font-semibold leading-normal text-[#20221f]">
              Your answer
            </p>
          </div>
          <p className="text-sm font-normal leading-[1.75] text-[#20221f]">
            {review.answer}
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-3.5 rounded-xl bg-[#f8f8f6] p-[22px] lg:w-[380px] lg:shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-4 w-[3px] shrink-0 rounded-[2px] bg-[#20221f]" />
            <p className="text-[13px] font-semibold leading-normal text-[#20221f]">
              Feedback
            </p>
          </div>
          <p className="text-[13px] font-normal leading-[1.7] text-[#686b64]">
            {review.feedback}
          </p>

          {review.improvement && (
            <>
              <div className="h-px w-full bg-[#e4e5df]" />
              <p className="text-[13px] font-semibold leading-normal text-[#20221f]">
                To make it stronger
              </p>
              <p className="text-[13px] font-normal leading-[1.7] text-[#686b64]">
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
        <h2 className="text-2xl font-bold leading-normal text-[#20221f]">
          Question-Answer-Feedback
        </h2>
        <p className="text-sm leading-normal text-[#686b64]">
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
        <div className="w-full rounded-2xl border border-[#e4e5df] bg-white p-7">
          <div className="flex items-center gap-2">
            <span className="h-4 w-[3px] shrink-0 rounded-[2px] bg-[#f4ce38]" />
            <h3 className="text-[13px] font-semibold uppercase leading-normal tracking-wide text-[#20221f]">
              Overall feedback
            </h3>
          </div>
          <div className="my-5 h-px w-full bg-[#f3f4ef]" />
          <p className="text-sm font-normal leading-[1.75] text-[#20221f]">
            {overallFeedback}
          </p>
        </div>
      )}
    </div>
  );
}
