export default function InterviewIntroduction({ eyebrow, title, subtitle }) {
  return (
    <div className="flex flex-col items-start gap-3">
      {eyebrow && (
        <p className="text-[13px] font-semibold uppercase leading-normal text-[#686b64]">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[28px] md:text-[36px] font-normal leading-[1.2] text-[#20221f]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base font-normal leading-[1.5] text-[#686b64]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
