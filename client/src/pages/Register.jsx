import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { useState } from "react";
import { LoaderCircle } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
        const {data, error: authError} = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: "http://localhost:5173/login",
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

  const inputBarDesign =
    "bg-white/75 py-2 w-full rounded pl-3 mb-1 md:h-15 md:text-xl md:mb-2";
  const labelDesign = "text-lg font-semibold md:text-2xl";

  return (
    <div className="flex-center min-h-screen flex-col">
      <div className="w-3/4 bg-yellow-400 backdrop-blur-md rounded-xl p-10 shadow-[-1px_0px_16px_-1px_#e6e6e6] md:w-1/3">
        <h1 className="font-bold text-3xl cursor-default md:text-5xl md:mb-1">
          Create An Account
        </h1>
        <p className="text-neutral-600 text-md cursor-default md:text-xl">
          Get started with PrepFlow
        </p>
        <p className={`mt-3 h-6 text-center font-semibold ${message === "Account created successfully! Please check your email to verify your account." ? `text-green-600` : `text-red-600`}`}>
          {message}
        </p>
        <form
          className="flex-col flex gap-1"
          onSubmit={handleRegister}
        >
          <label htmlFor="name" className={labelDesign}>
            Name
          </label>
          <input
            disabled={loading}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className={inputBarDesign}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <label htmlFor="confirm_password" className={labelDesign}>
            Re-enter password
          </label>
          <input
            disabled={loading}
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm Password"
            className={inputBarDesign}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className={`bg-neutral-900 text-neutral-100 font-semibold text-1xl mt-3 w-full py-2 rounded md:text-2xl md:py-3 md:mt-5 ${loading ? "bg-neutral-900/75" : "cursor-pointer hover:bg-white/90 hover:text-black hover:ring-1"}`}
            type="submit" 
            disabled={loading}
          >
            {loading ? (<span className="flex justify-center"><LoaderCircle className="animate-spin" size={20}/></span>) : ("Sign Up")}
          </button>
        </form>

        <p className="text-sm text-neutral-700 mt-5 cursor-default md:text-xl md:mt-8 md:text-neutral-600">
          Already have an account?
          <Link to="/login">
            <span className="text-blue-500 font-semibold"> Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
