import { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import questions from "../fake-data/questions";

export default function InterviewPage() {
  const STAGES = {
    SELECT_TOPIC: "selectTopic",
    INTRODUCTION: "introduction",
    INTERVIEW: "interview",
    FINISHED: "finished",
  };

  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [stage, setStage] = useState(STAGES.SELECT_TOPIC);

  const introductionMessages = [
    {
      id: 1,
      sender: "AI",
      message: `Hello, welcome to your ${selectedTopic.toUpperCase()} interview.`,
    },
    {
      id: 2,
      sender: "AI",
      message: "I will ask you 3 questions based on your selected topic.",
    },
    {
      id: 3,
      sender: "AI",
      message: "Once you are ready just click on the start below.",
    },
  ];

  const addMessage = (sender, message) => {
    setMessages((prevMessage) => [
      ...prevMessage,
      { id: crypto.randomUUID(), sender: sender, message: message },
    ]);
  };

  const handleTopicSelection = () => {
    if (selectedTopic) {
      setStage(STAGES.INTRODUCTION);
    }
  };

  const handleStartInterview = () => {
    setStage(STAGES.INTERVIEW);

    addMessage("AI", "Great. Let's Begin");
    addMessage("AI", questions[selectedTopic][currentQuestion].question);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (userAnswer.trim() === "") return;

    addMessage("User", userAnswer);

    const hasNext = currentQuestion + 1 < questions[selectedTopic].length;

    if (hasNext) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);

      addMessage("AI", questions[selectedTopic][nextQuestion].question);

      setUserAnswer("");
    } else {
      addMessage("AI", "Thank you for completing the interview");

      setUserAnswer("");

      setTimeout(() => {
        handleFinishInterview();
      }, 2000);
    }
  };

  const handleFinishInterview = () => {
    setStage(STAGES.FINISHED);
  };

  //* SELECT TOPIC VIEW
  if (stage === STAGES.SELECT_TOPIC) {
    return (
      <div className="flex-center flex-col mt-20 md:mt-40 w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold my-5 md:text-5xl">
          Start a New Interview
        </h1>
        <div className="flex-col flex items-center gap-6 w-full max-w-md">
          <label htmlFor="topic" className="text-xl pb-2 font-semibold">
            Select a topic
          </label>
          <CustomSelect value={selectedTopic} onChange={setSelectedTopic} />
          {console.log(selectedTopic)}
          <button
            onClick={handleTopicSelection}
            disabled={!selectedTopic}
            className={`mt-4 bg-yellow-400 px-6 py-3 text-slate-900 rounded cursor-pointer rounded border-2 border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-[0.98] font-semibold text-lg ${!selectedTopic ? "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-yellow-400 hover:text-slate-900" : ""}`}
          >
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  //* INTERVIEW PAGE
  if (stage === STAGES.INTRODUCTION) {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
        <header className="py-2 px-5 flex bg-slate-900 w-full">
          <h1 className="text-md font-semibold text-white">
            {selectedTopic.toUpperCase()} Interview
          </h1>
        </header>
        <article className="overflow-y-auto flex-1 p-4">
          {introductionMessages.map((text) => (
            <p key={text.id}>
              {text.sender}: {text.message}
            </p>
          ))}
          <p className="">
            AI:
            <span
              className="font-semibold text-sky-500 hover:cursor-pointer"
              onClick={handleStartInterview}
            >
              {" "}
              START INTERVIEW
            </span>
          </p>
        </article>
        <form className="flex w-full p-4 bg-slate-900">
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
            className="border-2 px-4 py-2 rounded-2xl resize-none grow mr-2 border-white bg-white opacity-75 hover:cursor-not-allowed"
          ></textarea>
          <button
            disabled
            className="bg-yellow-400 px-4 py-2 text-slate-900 rounded cursor-pointer rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors transition duration-300 ease-in-out font-semibold md:text-2xl md:py-4 md:px-8 hover:cursor-not-allowed opacity-75"
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  if (stage === STAGES.INTERVIEW) {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
        <header className="py-2 px-5 flex bg-slate-900 w-full">
          <h1 className="text-md font-semibold text-white">
            {selectedTopic.toUpperCase()} Interview
          </h1>
        </header>
        <article className="overflow-y-auto flex-1 p-4">
          {messages.map((text) => {
            return (
              <p key={text.id}>
                {text.sender}: {text.message}
              </p>
            );
          })}
        </article>
        <form onSubmit={handleSend} className="flex w-full p-4 bg-slate-900">
          <textarea
            onChange={(e) => {
              setUserAnswer(e.target.value);
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
            className="border-2 px-4 py-2 rounded-2xl resize-none grow mr-2 border-white bg-white"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-400 px-4 py-2 text-slate-900 rounded cursor-pointer rounded border-2 border-black hover:bg-yellow-300 hover:border-black focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors transition duration-300 ease-in-out font-semibold md:text-2xl md:py-4 md:px-8"
          >
            Send
          </button>
        </form>
      </div>
    );
  }

  if (stage === STAGES.FINISHED) {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
        <header className="py-2 px-5 flex bg-slate-900 w-full">
          <h1 className="text-md font-semibold text-white">
            {selectedTopic.toUpperCase()} Interview
          </h1>
        </header>
        <article className="overflow-y-auto flex-1 p-4">
          {messages.map((text) => {
            return (
              <p key={text.id}>
                {text.sender}: {text.message}
              </p>
            );
          })}
        </article>
        <form onSubmit={handleSend} className="flex w-full p-4 bg-slate-900">
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
            className="border-2 px-4 py-2 rounded-2xl resize-none grow mr-2 border-white bg-white opacity-75 hover:cursor-not-allowed"
          ></textarea>
          <button
            disabled
            className="bg-yellow-400 px-4 py-2 text-slate-900 rounded cursor-pointer rounded border-2 border-black focus:outline-none focus:ring-2 focus:ring-sky-300 transition-colors transition duration-300 ease-in-out font-semibold md:text-2xl md:py-4 md:px-8 hover:cursor-not-allowed opacity-75"
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
