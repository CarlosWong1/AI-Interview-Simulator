import { useState, useEffect, useRef } from "react";
import CustomSelect from "../components/CustomSelect";
import { useNavigate } from "react-router-dom";
import { Send, Loader } from "lucide-react";
import { supabase } from "../lib/supabase.js";

export default function InterviewPage() {
  const STAGES = {
    SELECT_TOPIC: "selectTopic",
    INTRODUCTION: "introduction",
    INTERVIEW: "interview",
  };

  const [selectedTopic, setSelectedTopic] = useState("");
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

  const chatRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatRef.current) {
      const container = chatRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, showResult]);

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
    if (!selectedTopic) return;

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
      `Hello, welcome to your ${selectedTopic.toUpperCase()} interview.`,
    );
    await delay(2000);
    addLocalMessage(
      "AI",
      "I will ask you 3 questions based on your selected topic.",
    );
    await delay(2000);
    addLocalMessage("AI", "Once you are ready just click on the start below.");
  };

  const handleStartInterview = async () => {
    setLoading(true);
    const url = `${import.meta.env.VITE_API_URL}/api/interview/start`;
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
      const url = `${import.meta.env.VITE_API_URL}/api/interview/evaluate`;

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

  const inputContainer =
    "flex items-center rounded-full bg-white border-2 border-gray-200 px-3 py-2 w-full md:w-3/4";
  const textareaEnabled =
    "grow resize-none bg-transparent outline-none p-2 md:text-lg placeholder:text-gray-500";
  const textareaDisabled =
    "grow resize-none bg-transparent outline-none p-2 md:text-lg opacity-60 placeholder:text-gray-500";
  const sendButton =
    "w-11 h-11 md:w-14 md:h-14 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-300 transition-colors cursor-pointer";
  const sendButtonDisabled =
    "w-11 h-11 md:w-14 md:h-14 rounded-full bg-yellow-400 opacity-50 flex items-center justify-center cursor-not-allowed";

  const displayMessage = (message) => {
    return (
      <>
        {message.map((text) => {
          return (
            <div
              key={text.id}
              className={`w-full flex ${text.sender === "AI" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`${text.sender === "AI" ? "bg-slate-100" : "bg-sky-100"} py-2 px-4 mb-2 inline-block rounded max-w-3/4`}
              >
                <p className="font-semibold md:text-xl">{text.sender}</p>
                <p className="break-all md:text-xl">{text.message}</p>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const displayActionButton = (content) => {
    return (
      <div className="w-full flex">
        <div className="bg-slate-100 py-2 px-4 mb-2 inline-block rounded max-w-3/4">
          <p className="font-semibold text-medium md:text-xl">AI</p>
          <div className="font-semibold text-sky-500 cursor-pointer md:text-xl">
            {content}
          </div>
        </div>
      </div>
    );
  };

  //* SELECT TOPIC VIEW
  if (stage === STAGES.SELECT_TOPIC) {
    return (
      <div className="flex-center flex-col mt-20 md:mt-40 w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold my-5 md:text-5xl">
          Start a New Interview
        </h1>
        <div className="flex-col flex items-center gap-6 w-full max-w-md">
          <label
            htmlFor="topic"
            className="text-xl pb-2 font-semibold md:text-3xl"
          >
            Select a topic
          </label>
          <CustomSelect value={selectedTopic} onChange={setSelectedTopic} />
          <button
            onClick={handleTopicSelection}
            disabled={!selectedTopic}
            className={`mt-4 bg-yellow-300 w-50 py-3 rounded border-1 border-black font-semibold text-lg md:text-3xl
              ${
                selectedTopic
                  ? "cursor-pointer text-slate-900 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300 ease-in-out"
                  : "opacity-50"
              }`}
          >
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  //* INTERVIEW INTRODUCTION PAGE
  if (stage === STAGES.INTRODUCTION) {
    return (
      <div className="flex flex-col h-full mx-auto w-full">
        <header className="py-2 px-5 flex bg-slate-900 w-full">
          <h1 className="font-semibold text-white md:text-2xl">
            {selectedTopic.toUpperCase()} Interview
          </h1>
        </header>
        <article className="overflow-y-auto flex-1 p-4 md:px-30 md:py-5">
          {displayMessage(messages)}
          {messages.length === 3 &&
            displayActionButton(
              loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin w-5 h-5" />
                  <span>Generating interview...</span>
                </div>
              ) : (
                <span onClick={handleStartInterview}>START INTERVIEW</span>
              ),
            )}
        </article>
        <form className="p-4 bg-slate-900 flex justify-center">
          <div className={inputContainer}>
            <textarea
              disabled
              placeholder="Type here"
              id="answer"
              rows="1"
              style={{ maxHeight: "100px", overflowY: "auto" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
              }}
              className={textareaDisabled}
            ></textarea>
            <button disabled className={sendButtonDisabled}>
              <Send strokeWidth={2} size={20} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  //* INTERVIEW PAGE
  if (stage === STAGES.INTERVIEW) {
    return (
      <div className="flex flex-col h-full mx-auto w-full">
        <header className="py-2 px-5 flex bg-slate-900 w-full">
          <h1 className="font-semibold text-white md:text-2xl">
            {selectedTopic.toUpperCase()} Interview
          </h1>
        </header>
        <article
          className="overflow-y-auto flex-1 p-4 md:px-30 md:py-5"
          ref={chatRef}
        >
          {displayMessage(messages)}
          {showResult &&
            displayActionButton(
              <span onClick={handleResultsClick}>RESULTS</span>,
            )}
        </article>
        <form
          onSubmit={handleSend}
          className="p-4 bg-slate-900 flex justify-center"
        >
          <div className={inputContainer}>
            <textarea
              disabled={interviewComplete}
              onChange={(e) => {
                setUserAnswer(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                  setUserAnswer("");
                }
              }}
              value={userAnswer}
              placeholder="Type here"
              id="answer"
              rows="1"
              style={{ maxHeight: "100px", overflowY: "auto" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
              }}
              className={interviewComplete ? textareaDisabled : textareaEnabled}
            ></textarea>
            <button
              disabled={interviewComplete}
              type="submit"
              className={interviewComplete ? sendButtonDisabled : sendButton}
            >
              <Send strokeWidth={2} size={20} />
            </button>
          </div>
        </form>
      </div>
    );
  }
}