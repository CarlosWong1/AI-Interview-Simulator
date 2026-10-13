import { Flame, MessagesSquare, Star, Target } from "lucide-react";

function StatisticCard({ icon: Icon, label, value, suffix, caption }) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-3.5 rounded-2xl border border-[#e4e5df] bg-white p-6">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-medium leading-normal text-[#686b64]">
          {label}
        </p>
        <Icon size={18} color="#20221f" />
      </div>
      <p className="w-full text-[36px] font-bold leading-[1.15] text-[#20221f]">
        {value}
        {suffix && (
          <span className="text-xl font-medium leading-[1.15]">{suffix}</span>
        )}
      </p>
      <p className="w-full truncate text-[13px] font-normal leading-normal text-[#686b64]">
        {caption}
      </p>
    </div>
  );
}

export default function InterviewStatistics({
  total,
  averageScore,
  bestScore,
  bestTopic,
  streakDays,
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatisticCard
        icon={MessagesSquare}
        label="Total interviews"
        value={total}
        caption="Make time for your next interview"
      />
      <StatisticCard
        icon={Target}
        label="Average score"
        value={`${averageScore}%`}
        caption="Target score: 85%"
      />
      <StatisticCard
        icon={Star}
        label="Best interview"
        value={`${bestScore}%`}
        caption={bestTopic}
      />
      <StatisticCard
        icon={Flame}
        label="Current streak"
        value={streakDays}
        suffix=" days"
        caption="Keep practicing to level up"
      />
    </div>
  );
}
