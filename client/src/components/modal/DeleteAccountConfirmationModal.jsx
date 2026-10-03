import { X, TriangleAlert, CircleAlert, Trash, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function DeleteAccountConfirmationModal({ onClose }) {
  const [deleteConfirmation, setDeleteConfimation] = useState("");
  const [password, setPasword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canDelete = deleteConfirmation === "DELETE" && password.length > 0;

  const inputStyle = "bg-gray-100 p-3 rounded border border-gray-300 mb-1 w-full";
  const helperText = "text-sm text-black/60 mb-3";
  const labelStyle = "font-semibold mb-1";

  const handleDeleteAccount = () => {}; 

  return (
    <div
      className="fixed inset-0 z-50 flex-center bg-black/50 p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-lg p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 cursor-pointer text-black/50 hover:text-black transition-colors duration-200"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col gap-4 flex-center">
          <div className="flex-center w-16 h-16 bg-red-500/20 rounded-full text-red-500">
            <TriangleAlert size={32} />
          </div>
          <h1 className="text-2xl font-bold">Delete your account?</h1>
        </div>
        <div className="bg-red-500/20 rounded-lg p-3 border border-red-400 flex flex-col gap-2">
          <div className="flex gap-3 text-red-500 items-center font-semibold">
            <CircleAlert size={22} />
            <h2>This action is permanent</h2>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black/60 text-sm">
              Your profile, interview history, interview results, and account
              will be permanently deleted. This action cannot be undone.
            </p>
          </div>
        </div>
        <form className="flex flex-col" onSubmit={handleDeleteAccount}>
          <label htmlFor="delete_confirmation" className={labelStyle}>
            Type <strong className="text-red-500">DELETE</strong> to confirm
          </label>
          <input
            type="text"
            name="delete_confirmation"
            id="delete_confirmation"
            className={inputStyle}
            onChange={(e) => setDeleteConfimation(e.target.value)}
          />
          <p className={helperText}>
            Enter DELETE exactly as shown. This is case-sensitive.
          </p>
          <label htmlFor="password" className={labelStyle}>
            Confirm your password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={inputStyle}
              onChange={(e) => setPasword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer">{showPassword ? <EyeOff/> : <Eye/>}</button>
          </div>
          <p className={helperText}>
            Required to verify that you own this account.
          </p>
        </form>
        <div className="w-full flex gap-4">
          <button
            onClick={onClose}
            type="button"
            className="bg-yellow-300 border font-semibold rounded py-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-200 ease-in-out w-1/3"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canDelete}
            className={`${canDelete ? "hover:bg-white hover:text-red-500 cursor-pointer" : "cursor-not-allowed"} py-2 transition-all duration-200 ease-in-out flex gap-3 w-2/3 justify-center border font-semibold rounded bg-red-500 text-white`}
          >
            <Trash /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
