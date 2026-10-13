import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

const inputStyle =
  "h-12 w-full rounded-[10px] border border-[#e4e5df] bg-[#f8f8f6] px-3.5 pr-11 text-sm text-[#20221f] outline-none transition-colors focus:border-[#dab628] focus:bg-white";

function PasswordField({
  label,
  id,
  value,
  onChange,
  autoComplete = "new-password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex min-w-0 w-full flex-col items-start gap-2.5">
      <label htmlFor={id} className="text-sm font-medium leading-normal text-[#20221f]">
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={inputStyle}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-[#686b64] transition-colors hover:text-[#20221f]"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

export default function PasswordSecurity({
  currentPassword,
  newPassword,
  confirmPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) {
  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start">
      {/* Section introduction */}
      <div className="flex w-full flex-col items-start gap-3 pt-1 lg:w-[280px] lg:shrink-0">
        <span className="flex-center size-10 rounded-[10px] bg-[#fffbe9]">
          <LockKeyhole size={20} color="#20221f" />
        </span>
        <h2 className="text-xl font-semibold leading-normal text-[#20221f]">
          Change Password
        </h2>
        <p className="text-sm leading-[1.6] text-[#686b64]">
          Keep your account protected with a password that&apos;s unique to
          PrepFlow.
        </p>
      </div>

      {/* Password card */}
      <form
        className="flex min-w-0 flex-1 flex-col rounded-2xl border border-[#e4e5df] bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex w-full flex-col items-start gap-6 p-7">
          <PasswordField
            label="Verify current password"
            id="current_password"
            value={currentPassword}
            onChange={(e) => onCurrentPasswordChange(e.target.value)}
            autoComplete="current-password"
          />
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:gap-5">
            <PasswordField
              label="New password"
              id="new_password"
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
            />
            <PasswordField
              label="Confirm password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-4 border-t border-[#e4e5df] px-7 py-5">
          <p className="text-[13px] leading-normal text-[#686b64]">
            Enter your current password to set a new one.
          </p>
          <button
            type="submit"
            className="flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#f4ce38] bg-[#f4ce38] px-[18px] text-sm font-semibold text-[#20221f] transition-all duration-200 hover:brightness-95 active:scale-[0.99]"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
