import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AudioLines,
  ChartNoAxesCombined,
  MessagesSquare,
  Target,
} from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "Realistic mock interviews",
    description:
      "Practice with an AI that asks real interview questions for your role — not generic prompts, but the kind you'll actually face.",
  },
  {
    icon: MessagesSquare,
    title: "Natural, conversational flow",
    description:
      "No rigid forms or multiple choice. Just a real back-and-forth conversation, complete with follow-up questions, like talking to an actual interviewer.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track every session",
    description:
      "Every interview is saved, so you can look back, see what you said, and walk into the next one sharper than the last.",
  },
];

const STEPS = [
  {
    title: "Pick a topic",
    description:
      "Choose from six real-world areas, from frontend development to behavioral interviews.",
  },
  {
    title: "Answer AI-generated questions",
    description:
      "Have a real conversation — the AI asks follow-ups, just like an actual interviewer would.",
  },
  {
    title: "Get actionable feedback",
    description:
      "Receive a score, your strengths, and clear areas to improve after every session.",
  },
];

const yellowButtonStyle =
  "flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border border-accent bg-accent px-6 text-sm font-semibold text-on-accent transition-all duration-200 hover:brightness-95 active:scale-[0.99]";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("auth") !== "confirmed") return;

    const redirectToLogin = async () => {
      await supabase.auth.signOut();

      navigate("/login", {replace: true});
    }
    redirectToLogin();
  }, [navigate]);

  return (
    <div className="w-full">
      {/* Navbar */}
      <nav className="flex h-16 items-center justify-between border-b border-line bg-surface px-4 sm:px-8 lg:px-16">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex-center size-8 shrink-0 rounded-lg bg-accent">
            <AudioLines size={21} color="#ffffff" strokeWidth={2.25} />
          </span>
          <span className="whitespace-nowrap text-[23px] leading-normal text-ink">
            PrepFlow
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/login"
            className="cursor-pointer rounded-[10px] px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-hover"
          >
            Log In
          </Link>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        {/* Hero */}
        <section className="flex flex-col items-center py-16 text-center md:py-24">
          <p className="text-[13px] font-semibold uppercase leading-normal tracking-wide text-muted">
            AI-powered interview practice
          </p>
          <h1 className="mt-3 max-w-3xl text-[36px] font-bold leading-[1.15] text-ink md:text-[52px]">
            The New Standard For Interview Preparation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-[1.6] text-muted md:text-lg">
            Practice real interviews with AI, get instant feedback, and walk in
            ready — built specifically for job seekers who want to stop
            guessing and start improving.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register" className={yellowButtonStyle}>
              Get Started
              <ArrowRight size={16} className="text-on-accent" />
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="flex flex-col items-center pb-16 md:pb-20">
          <h2 className="text-[28px] font-bold leading-[1.2] text-ink md:text-[32px]">
            Why PrepFlow
          </h2>
          <p className="mt-2 text-base leading-[1.6] text-muted">
            Everything you need to practice with purpose.
          </p>
          <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-7"
                >
                  <span className="flex-center size-10 rounded-[10px] bg-accent-tint">
                    <Icon size={20} className="text-ink" />
                  </span>
                  <h3 className="text-lg font-semibold leading-normal text-ink">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-[1.6] text-muted">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="flex flex-col items-center pb-16 md:pb-20">
          <h2 className="text-[28px] font-bold leading-[1.2] text-ink md:text-[32px]">
            How it works
          </h2>
          <p className="mt-2 text-base leading-[1.6] text-muted">
            From setup to feedback in three simple steps.
          </p>
          <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-7"
              >
                <span className="flex-center size-9 rounded-full bg-accent text-base font-bold text-on-accent">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold leading-normal text-ink">
                  {step.title}
                </h3>
                <p className="text-sm leading-[1.6] text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pb-16 md:pb-20">
          <div className="flex flex-col items-start gap-6 rounded-[20px] bg-coal p-8 md:flex-row md:items-center md:gap-9">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <h2 className="text-2xl font-semibold leading-[1.2] text-white">
                Ready to ace your next interview?
              </h2>
              <p className="text-sm leading-normal text-white/65">
                Create a free account and start practicing in minutes.
              </p>
            </div>
            <Link
              to="/register"
              className={`${yellowButtonStyle} shrink-0 self-start md:self-auto`}
            >
              Create Account
              <ArrowRight size={16} className="text-on-accent" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
