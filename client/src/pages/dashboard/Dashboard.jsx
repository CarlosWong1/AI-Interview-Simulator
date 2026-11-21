import NewUserPage from "./new-user/NewUserPage.jsx"
import ReturningUserPage from "./returning-user/ReturningUserPage.jsx";
import LoadingState from "../../components/LoadingState";
import { supabase } from "../../lib/supabase.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [completedInterviews, setCompletedInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const {data: {user}, error: authError} = await supabase.auth.getUser();

        if (authError) throw authError;

        if(!user) {
          navigate("/login");
          return;
        }

        const {data, error} = await supabase
          .from("interviews")
          .select("id")
          .eq("user_id", user.id)
          .not("feedback", "is", null)
          .limit(1);

        if (error) throw error;

        setCompletedInterviews(data ?? []);
      } catch (error) {
        console.error("Failed to load dashbaord", error);
        setError("Unable to load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    } 
    getInterviews();
  }, [navigate]);

  if (loading) {
    return (<LoadingState></LoadingState>)
  }

  if (error) {
    return (
      <div role="alert">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return completedInterviews.length === 0 ? 
    (<NewUserPage></NewUserPage>) : (<ReturningUserPage></ReturningUserPage>);
}
