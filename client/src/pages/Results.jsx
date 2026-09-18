import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams } from "react-router-dom";

export default function ResultsPage() {
  const [feedbackInterview, setFeedbackInterview] = useState(null);
  const { interviewId } = useParams();

  useEffect(() => {
    const getFeedback = async () => {
      const {data, error} = await supabase
        .from("interviews")
        .select("*")
        .eq("id", interviewId)
        .single();
      
      if (error) {
        console.error(error.message);
        return;
      }
      setFeedbackInterview(data);
      console.log(data)
    }
    getFeedback();
  }, [interviewId]);

  const summaryCard = "bg-yellow-300 py-3 px-6 border-1 rounded";

  if (!feedbackInterview) {
    return <h1 className="text-3xl font-semibold text-center mt-20">Loading...</h1>;
  }

  return (
    <div className="flex flex-col h-full mx-auto w-full">
      <header className="py-2 px-5 flex bg-slate-900 w-full md:text-2xl">
        <h1 className="text-md font-semibold text-white">
          {feedbackInterview.topic.toUpperCase()} Interview Result
        </h1>
        <p className="text-md font-semibold text-white ml-auto">
          {new Date(feedbackInterview.created_at).toLocaleDateString("en-GB")}
        </p>
      </header>
      <div className="overflow-y-auto md:w-3/4 mx-auto">
        <article className="mt-8 mb-4 mx-8 grid grid-cols-2 grid-rows-2 gap-4">
          <div className="row-span-2 flex flex-center flex-col border-1 bg-slate-100 rounded">
            <h1 className="font-bold text-3xl md:text-5xl">Overall Score</h1>
            <p className="font-semibold text-7xl md:text-8xl">
              {feedbackInterview.feedback.overall_score}%
            </p>
          </div>
          <div className={summaryCard}>
            <h1 className="font-semibold text-xl mb-1 md:text-3xl">
              Strengths
            </h1>
            <ul>
              {feedbackInterview.feedback.strengths.map((items, index) => {
                return (
                  <li key={index} className="md:text-xl list-disc ml-4">
                    {items}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={`${summaryCard} col-start-2`}>
            <h1 className="font-semibold text-xl mb-1 md:text-3xl">
              Area To Improve
            </h1>
            <ul>
              {feedbackInterview.feedback.improvements.map((items, index) => {
                return (
                  <li key={index} className="md:text-xl list-disc ml-4">
                    {items}
                  </li>
                );
              })}
            </ul>
          </div>
        </article>
        <hr className="border-t-2 border-gray-300 my-4 mx-8" />
        <article className="my-4 mx-8 space-y-6">
          {feedbackInterview.feedback.question_feedback.map((element, index) => {
            return (
              <div
                key={index}
                className="border-1 rounded overflow-hidden"
              >
                <div>
                  <div className="flex items-center bg-slate-100 border-b-1 px-4 py-2">
                    <h1 className="font-semibold text-slate-800 text-lg md:text-3xl">
                      Question {index + 1}
                    </h1>
                    <span className="ml-auto font-semibold">{element.score}/10</span>
                  </div>
                  <p className="px-4 py-3 leading-relaxed md:text-xl">
                    {element.question}
                  </p>
                </div>
                <div className="border-t-1">
                  <h1 className="bg-sky-100 font-semibold text-sky-900 text-lg px-4 py-2 border-b-1 md:text-3xl">
                    Answer
                  </h1>
                  <p className="px-4 py-3 leading-relaxed md:text-xl">
                    {element.answer}
                  </p>
                </div>
                <div className="border-t-1">
                  <h1 className="bg-yellow-100 font-semibold text-yellow-900 text-lg px-4 py-2 border-b-1 md:text-3xl">
                    Feedback
                  </h1>
                  <p className="px-4 py-3 leading-relaxed md:text-xl">
                    {element.feedback}
                  </p>
                </div>
              </div>
            );
          })}
        </article>
        <article className="my-4 mx-8">
          <div className="border-1 rounded">
            <h1 className="px-4 py-2 border-b-1 font-semibold text-lg bold md:text-3xl bg-yellow-300">Overall Feedback</h1>
            <p className="px-4 py-3 leading-relaxed md:text-xl">{feedbackInterview.feedback.overall_feedback}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
