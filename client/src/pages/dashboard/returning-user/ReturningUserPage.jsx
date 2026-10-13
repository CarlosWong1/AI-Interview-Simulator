import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { useNavigate } from "react-router-dom";
import WelcomePractice from "./WelcomePractice";
import InterviewStatistics from "./InterviewStatistics";
import RecentInterviews from "./RecentInterviews";

// Placeholder until streaks are tracked for real
const CURRENT_STREAK_DAYS = 4;

export default function ReturningUserPage() {
  const [user, setUser] = useState(null);
  const [completedInterview, setCompletedInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const getRecentInterviews = async () => {
      const {data, error} = await supabase
        .from("interviews")
        .select("*")
        .eq("user_id", user.id)
        .not("feedback", "is", null)
        .order("created_at", {ascending: false})
      
      if (error) {
        console.error(error.message);
        return;
      }
      setCompletedInterviews(data);
    }
    getRecentInterviews();
  }, [user]);

  if (!user) {
    return null;
  }

  if (completedInterview.length === 0) {
    return null;
  }

  const totalInterview = completedInterview.length;
  const lastThree = completedInterview.slice(0, 3);
  const averageScore = completedInterview.reduce((sum, interview) => {
    return sum + interview.feedback.overall_score
  }, 0) / completedInterview.length;
  const bestInterview = completedInterview.reduce((best, current) =>
    current.feedback.overall_score > best.feedback.overall_score ? current : best
  );

  const handleStartInterview = () => {
    navigate("/interview")
  }

  return (
    <div className="flex flex-col min-h-full py-10 mx-auto w-full md:w-3/4 max-w-6xl px-5 gap-10">
      <WelcomePractice
        name={user.user_metadata.full_name}
        onStartPractice={handleStartInterview}
      />
      <InterviewStatistics
        total={totalInterview}
        averageScore={Math.round(averageScore)}
        bestScore={bestInterview.feedback.overall_score}
        bestTopic={bestInterview.topic}
        streakDays={CURRENT_STREAK_DAYS}
      />
      <RecentInterviews
        interviews={lastThree}
        onViewAll={() => navigate("/history")}
      />
    </div>
  );
}
