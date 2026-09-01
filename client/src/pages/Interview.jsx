import { useState, useEffect, useRef } from "react";
import CustomSelect from "../components/CustomSelect";
import questions from "../fake-data/questions";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";

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
  const [stage, setStage] = useState(STAGES.SELECT_TOPIC);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      const container = chatRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, showResult])

  const addMessage = (sender, message) => {
    setMessages((prevMessage) => [
      ...prevMessage,
      { id: crypto.randomUUID(), sender: sender, message: message },
    ]);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleTopicSelection = async () => {
    if (!selectedTopic) return;

    setStage(STAGES.INTRODUCTION);

    await delay(1000)
    addMessage("AI", `Hello, welcome to your ${selectedTopic.toUpperCase()} interview.`);
    await delay(2000)
    addMessage("AI", "I will ask you 3 questions based on your selected topic.");
    await delay(2000)
    addMessage("AI", "Once you are ready just click on the start below.");
  };

  const handleStartInterview = async () => {
    setStage(STAGES.INTERVIEW);

    await delay(1000)
    addMessage("AI", "Great. Let's Begin");
    await delay(2000)
    addMessage("AI", questions[selectedTopic][currentQuestion].question);
  };

  const handleSend = async (e) => {
    e?.preventDefault();

    if (userAnswer.trim() === "") return;

    addMessage("User", userAnswer);

    const hasNext = currentQuestion + 1 < questions[selectedTopic].length;

    if (hasNext) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);

      setUserAnswer("");
      await delay(2000)
      addMessage("AI", questions[selectedTopic][nextQuestion].question);
      
    } else {
      setUserAnswer("");
      await delay(2000)
      addMessage("AI", "Thank you for completing the interview");
      await delay(2000);
      setInterviewComplete(true);
      await delay(2000);
      addMessage("AI", "I am now analyzing your your response...");
      await delay(4000)
      addMessage("AI", "Analysis complete. Click on the results to see your result");
      await delay(1000);
      setShowResult(true);
    }
  };

  const inputContainer = "flex items-center rounded-full bg-white border-2 border-gray-200 px-3 py-2 w-full md:w-3/4"
  const textareaEnabled = "grow resize-none bg-transparent outline-none p-2 md:text-lg placeholder:text-gray-500";
  const textareaDisabled = "grow resize-none bg-transparent outline-none p-2 md:text-lg opacity-60 placeholder:text-gray-500";
  const sendButton = "w-11 h-11 md:w-14 md:h-14 rounded-full bg-yellow-400 flex items-center justify-center hover:bg-yellow-300 transition-colors cursor-pointer";
  const sendButtonDisabled = "w-11 h-11 md:w-14 md:h-14 rounded-full bg-yellow-400 opacity-50 flex items-center justify-center cursor-not-allowed"

  const displayMessage = (message) => {
    return (
      <>
        {message.map((text) => {
          return (
            <div key={text.id} className={`w-full flex ${text.sender === "AI" ? "justify-start" : "justify-end"}`}>
              <div className={`${text.sender === "AI" ? "bg-slate-100" : "bg-sky-100"} py-2 px-4 mb-2 inline-block rounded max-w-3/4`}>
                <p className="font-semibold md:text-xl">{text.sender}</p>
                <p className="break-all md:text-xl">{text.message}</p>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  const displayActionButton = (action) => {
    return (
      <div className="w-full flex">
        <div className="bg-slate-100 py-2 px-4 mb-2 inline-block rounded max-w-3/4">
          <p className="font-semibold text-medium md:text-xl">AI</p>
          <p className="font-semibold text-sky-500 cursor-pointer md:text-xl">{action}</p>
        </div>
      </div>
    );
  }

  //* SELECT TOPIC VIEW
  if (stage === STAGES.SELECT_TOPIC) {
    return (
      <div className="flex-center flex-col mt-20 md:mt-40 w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold my-5 md:text-5xl">
          Start a New Interview
        </h1>
        <div className="flex-col flex items-center gap-6 w-full max-w-md">
          <label htmlFor="topic" className="text-xl pb-2 font-semibold md:text-3xl">
            Select a topic
          </label>
          <CustomSelect value={selectedTopic} onChange={setSelectedTopic} />
          {console.log(selectedTopic)}
          <button
            onClick={handleTopicSelection}
            disabled={!selectedTopic}
            className={`mt-4 bg-yellow-300 px-6 py-3 text-slate-900 rounded cursor-pointer rounded border-2 border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-[0.98] font-semibold text-lg ${!selectedTopic ? "opacity-50 hover:scale-100 hover:bg-yellow-400 hover:text-slate-900" : ""} md:text-3xl`}
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
          {messages.length === 3 && (
            displayActionButton(<span onClick={handleStartInterview}>START INTERVIEW</span>)
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
            <button
              disabled
              className={sendButtonDisabled}
            >
              <Send strokeWidth={2} size={20}/>
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
        <article className="overflow-y-auto flex-1 p-4 md:px-30 md:py-5" ref={chatRef}>
          {displayMessage(messages)}
          {showResult && (
            displayActionButton(
              <Link to="/results">
                RESULTS
              </Link>
            )
          )}
        </article>
        <form onSubmit={handleSend} className="p-4 bg-slate-900 flex justify-center">
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

