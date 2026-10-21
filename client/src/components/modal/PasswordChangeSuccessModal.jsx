import { CircleCheck, X } from "lucide-react";

export default function PasswordChangeSuccessModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex-center bg-black/50 p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-surface shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg p-8 flex flex-col items-center text-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 cursor-pointer text-muted hover:text-ink transition-colors duration-200"
        >
          <X size={24} />
        </button>
        <div className="flex-center w-16 h-16 bg-success/20 rounded-full">
          <CircleCheck size={32} />
        </div>
        <h1 className="text-2xl font-bold">Password Updated</h1>
        <p className="text-muted">
          Your password has been changed successfully.
        </p>
        <p className="text-sm text-faint">
          For your security, you may need to sign in again on other devices.
        </p>
        <button
          onClick={onClose}
          className="bg-accent border-ink-strong text-on-accent border font-semibold rounded px-4 py-2 cursor-pointer hover:bg-ink hover:text-background transition-all duration-200 ease-in-out"
        >
          Done
        </button>
      </div>
    </div>
  );
}
