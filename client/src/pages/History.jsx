import { Search } from "lucide-react";
import interviews from "../fake-data/interview";

export default function HistoryPage() {
  return (
    <div className="flex flex-col h-full mx-auto w-full md:w-3/4 px-5">
      <header className="my-4 md:my-8">
        <h1 className="text-center font-bold text-3xl mb-8 md:text-5xl md:mb-16">
          Interview History
        </h1>
        <div className="flex">
          <form
            className="flex p-2 gap-2 bg-gray-200 rounded border border-transparent hover:border-gray-300 focus-within:border-sky-500 transition-all duration-200 md:text-xl"
          >
            <Search />
            <input
              type="text"
              placeholder="Search Interview"
              className="focus:outline-none"
            />
          </form>
        </div>
      </header>
      <article className="w-full relative overflow-x-auto bg-neutral-primary-soft rounded border border-default">
        <table className="w-full text-sm table-fixed md:text-xl">
            <thead className="text-sm bg-black text-white border-b border-default-medium">
                <tr>
                    <th className="px-6 py-3 font-medium md:text-xl md:px-8 md:py-5">Date</th>
                    <th className="px-6 py-3 font-medium md:text-xl md:px-8 md:py-5">Topic</th>
                    <th className="px-6 py-3 font-medium md:text-xl md:px-8 md:py-5">Score</th>
                    <th className="px-6 py-3 font-medium md:text-xl md:px-8 md:py-5">Action</th>
                </tr>
            </thead>
            <tbody>
                {interviews.map((item) => {
                    return (
                        <tr key={item.id} className="bg-neutral-primary-soft border-default hover:bg-yellow-300">
                            <td className="px-6 py-4 whitespace-nowrap text-center">{new Date(item.date).toLocaleDateString('en-GB')}</td>
                            <td className="px-6 py-4 font-semibold md:px-8 md:py-5 text-center">{item.topic}</td>
                            <td className="px-6 py-4 md:px-8 md:py-5 text-center">{item.score}%</td>
                            <td className="px-6 py-4 md:px-8 md:py-5 text-center">
                              <button className="font-semibold text-sky-600 hover:underline cursor-pointer">View Result</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      </article>
    </div>
  );
}
