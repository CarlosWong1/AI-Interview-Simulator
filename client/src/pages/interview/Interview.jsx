import { useState, useEffect } from "react";
import InterviewConfiguration from "./select-topic/InterviewConfiguration.jsx";
import InterviewIntroduction from "./select-topic/InterviewIntroduction.jsx";
import InterviewChat from "./InterviewChat.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import WorkspaceFooter from "./select-topic/WorkspaceFooter.jsx";
import { TOPICS } from "../../lib/TOPICS.js";

export default function InterviewPage() {
  const STAGES = {
    SELECT_TOPIC: "selectTopic",
    INTRODUCTION: "introduction",
    INTERVIEW: "interview",
  };

  const location = useLocation();
  // Allows other pages (e.g. the new-user dashboard) to open this page with
  // a topic already picked via navigate("/interview", { state: { topic } })
  const [selectedTopic, setSelectedTopic] = useState(location.state?.topic ?? "");
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

  const navigate = useNavigate();

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

  const addLocalMessage = (sender, message) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: sender,
        message: message,
      },
    ]);
  };

  const addMessage = async (sender, message) => {
    addLocalMessage(sender, message);

    if (!user || !interviewId) {
      console.error("Missing user or interview.");
      return;
    }

    const { error: messageError } = await supabase.from("messages").insert({
      interview_id: interviewId,
      user_id: user.id,
      role: sender,
      content: message,
    });

    if (messageError) {
      console.error(messageError.message);
      return;
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleTopicSelection = async () => {
    if (!topic) return;

    if (!user) {
      console.log("User not authenticate");
      return;
    }
    console.log("User:", user);
    const { data, error: interviewError } = await supabase
      .from("interviews")
      .insert({
        user_id: user.id,
        topic: selectedTopic,
      })
      .select()
      .single();

    console.log("Interview:", data);
    console.log("Error:", interviewError);

    if (interviewError) {
      console.error(interviewError.message);
      return;
    }

    const newInterviewId = data.id;
    setInterviewId(newInterviewId);
    setStage(STAGES.INTRODUCTION);

    await delay(1000);
    addLocalMessage(
      "AI",
      `Hello, welcome to your ${topic?.label} interview.`,
    );
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
    const url = `${baseUrl}/api/interview/start`;
    const payload = {
      topic: selectedTopic,
    };
    try {
      const response = await fetch(url, {
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

      console.log(`Sucess:`, result.questions);

      setQuestions(result.questions);
      setLoading(false);
      setStage(STAGES.INTERVIEW);

      await delay(1000);
      addLocalMessage("AI", "Great. Let's Begin");
      await delay(2000);
      await addMessage("AI", result.questions[0].question);
    } catch (error) {
      console.error(`Error sending data:`, error);
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();

    if (userAnswer.trim() === "") return;

    await addMessage("User", userAnswer);

    const hasNext = currentQuestion + 1 < questions.length;

    const currentResponse = {
      question: questions[currentQuestion].question,
      answer: userAnswer,
    };

    setResponses((prev) => [...prev, currentResponse]);

    if (hasNext) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);

      setUserAnswer("");
      await delay(2000);
      await addMessage("AI", questions[nextQuestion].question);
    } else {
      setUserAnswer("");
      await delay(2000);
      addLocalMessage("AI", "Thank you for completing the interview");
      await delay(2000);
      setInterviewComplete(true);
      await delay(2000);
      addLocalMessage("AI", "I am now analyzing your your response...");

      const allResponses = [...responses, currentResponse];
      const url = `${baseUrl}/api/interview/evaluate`;

      const payload = {
        topic: selectedTopic,
        responses: allResponses,
      };

      try {
        const response = await fetch(url, {
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
        console.log("Interview feedback: ", result);

        const { data, error } = await supabase
          .from("interviews")
          .update({
            feedback: result,
          })
          .eq("id", interviewId)
          .select()
          .single();

        if (error) {
          console.error(error.message);
          return;
        }

        console.log(data);

        addLocalMessage(
          "AI",
          "Analysis complete. Click on the results to see your result",
        );
        await delay(1000);
        setShowResult(true);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleResultsClick = () => {
    navigate(`/results/${interviewId}`);
  };

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
        userAnswer={userAnswer}
        onUserAnswerChange={setUserAnswer}
        onSubmit={handleSend}
        inputDisabled={interviewComplete}
        action={
          showResult && {
            label: "View Results",
            onClick: handleResultsClick,
          }
        }
      />
    );
  }
}