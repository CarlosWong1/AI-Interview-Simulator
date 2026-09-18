import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { UserRound, MessagesSquare, Award, Star, Flame } from "lucide-react";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {data: {user}} = await supabase.auth.getUser();

      setUser(user) 
    }
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
        .limit(3);
      
      if (error) {
        console.error(error.message);
        return;
      }
      setRecentInterviews(data);
    }
    getRecentInterviews();
  }, [user]);

  if (!user) {
    return <h1 className="text-3xl font-semibold text-center mt-20">Loading...</h1>;
  }

  const signOut = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) throw error;  
    navigation("/login")
  }

  const dateToString = new Date(user.created_at);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  return (
    <div className="flex flex-col min-h-full py-10 mx-auto w-full md:w-3/4 px-5 gap-10">
      <div>
        <h1 className="text-3xl font-semibold">My Profile</h1>
        <p className="opacity-70">Manage your PrepFlow account and assess performance stats.</p>
      </div>
      <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8">
        <div className="w-full flex">
           <div className="flex-center mr-6">
            <UserRound className="w-24 h-24 rounded-full object-cover bg-slate-100 border-1" />
          </div>
          <div className="flex justify-center flex-col">
            <h1 className="font-bold text-2xl mb-1">{user.user_metadata.full_name}</h1>
            <h2 className="text-sm opacity-80">{user.email}</h2>
            <h2 className="text-sm italic opacity-60">Member since {dateToString.toLocaleDateString('en-GB', options)}</h2>
          </div>
          <div className="ml-auto flex-center flex-col gap-5">
            <button onClick={signOut} className="cursor-pointer border-1 rounded py-2 w-35 font-semibold hover:bg-yellow-300">Log Out</button>
            <button className="cursor-pointer border-1 rounded py-2 w-35 font-semibold bg-yellow-300 hover:bg-black hover:text-white">Edit Account</button>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5">
          <div className="flex-center">
            <h1 className="font-semibold opacity-70">TOTAL INTERVIEWS</h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded">
              <MessagesSquare size={22} strokeWidth={2}></MessagesSquare>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">100</h1>
            <p className="opacity-60">Schedule more interview</p>
          </div>
        </div>
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5">
          <div className="flex-center">
            <h1 className="font-semibold opacity-70">Average Score</h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded">
              <Award size={22} strokeWidth={2}></Award>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">75%</h1>
            <p className="opacity-60">Target score is 85%</p>
          </div>
        </div>
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5">
          <div className="flex-center">
            <h1 className="font-semibold opacity-70">BEST INTERVIEW</h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded">
              <Star size={22} strokeWidth={2}></Star>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">98%</h1>
            <p className="opacity-60">System Architecture</p>
          </div>
        </div>
        <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8 flex flex-col gap-5">
          <div className="flex-center">
            <h1 className="font-semibold opacity-70">CURRENT STREAK</h1>
            <div className="ml-auto flex-center w-10 h-10 bg-yellow-100 border border-yellow-500 rounded">
              <Flame size={22} strokeWidth={2}></Flame>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">4 Days</h1>
            <p className="opacity-60">Keep practicing to level up</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] py-9 px-8">
        <div className="flex mb-5">
          <h1 className="font-bold text-xl">Recent Mock Interviews</h1>
          <button onClick={() => navigation("/history")} className="font-semibold text-sky-600 hover:underline cursor-pointer ml-auto">View All</button>
        </div>
        <div className="flex flex-col gap-3">
          {recentInterviews.map((interview) => (
            <div key={interview.id}>
              <div className="flex">
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