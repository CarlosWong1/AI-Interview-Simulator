import { useEffect, useRef } from "react";
import { ArrowRight, Loader, Send } from "lucide-react";
import { DEFAULT_TOPIC_ICON, TOPIC_ICONS } from "../../lib/topicIcons";

function Message({ message }) {
  const isAI = message.sender === "AI";

  return (
    <div className={`flex w-full ${isAI ? "justify-start" : "justify-end"}`}>
      {isAI ? (
        <div className="flex max-w-[75%] flex-col items-start gap-2 rounded-2xl rounded-bl-md border border-[#e4e5df] bg-white p-4">
          <span className="rounded bg-[#f4ce38] px-1.5 py-0.5 text-[10px] font-bold uppercase leading-normal text-[#20221f]">
            AI
          </span>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#20221f]">
            {message.message}
          </p>
        </div>
      ) : (
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#20221f] p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-white">
            {message.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default function InterviewChat({
  topic,
  progress,
  completed = false,
  messages,
  action = null,
  userAnswer,
  onUserAnswerChange,
  onSubmit,
  inputDisabled = false,
}) {
  const Icon = TOPIC_ICONS[topic?.toLowerCase()] ?? DEFAULT_TOPIC_ICON;
  const canSubmit = !inputDisabled && userAnswer.trim() !== "";
  const chatRef = useRef(null);

  // Keep the latest message in view
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, action]);

  const handleTextareaInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <header className="flex h-14 w-full shrink-0 items-center justify-between gap-4 border-b border-[#e4e5df] px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex-center size-8 shrink-0 rounded-lg bg-[#f3f4ef]">
            <Icon size={18} color="#20221f" />
          </span>
          <p className="min-w-0 truncate text-base font-semibold leading-normal text-[#20221f]">
            {topic}
          </p>
        </div>
        {progress && (
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#f3f4ef] px-3 py-1 text-xs font-medium leading-normal text-[#686b64]">
            {completed
              ? "Completed"
              : `Question ${progress.current + 1} of ${progress.total}`}
          </span>
        )}
      </header>

      {/* Messages */}
      <article
        className="flex-1 overflow-y-auto bg-[#f8f8f6] p-4 md:px-8 md:py-6"
        ref={chatRef}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          {action &&
            (action.loading ? (
              <div className="flex w-full justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-[#e4e5df] bg-white p-4 text-sm text-[#686b64]">
                  <Loader className="size-4 animate-spin" />
                  {action.loadingLabel}
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-start">
                <button
                  type="button"
                  onClick={action.onClick}
                  className="flex h-11 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-[#f4ce38] bg-[#f4ce38] px-5 text-sm font-semibold text-[#20221f] transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
                >
                  {action.label}
                  <ArrowRight size={16} color="#20221f" />
                </button>
              </div>
            ))}
        </div>
      </article>

      {/* Input bar */}
      <form
        onSubmit={onSubmit}
        className="w-full shrink-0 border-t border-[#e4e5df] bg-white p-4"
      >
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-full border border-[#e4e5df] bg-white py-1.5 pl-5 pr-1.5">
          <textarea
            disabled={inputDisabled}
            onChange={(e) => onUserAnswerChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            value={userAnswer}
            placeholder={
              inputDisabled
                ? "The interview hasn't started yet"
                : "Type your answer…"
            }
            id="answer"
            rows="1"
            style={{ maxHeight: "100px", overflowY: "auto" }}
            onInput={handleTextareaInput}
            className="min-w-0 grow resize-none bg-transparent text-sm leading-relaxed text-[#20221f] outline-none placeholder:text-[#92958c] disabled:opacity-60"
          />
          <button
            disabled={inputDisabled}
            type="submit"
            aria-label="Send answer"
            className={`flex-center size-10 shrink-0 rounded-full bg-[#f4ce38] text-[#20221f] transition-all duration-200 ${
              canSubmit
                ? "cursor-pointer hover:brightness-95 active:scale-95"
                : "cursor-not-allowed opacity-40"
            }`}
          >
            <Send strokeWidth={2} size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
