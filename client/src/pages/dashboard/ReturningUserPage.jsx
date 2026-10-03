import { MessagesSquare, Award, Star, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col min-h-full py-10 mx-auto w-full md:w-3/4 px-5 gap-10">
      <div>
        <h1 className="text-3xl font-bold md:text-5xl">Dashboard</h1>
        <p className="text-black/70 md:text-2xl md:mt-2">
          Welcome back, {user.user_metadata.full_name}! Track your interviews and statistics.
        </p>
      </div>
      <div className="bg-yellow-100/50 border-1 border-yellow-300 rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-3 md:py-12 md:px-11">
        <h1 className="font-bold text-2xl md:text-4xl">Ready to ace your next interview?</h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:text-2xl">
          <p className="text-black/70 md:w-3/5">Start an interview with the PrepFlow AI about any topic you want and challenge your self to be the best.</p>
          <button className="cursor-pointer border-1 rounded py-2 font-semibold bg-yellow-300 hover:bg-black hover:text-white md:py-3 md:px-5 md:ml-auto transition-all duration-300 ease-in-out" onClick={handleStartInterview}>Start Practice Interview</button>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5 md:py-12 md:px-11">
          <div className="flex-center">
            <h1 className="font-semibold text-black/70 md:text-2xl">
              TOTAL INTERVIEWS
            </h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded md:w-15 md:h-15">
              <MessagesSquare size={22} strokeWidth={2}></MessagesSquare>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 md:text-7xl">{totalInterview}</h1>
            <p className="text-black/60 md:text-2xl">Schedule more interview</p>
          </div>
        </div>
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5 md:py-12 md:px-11">
          <div className="flex-center">
            <h1 className="font-semibold text-black/70 md:text-2xl">
              AVERAGE SCORE
            </h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded md:w-15 md:h-15">
              <Award size={22} strokeWidth={2}></Award>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 md:text-7xl">{Math.round(averageScore)}%</h1>
            <p className="text-black/60 md:text-2xl">Target score is 85%</p>
          </div>
        </div>
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5 md:py-12 md:px-11">
          <div className="flex-center">
            <h1 className="font-semibold text-black/70 md:text-2xl">
              BEST INTERVIEW
            </h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded md:w-15 md:h-15">
              <Star size={22} strokeWidth={2}></Star>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 md:text-7xl">{bestInterview.feedback.overall_score}%</h1>
            <p className="text-black/60 md:text-2xl">{bestInterview.topic.toUpperCase()}</p>
          </div>
        </div>
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5 md:py-12 md:px-11">
          <div className="flex-center">
            <h1 className="font-semibold text-black/70 md:text-2xl">
              CURRENT STREAK
            </h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded md:w-15 md:h-15">
              <Flame size={22} strokeWidth={2}></Flame>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2 md:text-7xl">4 Days</h1>
            <p className="text-black/60 md:text-2xl">
              Keep practicing to level up
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 md:py-12 md:px-11">
        <div className="flex mb-5 md:mb-10">
          <h1 className="font-bold text-xl md:text-4xl">Recent Mock Interviews</h1>
          <button onClick={() => navigate("/history")} className="font-semibold text-sky-600 hover:underline cursor-pointer ml-auto md:text-2xl">View All</button>
        </div>
        <div className="flex flex-col gap-3">
          {lastThree.map((interview) => (
            <div key={interview.id}>
              <div className="flex md:text-2xl">
                <h1 className="font-semibold">{interview.topic.toUpperCase()}</h1>
                <div className="flex-center ml-auto gap-3">
                  <p className="bg-green-100 py-1 px-3 rounded text-green-500 font-semibold">{interview.feedback.overall_score}%</p>
                  <p>{new Date(interview.created_at).toLocaleDateString('en-GB')}</p>
                </div>
              </div>
              <div className="border-b border-2 opacity-10 my-3"></div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
}
