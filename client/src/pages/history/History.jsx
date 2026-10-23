import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import LoadingState from "../../components/LoadingState";
import HistoryIntroduction from "./HistoryIntroduction";
import HistoryTable from "./HistoryTable";
import NoHistoryTable from "./NoHistoryTable";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const [interview, setInterview] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getInterviews = async () => {
      const {data: {user}} = await supabase.auth.getUser();

      const {data, error} = await supabase
        .from("interviews")
        .select("*")
        .eq("user_id", user.id)

      if (error) {
        if (!data) {
          navigate("/interview");
          return;
        }
        console.error(error.message);
        setLoading(false);
        return;
      }
      setInterview(data);
      setLoading(false);
    }
    getInterviews();
  }, [navigate]);

  if (loading) {
    return (<LoadingState></LoadingState>)
  }

  const completedInterviews = interview.filter(interview =>
    interview.feedback !== null
  );

  const filteredInterviews = completedInterviews.filter(interview =>
    interview.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full mx-auto w-full md:w-3/4 max-w-6xl px-5">
      <header className="my-4 md:my-8">
        <HistoryIntroduction />
      </header>

      {completedInterviews.length === 0 ? (
        <NoHistoryTable />
      ) : (
        <article className="w-full">
          <HistoryTable
            interviews={filteredInterviews}
            search={search}
            onSearchChange={setSearch}
            onViewResult={(id) => navigate(`/results/${id}`)}
          />
        </article>
      )}
    </div>
  );
}
