import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const inputStyle =
  "h-12 w-full rounded-[10px] border border-line bg-surface px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent-hover disabled:opacity-60";

const labelStyle = "text-sm font-medium leading-normal text-ink";

const STRENGTH_COLORS = {
  weak: "#b83d36",
  medium: "#dab628",
  strong: "#15803d",
};

function passwordStrength(password) {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  score = Math.min(score, 4);

  if (score <= 1) return { score: 1, label: "Weak", color: STRENGTH_COLORS.weak };
  if (score <= 3) return { score: 3, label: "Medium", color: STRENGTH_COLORS.medium };
  return { score: 4, label: "Strong", color: STRENGTH_COLORS.strong };
}

function PasswordField({ id, label, placeholder, value, onChange, disabled, autoComplete }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <div className="relative w-full">
        <input
          disabled={disabled}
          type={visible ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${inputStyle} pr-11`}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition-colors hover:text-ink"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = passwordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (fullName.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
        setMessage("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
    }

    setLoading(true)

    try {
        const {error: authError} = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}?auth=confirmed`,
              data: {
                full_name: fullName
              },
            },
        });

        if (authError) {
            setMessage(authError.message);
            return;
        }

        setMessage("Account created successfully! Please check your email to verify your account.");
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

    } catch (error) {
        console.error(error.message)
        setMessage("Something went wrong. Please try again.")
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
            Get started
          </p>
          <h1 className="text-[28px] md:text-[36px] font-normal leading-[1.2] text-ink">
            Create your account
          </h1>
          <p className="text-base font-normal leading-[1.6] text-muted">
            Start practicing your interviews and tracking your progress.
          </p>
        </div>

        {/* Register card */}
        <div className="mt-8 flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
          <form
            className="flex flex-col items-start gap-5 p-7"
            onSubmit={handleRegister}
          >
            <div className="flex w-full flex-col items-start gap-2.5">
              <label htmlFor="name" className={labelStyle}>
                Username
              </label>
              <input
                disabled={loading}
                type="text"
                name="name"
                id="name"
                placeholder="e.g. Jane Doe"
                autoComplete="name"
                className={inputStyle}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col items-start gap-2.5">
              <label htmlFor="email" className={labelStyle}>
                Email address
              </label>
              <input
                disabled={loading}
                type="email"
                name="email"
                id="email"
                placeholder="e.g. you@example.com"
                autoComplete="email"
                className={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex w-full flex-col items-start gap-2.5">
              <PasswordField
                id="password"
                label="Password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              {strength && (
                <div className="flex w-full items-center gap-3">
                  <div className="flex flex-1 gap-1.5">
                    {[1, 2, 3, 4].map((segment) => (
                      <span
                        key={segment}
                        className="h-1 flex-1 rounded-full"
                        style={{
                          backgroundColor:
                            segment <= strength.score
                              ? strength.color
                              : "#e4e5df",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-[13px] leading-normal"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <PasswordField
              id="confirm_password"
              label="Confirm password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            {message && (
              <p
                className={`w-full text-sm font-medium leading-normal ${
                  message.startsWith("Account created")
                    ? "text-success"
                    : "text-danger"
                }`}
              >
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
                "Create Account"
              )}
            </button>
          </form>

          <div className="border-t border-line bg-background py-4 text-center">
            <p className="text-sm leading-normal text-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-ink transition-colors hover:text-danger"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[13px] leading-normal text-faint">
          © 2026 PrepFlow, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
