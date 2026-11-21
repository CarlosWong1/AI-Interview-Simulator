import { useState, useEffect, useRef } from "react";
import InterviewConfiguration from "./select-topic/InterviewConfiguration.jsx";
import InterviewIntroduction from "./select-topic/InterviewIntroduction.jsx";
import InterviewChat from "./InterviewChat.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import WorkspaceFooter from "./select-topic/WorkspaceFooter.jsx";
import { TOPICS } from "../../lib/TOPICS.js";
import { authenticatedFetch } from "../../lib/authenticatedFetch.js";

export default function InterviewPage() {
  const STAGES = {
    SELECT_TOPIC: "selectTopic",
    INTRODUCTION: "introduction",
    INTERVIEW: "interview",
  };

  const location = useLocation();
  // Allows other pages (e.g. the new-user dashboard) to open this page with
  // a topic already picked via navigate("/interview", { state: { topic } })
  const [selectedTopic, setSelectedTopic] = useState(
    location.state?.topic ?? "",
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [stage, setStage] = useState(STAGES.SELECT_TOPIC);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [evaluationError, setEvaluationError] = useState(false);
  const [failedOperation, setFailedOperation] = useState(null);

  const navigate = useNavigate();

  const isSubmittingRef = useRef(false);
  const pendingMessageIdRef = useRef(null);
  const pendingAnswerIdRef = useRef(null);

  const topic = TOPICS.find((t) => t.value === selectedTopic);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const addLocalMessage = (sender, message, messageId = null) => {
    const id = messageId || crypto.randomUUID();

    setMessages((prev) => {
      if (prev.some((msg) => msg.id === id)) {
        return prev;
      }
      return [ 
        ...prev,
        {
          id: id,
          sender: sender,
          message: message,
        },
      ]
    });
  };

  const addMessage = async (sender, message, messageId) => {
    if (!user || !interviewId) {
      throw new Error("Missing user or interview");
    }

    const messageData = {
      ...(messageId ? { id: messageId } : {}),
      interview_id: interviewId,
      user_id: user.id,
      role: sender,
      content: message,
    };

    const { error: messageError } = messageId
      ? await supabase
        .from("messages")
        .upsert(messageData, {
          onConflict: "id",
          ignoreDuplicates: true,
        })
      : await supabase
        .from("messages")
        .insert(messageData);

    if (messageError) {
      throw new Error(messageError.message);
    }

    addLocalMessage(sender, message, messageId);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleTopicSelection = async () => {
    if (!topic) return;

    if (!user) {
      console.log("User not authenticate");
      return;
    }
    const { data, error: interviewError } = await supabase
      .from("interviews")
      .insert({
        user_id: user.id,
        topic: selectedTopic,
      })
      .select()
      .single();

    console.log("Error:", interviewError);

    if (interviewError) {
      console.error(interviewError.message);
      return;
    }

    const newInterviewId = data.id;
    setInterviewId(newInterviewId);
    setStage(STAGES.INTRODUCTION);

    await delay(1000);
    addLocalMessage("AI", `Hello, welcome to your ${topic?.label} interview.`);
    await delay(2000);
    addLocalMessage(
      "AI",
      "I will ask you 3 questions based on your selected topic.",
    );
    await delay(2000);
    addLocalMessage("AI", "Once you are ready just click on the start below.");
  };

  const baseUrl = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

  const handleStartInterview = async () => {
    setLoading(true);
    setErrorMessage("");
    const url = `${baseUrl}/api/interview/start`;
    const payload = {
      topic: selectedTopic,
    };
    try {
      const response = await authenticatedFetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Request failed: ${response.status}`);
      }

      setQuestions(result.questions);
      setLoading(false);
      setStage(STAGES.INTERVIEW);

      await delay(1000);
      addLocalMessage("AI", "Great. Let's Begin");
      await delay(2000);
      await addMessage("AI", result.questions[0].question);
    } catch (error) {
      console.error(`Error sending data:`, error);
      setErrorMessage(
        "Unable to generate interview questions. Please try again.",
      );
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();

    if (isSubmittingRef.current || interviewComplete || failedOperation === "ai_question") return;
    if (userAnswer.trim() === "") return;
    if (!pendingAnswerIdRef.current) {
      pendingAnswerIdRef.current = crypto.randomUUID();
    }

    isSubmittingRef.current = true;
    
    setErrorMessage("");

    try {
      await addMessage("User", userAnswer, pendingAnswerIdRef.current);
      pendingAnswerIdRef.current = null;

      const hasNext = currentQuestion + 1 < questions.length;

      const currentResponse = {
        question: questions[currentQuestion].question,
        answer: userAnswer,
      };

      const allResponses = [...responses, currentResponse];
      setResponses(allResponses);

      if (hasNext) {
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);

        setUserAnswer("");
        await delay(2000);

        try {
          pendingMessageIdRef.current = crypto.randomUUID();
          await addMessage("AI", questions[nextQuestion].question, pendingMessageIdRef.current);
          setErrorMessage("");
          pendingMessageIdRef.current = null;
        } catch (error) {
          console.error("Failed to save AI question:", error);
          setFailedOperation("ai_question")
          setErrorMessage("Failed to load the next question. Please try again.")
        }
      } else {
        setUserAnswer("");
        await delay(2000);
        addLocalMessage("AI", "Thank you for completing the interview");
        await delay(2000);
        setInterviewComplete(true);
        await delay(2000);
        addLocalMessage("AI", "I am now analyzing your your response...");
        
        handleEvaluation(allResponses);
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
      setErrorMessage("Failed to save your answer. Please try again.")
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleEvaluation = async (answers) => {
    setEvaluationError(false);
    const url = `${baseUrl}/api/interview/evaluate`;

    const payload = {
      topic: selectedTopic,
      responses: answers,
    };

    try {
      setLoading(true);
      const response = await authenticatedFetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to post: ${response.status}`);
      }
      const result = await response.json();

      const { error } = await supabase
        .from("interviews")
        .update({
          feedback: result,
        })
        .eq("id", interviewId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      addLocalMessage(
        "AI",
        "Analysis complete. Click on the results to see your result",
      );
      await delay(1000);
      setShowResult(true);
    } catch (error) {
      console.error(error);
      setEvaluationError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResultsClick = () => {
    navigate(`/results/${interviewId}`);
  };

  const handleRetryQuestion = async () => {
    if (failedOperation !== "ai_question") return;

    if (isSubmittingRef.current === true) return;

    isSubmittingRef.current = true;

    try {
      await addMessage("AI", questions[currentQuestion].question, pendingMessageIdRef.current);
      pendingMessageIdRef.current = null;
      setFailedOperation(null);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      isSubmittingRef.current = false;
    }
  }

  //* SELECT TOPIC VIEW
  if (stage === STAGES.SELECT_TOPIC) {
    return (
      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col px-4 md:mt-16 md:px-8">
        <div className="mb-10">
          <InterviewIntroduction
            eyebrow="Interview Setup"
            title="What would you like to practice?"
            subtitle="Choose a topic. Get real interview questions, then personalized feedback to help you improve."
          />
        </div>
        <InterviewConfiguration
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
          onStart={handleTopicSelection}
          loading={loading}
        />
        <div className="mt-5">
          <WorkspaceFooter></WorkspaceFooter>
        </div>
      </div>
    );
  }

  //* INTERVIEW INTRODUCTION PAGE
  if (stage === STAGES.INTRODUCTION) {
    return (
      <InterviewChat
        topic={topic?.label}
        messages={messages}
        error={errorMessage}
        inputDisabled
        userAnswer={userAnswer}
        onUserAnswerChange={setUserAnswer}
        onSubmit={handleSend}
        action={
          messages.length === 3 && {
            label: "Start Interview",
            loadingLabel: "Generating interview...",
            loading,
            onClick: handleStartInterview,
          }
        }
      />
    );
  }

  //* INTERVIEW PAGE
  if (stage === STAGES.INTERVIEW) {
    return (
      <InterviewChat
        topic={topic?.label}
        progress={{ current: currentQuestion, total: questions.length }}
        completed={interviewComplete}
        messages={messages}
        error={evaluationError ? "Unable to evaluate your interview. Please try again." : errorMessage}
        userAnswer={userAnswer}
        onUserAnswerChange={setUserAnswer}
        onSubmit={handleSend}
        inputDisabled={interviewComplete || failedOperation === "ai_question"}
        action={
          showResult ? {
            label: "View Results",
            onClick: handleResultsClick,
          } : (evaluationError || loading) ? {
            label: "Retry Evaluation",
            onClick: () => handleEvaluation(responses),
            loading,
            loadingLabel: "Evaluating..."

          } : failedOperation === "ai_question" ? {
            label: "Retry Question",
            onClick: handleRetryQuestion,
          } : null
        }
      />
    );
  }
}
