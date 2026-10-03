import { Mail, X } from "lucide-react";

export default function EmailVerificationModal({ email, onClose }) {
  const [name, domain] = email.split("@");

  const maskedEmail =
    name.slice(0, 2) +
    "*".repeat(Math.max(name.length - 2, 0)) +
    "@" +
    domain;

  return (
    <div
      className="fixed inset-0 z-50 flex-center bg-black/50 p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg p-8 flex flex-col items-center text-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 cursor-pointer text-black/50 hover:text-black transition-colors duration-200"
        >
          <X size={24} />
        </button>
        <div className="flex-center w-16 h-16 bg-yellow-300/60 rounded-full">
          <Mail size={32} />
        </div>
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-black/70">
          Almost there! We've sent a verification email to{" "}
          <span className="font-semibold text-black">{maskedEmail}</span>.
        </p>
        <p className="text-sm text-black/60">
          You need to verify your email address to confirm the change of email.
        </p>
        <button
          onClick={onClose}
          className="bg-yellow-300 border font-semibold rounded px-4 py-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-200 ease-in-out"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
