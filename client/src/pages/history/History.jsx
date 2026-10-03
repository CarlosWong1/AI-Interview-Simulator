import { Search, ClipboardX, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import LoadingState from "../../components/LoadingState";
import { Link, useNavigate } from "react-router-dom";

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
  }, []);

  if (loading) {
    return (<LoadingState></LoadingState>)
  }

  const completedInterviews = interview.filter(interview =>
    interview.feedback !== null
  );

  const filteredInterviews = completedInterviews.filter(interview =>
    interview.topic.toLowerCase().includes(search.toLowerCase())
  );

  const tableHeaderCell = "px-6 py-3 font-semibold md:text-xl md:px-8 md:py-5";
  const tableCell = "px-6 py-4 md:px-8 md:py-5";

  return (
    <div className="flex flex-col h-full mx-auto w-full md:w-3/4 px-5">
      <header className="my-4 md:my-8">
        <h1 className="text-center font-bold text-3xl mb-8 md:text-5xl md:mb-16">
          Interview History
        </h1>
        <form
          className="inline-flex items-center p-2 gap-2 bg-slate-100 border-1 rounded focus-within:border-yellow-500 md:text-xl"
        >
          <Search className="text-slate-500" />
          <input
            type="text"
            placeholder="Search Interview"
            className="focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
      </header>

      {completedInterviews.length === 0 ? (
        <div className="border-1 rounded bg-slate-100 py-12 px-6 text-center">
          <div className="flex-center w-15 h-15 bg-yellow-100 border border-yellow-500 rounded mx-auto mb-6">
            <ClipboardX className="w-7 h-7 text-yellow-600" strokeWidth={2} />
          </div>
          <h2 className="font-bold text-2xl md:text-3xl">No Interviews Yet</h2>
          <p className="font-semibold opacity-70 md:text-xl mt-2 max-w-md mx-auto">
            Complete an interview and your results will show up here.
          </p>
          <Link
            to="/interview"
            className="inline-block cursor-pointer border-1 rounded py-2 px-4 mt-6 font-semibold bg-yellow-300 hover:bg-black hover:text-white md:py-3 md:px-5"
          >
            Start an Interview
          </Link>
        </div>
      ) : filteredInterviews.length === 0 ? (
        <div className="border-1 rounded bg-slate-100 py-12 px-6 text-center">
          <div className="flex-center w-15 h-15 bg-yellow-100 border border-yellow-500 rounded mx-auto mb-6">
            <SearchX className="w-7 h-7 text-yellow-600" strokeWidth={2} />
          </div>
          <h2 className="font-bold text-2xl md:text-3xl">No Matches Found</h2>
          <p className="font-semibold opacity-70 md:text-xl mt-2 max-w-md mx-auto">
            No interviews match "{search}". Try a different search.
          </p>
        </div>
      ) : (
        <article className="w-full overflow-x-auto border-1 rounded bg-white">
          <table className="w-full text-sm table-fixed md:text-xl">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className={`${tableHeaderCell} text-left`}>Date</th>
                <th className={`${tableHeaderCell} text-left`}>Topic</th>
                <th className={`${tableHeaderCell} text-center`}>Score</th>
                <th className={`${tableHeaderCell} text-center`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterviews.map((item) => {
                return (
                  <tr key={item.id} className="border-t-1 border-gray-200 hover:bg-yellow-100">
                    <td className={`${tableCell} whitespace-nowrap`}>{new Date(item.created_at).toLocaleDateString('en-GB')}</td>
                    <td className={`${tableCell} font-semibold`}>{item.topic.toUpperCase()}</td>
                    <td className={`${tableCell} text-center font-semibold`}>{item.feedback.overall_score}%</td>
                    <td className={`${tableCell} text-center`}>
                      <button
                        onClick={() => navigate(`/results/${item.id}`)}
                        className="cursor-pointer border-1 rounded px-3 py-1 font-semibold bg-yellow-300 hover:bg-black hover:text-white md:px-4 transition-all duration-200 ease-in-out"
                      >
                        View Result
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
      )}
    </div>
  );
}
