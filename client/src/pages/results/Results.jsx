import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useParams } from "react-router-dom";
import LoadingState from "../../components/LoadingState";
import NoResultsPage from "./NoResultsPage";
import ResultsIntroduction from "./complete-results/ResultsIntroduction";
import OverallScoreBanner from "./complete-results/OverallScoreBanner";
import StrengthsImprovements from "./complete-results/StrengthsImprovements";
import QuestionReviews from "./complete-results/QuestionReviews";

export default function ResultsPage() {
  const [feedbackInterview, setFeedbackInterview] = useState(null);
  const [notFound, setNotFound] = useState(false);
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
        setNotFound(true);
        return;
      }
      setFeedbackInterview(data);
      console.log(data)
    }
    getFeedback();
  }, [interviewId]);

  if (notFound) {
    return (<NoResultsPage />);
  }

  if (!feedbackInterview) {
    return (<LoadingState></LoadingState>)
  }

  if (!feedbackInterview.feedback) {
    return (<NoResultsPage />);
  }

  return (
    <div className="flex flex-col h-full mx-auto w-full">
      <div className="max-w-5xl mx-auto">
        <div className="mt-8 mx-4 md:mx-8">
          <ResultsIntroduction
            topic={feedbackInterview.topic}
            createdAt={feedbackInterview.created_at}
            questionsAnswered={feedbackInterview.feedback.question_feedback.length}
          />
        </div>
        <article className="mt-8 mb-4 mx-4 md:mx-8">
          <OverallScoreBanner
            score={feedbackInterview.feedback.overall_score}
            headline={feedbackInterview.feedback.headline}
            summary={feedbackInterview.feedback.summary}
            questionScores={feedbackInterview.feedback.question_feedback.map(
              (q) => q.score,
            )}
          />
        </article>
        <article className="mb-4 mx-4 md:mx-8">
          <StrengthsImprovements
            strengths={feedbackInterview.feedback.strengths}
            improvements={feedbackInterview.feedback.improvements}
          />
        </article>
        <article className="my-4 mx-4 md:mx-8">
          <QuestionReviews
            reviews={feedbackInterview.feedback.question_feedback}
            overallFeedback={feedbackInterview.feedback.overall_feedback}
          />
        </article>
      </div>
    </div>
  );
}
