import NewUserPage from "./newUserPage";
import ReturningUserPage from "./ReturningUserPage";
import LoadingState from "../../components/LoadingState";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [completedInterviews, setCompletedInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  if (loading) {
    return (<LoadingState></LoadingState>)
  }

  return completedInterviews.length === 0 ? 
    (<NewUserPage></NewUserPage>) : (<ReturningUserPage></ReturningUserPage>);
}
