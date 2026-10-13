import { CalendarDays, Pencil, UserRound } from "lucide-react";

const inputStyle =
  "h-11 w-full rounded-[10px] border border-[#e4e5df] bg-white px-3.5 text-sm text-[#20221f] outline-none transition-colors focus:border-[#dab628]";

const yellowButtonStyle =
  "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#f4ce38] bg-[#f4ce38] px-[18px] text-sm font-semibold text-[#20221f] transition-all duration-200 hover:brightness-95 active:scale-[0.99]";

function Detail({ label, value }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
      <p className="text-sm leading-normal text-[#686b64]">{label}</p>
      <p className="w-full break-words text-base leading-normal text-[#20221f]">
        {value}
      </p>
    </div>
  );
}

function EditField({ label, id, type = "text", value, onChange }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
      <label htmlFor={id} className="text-sm leading-normal text-[#686b64]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={inputStyle}
      />
    </div>
  );
}

export default function ProfileInformation({
  fullName,
  email,
  memberSince,
  editing,
  onEdit,
  onSave,
  onCancel,
  onFullNameChange,
  onEmailChange,
}) {
  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start">
      {/* Section introduction */}
      <div className="flex w-full flex-col items-start gap-3 pt-1 lg:w-[280px] lg:shrink-0">
        <span className="flex-center size-10 rounded-[10px] bg-[#fffbe9]">
          <UserRound size={20} color="#20221f" />
        </span>
        <h2 className="text-xl font-semibold leading-normal text-[#20221f]">
          Profile Information
        </h2>
        <p className="text-sm leading-[1.6] text-[#686b64]">
          Your personal details, all in one place. Update your name or email
          when you need to.
        </p>
      </div>

      {/* Profile card */}
      <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-[#e4e5df] bg-white">
        {editing ? (
          <form
            className="flex w-full flex-col gap-5 p-7 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
          >
            <EditField
              label="Full name"
              id="full_name"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
            />
            <EditField
              label="Email address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </form>
        ) : (
          <div className="flex w-full flex-col gap-8 p-7 sm:flex-row">
            <Detail label="Full name" value={fullName} />
            <Detail label="Email address" value={email} />
          </div>
        )}

        <div className="flex w-full flex-wrap items-center justify-between gap-4 border-t border-[#e4e5df] px-7 py-5">
          <div className="flex items-center gap-3">
            <CalendarDays size={20} color="#686b64" />
            <div className="flex flex-col items-start gap-1.5">
              <p className="text-[13px] leading-normal text-[#686b64]">
                Member since
              </p>
              <p className="text-sm font-medium leading-normal text-[#20221f]">
                {memberSince}
              </p>
            </div>
          </div>

          {editing ? (
            <div className="flex gap-2">
              <button type="button" onClick={onSave} className={yellowButtonStyle}>
                Save Changes
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex h-11 cursor-pointer items-center justify-center rounded-[10px] border border-[#e4e5df] bg-white px-[18px] text-sm font-semibold text-[#686b64] transition-colors duration-200 hover:bg-[#f3f4ef]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" onClick={onEdit} className={yellowButtonStyle}>
              <Pencil size={16} color="#20221f" />
              Edit Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
