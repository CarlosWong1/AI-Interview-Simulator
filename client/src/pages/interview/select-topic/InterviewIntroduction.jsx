export default function InterviewIntroduction({ eyebrow, title, subtitle }) {
  return (
    <div className="flex flex-col items-start gap-3">
      {eyebrow && (
        <p className="text-[13px] font-semibold uppercase leading-normal text-muted">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[28px] md:text-[36px] font-normal leading-[1.2] text-ink">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base font-normal leading-[1.5] text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
