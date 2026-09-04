import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (email.trim() === "" || password.trim() === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setPassword("");
      setEmail("");
      navigation("/dashboard");

    } catch (error) {
      console.error(error.message);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputBarDesign =
    "bg-white/75 py-2 w-full rounded pl-3 mb-1 md:h-15 md:text-xl md:mb-2";
  const labelDesign = "text-lg font-semibold md:text-2xl";

  return (
    <div className="flex-center min-h-screen flex-col">
      <div className="w-3/4 bg-yellow-400 backdrop-blur-md rounded-xl p-10 shadow-[-1px_0px_16px_-1px_#e6e6e6] md:w-1/3">
        <h1 className="font-bold text-3xl cursor-default md:text-5xl md:mb-1">
          Welcome Back
        </h1>
        <p className="text-neutral-600 text-md cursor-default md:text-xl">
          Please enter your details
        </p>
        <p className="mt-3 h-6 text-center font-semibold text-red-600">
            {message}
          </p>
        <form className="flex-col flex gap-1" onSubmit={handleSubmit}>
          <label htmlFor="email" className={labelDesign}>
            Email
          </label>
          <input
            disabled={loading}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className={inputBarDesign}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className={labelDesign}>
            Password
          </label>
          <input
            disabled={loading}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={inputBarDesign}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`bg-neutral-900 text-neutral-100 font-semibold text-1xl mt-3 w-full py-2 rounded md:text-2xl md:py-3 md:mt-5 ${loading ? "bg-neutral-900/75" : "cursor-pointer hover:bg-white/90 hover:text-black hover:ring-1"}`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center">
                <LoaderCircle className="animate-spin" size={20} />
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-sm text-neutral-700 mt-5 cursor-default md:text-xl md:mt-8 md:text-neutral-600">
          Don't have an account?
          <Link to="/register">
            <span className="text-blue-500 font-semibold"> Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
