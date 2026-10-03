import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

export default function NoResultsPage() {
  return (
    <div className="flex-center flex-col min-h-full gap-6 text-center px-4">
      <div className="relative flex-center">
        <span className="absolute w-15 h-15 rounded-full bg-yellow-300/50 animate-ping" />
        <div className="flex-center w-15 h-15 bg-yellow-100 border border-yellow-500 rounded">
          <SearchX className="w-7 h-7 text-yellow-600" strokeWidth={2} />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="font-bold text-3xl md:text-5xl">No Results Yet</h1>
        <p className="font-semibold opacity-70 md:text-xl max-w-md mx-auto">
          There is no interview here. Start an interview to see your results.
        </p>
      </div>
      <Link
        to="/interview"
        className="cursor-pointer border-1 rounded py-2 px-4 font-semibold bg-yellow-300 hover:bg-black hover:text-white md:py-3 md:px-5"
      >
        Start an Interview
      </Link>
    </div>
  );
}
