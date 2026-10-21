import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { DEFAULT_TOPIC_ICON, TOPIC_ICONS } from "../../../lib/topicIcons";
import { Play } from "lucide-react";

const STEPS = [
  {
    title: "Choose a topic",
    description:
      "Select your engineering domain from six real-world practice areas.",
    footnote: "Frontend, System Design & more",
  },
  {
    title: "Answer AI questions",
    description:
      "Answer AI questions based on your selected topic.",
    footnote: "Conversational format",
  },
  {
    title: "Instant feedback",
    description:
      "Receive a score, your strengths, and clear areas to improve after every session.",
    footnote: "Score, strengths & fixes",
  },
  {
    title: "Track your progress",
    description:
      "Every interview is saved so you can benchmark yourself week over week.",
    footnote: "Continuous skill curve",
  },
];

const TOPICS = [
  {
    value: "Frontend development",
    description:
      "React, lifecycle, performance optimization, state trees, and UI architecture.",
  },
  {
    value: "Backend development",
    description: "APIs, databases, and reliable server-side architecture.",
  },
  {
    value: "System design",
    description:
      "Distributed consensus, low latency caching, microservices, and concurrency.",
  },
  {
    value: "Data structures & algorithms",
    description:
      "Sharpen your problem-solving skills and explain your approach.",
  },
  {
    value: "Behavioral interview",
    description:
      "STAR response format, conflict resolution, project leadership, and delivery.",
  },
  {
    value: "Product management",
    description:
      "Product thinking, prioritization, and decisions grounded in data.",
  },
];

export default function NewUserPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setName(user?.user_metadata?.full_name ?? "there");
    };
    getUser();
  }, []);

  const startTopic = (topic) => {
    navigate("/interview", { state: { topic } });
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-8">
      {/* Introduction */}
      <section className="flex flex-col gap-6 rounded-2xl border border-line bg-gradient-to-r from-accent-tint to-surface p-7 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold uppercase leading-normal tracking-wide text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            Onboarding · Account ready
          </span>
          <h1 className="text-[26px] font-bold leading-[1.15] text-ink md:text-[30px]">
            Welcome to PrepFlow, {name}!
          </h1>
          <p className="max-w-lg text-sm leading-[1.6] text-muted">
            Ready to practice your first AI interview? Pick a topic below —
            you&apos;ll answer real questions and get personalized feedback.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/interview")}
          className="flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2.5 self-start rounded-[10px] border border-accent bg-accent px-5 text-sm font-semibold text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99] md:self-auto"
        >
          <Play size={14} className="fill-on-accent" />
          Start First Interview
        </button>
      </section>

      {/* How it works */}
      <section className="flex flex-col items-start gap-5">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-2xl font-bold leading-[1.2] text-ink">
            Here&apos;s how it works
          </h2>
          <p className="text-[13px] leading-normal text-muted">
            Four structured steps designed to accelerate your interview
            readiness.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="flex min-w-0 flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-5"
            >
              <span className="flex-center size-8 rounded-lg bg-accent text-sm font-bold text-on-accent">
                {index + 1}
              </span>
              <h3 className="text-[15px] font-semibold leading-normal text-ink">
                {step.title}
              </h3>
              <p className="text-[13px] leading-[1.6] text-muted">
                {step.description}
              </p>
              <p className="mt-auto w-full border-t border-hover pt-3 text-xs leading-normal text-faint">
                {step.footnote}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Select a topic */}
      <section className="flex flex-col items-start gap-5">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-2xl font-bold leading-[1.2] text-ink">
            Select a topic
          </h2>
          <p className="text-[13px] leading-normal text-muted">
            Start practicing with questions crafted for your domain.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TOPICS.map((topic) => {
            const Icon = TOPIC_ICONS[topic.value.toLowerCase()] ?? DEFAULT_TOPIC_ICON;
            return (
              <div
                key={topic.value}
                className="flex min-w-0 flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-5"
              >
                <span className="flex-center size-10 rounded-[10px] bg-hover">
                  <Icon size={18} className="text-ink" />
                </span>
                <h3 className="text-base font-semibold leading-normal text-ink">
                  {topic.value}
                </h3>
                <p className="text-[13px] leading-[1.6] text-muted">
                  {topic.description}
                </p>
                <div className="mt-auto flex w-full items-center justify-between gap-3 pt-1">
                  <p className="whitespace-nowrap text-xs leading-normal text-faint">
                    ~15 minutes · 3 questions
                  </p>
                  <button
                    type="button"
                    onClick={() => startTopic(topic.value)}
                    className="flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-accent bg-accent px-4 text-[13px] font-semibold text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
