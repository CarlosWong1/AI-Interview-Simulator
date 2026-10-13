import { X, TriangleAlert, CircleAlert, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const inputStyle =
  "h-11 w-full rounded-[10px] border border-[#e4e5df] bg-white px-3.5 text-sm text-[#20221f] outline-none transition-colors placeholder:text-[#92958c] focus:border-[#dab628]";

const labelStyle =
  "text-[13px] font-semibold leading-normal text-[#20221f]";

const helperText = "text-xs leading-normal text-[#686b64]";

export default function DeleteAccountConfirmationModal({ onClose }) {
  const [deleteConfirmation, setDeleteConfimation] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const canDelete = deleteConfirmation === "DELETE" && password.length > 0;

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      if (deleteConfirmation !== "DELETE") {
        return;
      }

      const {data: {session}} = await supabase.auth.getSession();

      if (!session) {
        console.error("There are no session");
        return;
      }

      const response = await fetch("/api/account/delete-account", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          password
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message);
        return;
      }

      const data = await response.json();
      console.log(data);

      await supabase.auth.signOut();
      onClose();
      navigate("/")

    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#20221f]/50 p-5"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-md flex-col gap-5 rounded-2xl border border-[#e4e5df] bg-white p-7 shadow-[0px_4px_16px_0px_rgba(32,34,31,0.16)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 cursor-pointer text-[#686b64] transition-colors duration-200 hover:text-[#20221f]"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-start gap-3">
          <span className="flex-center size-12 rounded-[10px] bg-[#fff6f5]">
            <TriangleAlert size={24} color="#b83d36" />
          </span>
          <h1 className="text-xl font-bold leading-normal text-[#20221f]">
            Delete your account?
          </h1>
        </div>

        {/* Permanent warning */}
        <div className="flex flex-col items-start gap-2 rounded-[10px] border border-[#ebcdc9] bg-[#fff6f5] p-4">
          <div className="flex items-center gap-2 text-[#b83d36]">
            <CircleAlert size={18} />
            <h2 className="text-sm font-semibold leading-normal">
              This action is permanent
            </h2>
          </div>
          <p className="text-[13px] leading-[1.6] text-[#686b64]">
            Your profile, interview history, interview results, and account
            will be permanently deleted. This action cannot be undone.
          </p>
        </div>

        {/* Confirmation form */}
        <form className="flex flex-col items-start gap-4" onSubmit={handleDeleteAccount}>
          <div className="flex w-full flex-col items-start gap-2">
            <label htmlFor="delete_confirmation" className={labelStyle}>
              Type <strong className="text-[#b83d36]">DELETE</strong> to confirm
            </label>
            <input
              type="text"
              name="delete_confirmation"
              id="delete_confirmation"
              placeholder="DELETE"
              className={inputStyle}
              onChange={(e) => setDeleteConfimation(e.target.value)}
            />
            <p className={helperText}>
              Enter DELETE exactly as shown. This is case-sensitive.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <label htmlFor="password" className={labelStyle}>
              Confirm your password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="current-password"
                className={`${inputStyle} pr-11`}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-[#686b64] transition-colors hover:text-[#20221f]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className={helperText}>
              Required to verify that you own this account.
            </p>
          </div>

          <div className="mt-1 flex w-full gap-3">
            <button
              onClick={onClose}
              type="button"
              className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-[10px] border border-[#e4e5df] bg-white text-sm font-semibold text-[#20221f] transition-colors duration-200 hover:bg-[#f3f4ef]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canDelete}
              className={`flex h-11 flex-[2] items-center justify-center gap-2 rounded-[10px] border border-[#b83d36] bg-[#b83d36] text-sm font-semibold text-white transition-all duration-200 ${
                canDelete
                  ? "cursor-pointer hover:brightness-90 active:scale-[0.99]"
                  : "cursor-not-allowed opacity-40"
              }`}
            >
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
