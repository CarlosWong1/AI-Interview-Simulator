import NewUserPage from "./new-user/NewUserPage.jsx"
import ReturningUserPage from "./returning-user/ReturningUserPage.jsx";
import LoadingState from "../../components/LoadingState";
import { supabase } from "../../lib/supabase.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [completedInterviews, setCompletedInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getInterviews = async () => {
      const {data: {user}} = await supabase.auth.getUser();

      const {data, error} = await supabase
        .from("interviews")
        .select("*")
        .eq("user_id", user.id)
        .not("feedback", "is", null)
        .limit(1);

      if (error) {
        if (!data) {
          navigate("/dashboard")
          return;
        }
        console.error(error.message);
        return;
      }
      setCompletedInterviews(data);
      setLoading(false);
    }
    getInterviews();
  }, [navigate]);

  if (loading) {
    return (<LoadingState></LoadingState>)
  }

  return completedInterviews.length === 0 ? 
    (<NewUserPage></NewUserPage>) : (<ReturningUserPage></ReturningUserPage>);
}
