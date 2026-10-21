import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Eye, EyeOff, LoaderCircle, Lock } from "lucide-react";

const inputStyle =
  "h-12 w-full rounded-[10px] border border-line bg-surface px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent-hover disabled:opacity-60";

const labelStyle =
  "text-[13px] font-semibold uppercase leading-normal tracking-wide text-ink";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetNote, setResetNote] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResetNote("");

    if (email.trim() === "" || password.trim() === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setPassword("");
      setEmail("");
      navigate("/dashboard");

    } catch (error) {
      console.error(error.message);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10">
      <div className="w-full max-w-[560px]">
        {/* Page introduction */}
        <div className="flex flex-col items-start gap-2.5">
          <p className="text-[13px] font-semibold uppercase leading-normal tracking-wide text-muted">
            Account access
          </p>
          <h1 className="text-[28px] md:text-[36px] font-normal leading-[1.2] text-ink">
            Sign in to PrepFlow
          </h1>
          <p className="text-base font-normal leading-[1.6] text-muted">
            Enter your credentials to access your interview prep and results.
          </p>
        </div>

        {/* Login card */}
        <div className="mt-8 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
          <form
            className="flex flex-col items-start gap-5 p-7"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col items-start gap-2.5">
              <label htmlFor="email" className={labelStyle}>
                Email address
              </label>
              <input
                disabled={loading}
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col items-start gap-2.5">
              <div className="flex w-full items-center justify-between">
                <label htmlFor="password" className={labelStyle}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setResetNote("Password reset is coming soon.")
                  }
                  className="cursor-pointer text-[13px] font-medium text-danger transition-colors hover:text-danger-strong"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative w-full">
                <input
                  disabled={loading}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`${inputStyle} pr-11`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition-colors hover:text-ink"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {resetNote && (
                <p className="text-[13px] leading-normal text-danger">
                  {resetNote}
                </p>
              )}
            </div>

            {message && (
              <p className="w-full text-center text-sm font-medium leading-normal text-danger">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`flex h-12 w-full items-center justify-center rounded-[10px] border border-accent bg-accent text-sm font-semibold text-on-accent transition-all duration-200 ${
                loading
                  ? "cursor-wait opacity-70"
                  : "cursor-pointer hover:brightness-95 active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="border-t border-line bg-background py-4 text-center">
            <p className="text-sm leading-normal text-muted">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-ink transition-colors hover:text-danger"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-[13px] leading-normal text-faint">
          <Lock size={14} />
          Secured with end-to-end industry encryption
        </p>
      </div>
    </div>
  );
}
