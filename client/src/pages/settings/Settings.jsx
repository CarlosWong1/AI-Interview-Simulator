import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import LoadingState from "../../components/LoadingState";
import EmailVerificationModal from "../../components/modal/EmailVerificationModal";
import PasswordChangeSuccessModal from "../../components/modal/PasswordChangeSuccessModal";
import DeleteAccountConfirmationModal from "../../components/modal/DeleteAccountConfirmationModal";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyCurrentPassword, setVerifyCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [editingPassword, setEditingPassword] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setFullName(user.user_metadata.full_name);
      setEmail(user.email);
    };
    getUser();
  }, []);

  if (!user) {
    return <LoadingState></LoadingState>;
  }

  const handleEditingProfile = () => {
    if (!editingProfile) {
      setEditingProfile(true);
      return;
    }
  }

  const handleCancel = () => {
    setFullName(user.user_metadata.full_name);
    setEmail(user.email);
    setPendingEmail("");
    setEditingProfile(false);
  }

  const handleSave = async () => {
    if (fullName !== user.user_metadata.full_name) {
      const {error} = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
        }
      });

      if (error) {
        console.error(error.message);
        return;
      }
    }

    if (email !== user.email) {
      console.log("Current:", user.email);
      console.log("New:", email);

      const { data, error } = await supabase.auth.updateUser({
        email,
      });

      console.log(data);
      console.log(error);

      if (error) {
        console.error(error.message);
        return;
      }

      setPendingEmail(email);
      setShowVerifyModal(true);
    }

    setEditingProfile(false);
  }

  const handleChangePassword = () => {
    if (!editingPassword) {
      setEditingPassword(true);
      return;
    }
  }

  const handlePasswordCancel = () => {
    setVerifyCurrentPassword("");
    setNewPassword("");
    setVerifyNewPassword("");
    setEditingPassword(false);
  }

  const handlePasswordSave = async () => {
    if (!verifyCurrentPassword) {
      return;
    }

    if (!newPassword) {
      return;
    }

    if (!verifyNewPassword) {
      return;
    }

    if (newPassword === verifyCurrentPassword) {
      return;
    }

    if (newPassword !== verifyNewPassword) {
      return;
    }

    const {error} = await supabase.auth.updateUser({
      password: newPassword,
      current_password: verifyCurrentPassword
    });

    if (error) {
      console.error(error.message);
      return;
    }
    setShowPasswordChangeModal(true);
    setVerifyCurrentPassword("");
    setNewPassword("");
    setVerifyNewPassword("");
    setEditingPassword(false);
  }

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(true);
  }

  const dateToString = new Date(user.created_at);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const profileHeadingStyle = "font-bold text-2xl";
  const labelStyle = "text-black/60 font-semibold text-sm";
  const inputStyle = "bg-gray-100 p-3 rounded border border-gray-300 mb-1 w-full";
  const buttonStyle = "bg-yellow-300 ml-auto border font-semibold rounded px-3 py-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-200 ease-in-out";
  const redButtonStyle = "ml-auto border border-red-500 rounded py-1 px-3 font-semibold text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out";
  const eyeToggleStyle = `${editingPassword ? "hover:text-black cursor-pointer" : ""} absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 `;

  return (
    <div className="flex flex-col min-h-full py-10 mx-auto w-full md:w-3/4 px-5 gap-10">
      <div className="w-full">
        <h1 className="text-3xl font-bold md:text-5xl">Account Settings</h1>
        <p className="md:text-2xl md:mt-2">
          Manage your PrepFlow account and your notifications and alerts.
        </p>
      </div>
      <div className="w-full bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] rounded py-5 px-7 flex flex-col gap-3">
        <div className="flex-center mb-1">
          <h1 className={profileHeadingStyle}>Profile Information</h1>
          <div className="flex ml-auto gap-2">
            {editingProfile ? (
              <>
                <button onClick={handleSave} className={buttonStyle} type="button">Save Changes</button>
                <button onClick={handleCancel} className={redButtonStyle} type="button">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={handleEditingProfile} className={buttonStyle} type="button">Edit Account</button>
              </>
            )}
          </div>
        </div>
        <form className="flex flex-col gap-1">
          <label htmlFor="full_name" className={`${labelStyle} ${editingProfile ? "text-black/80" : ""}`}>
            FULL NAME
          </label>
          <input
            type="text"
            name="full_name"
            id="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`${inputStyle} ${editingProfile ? "" : "text-black/50"}`}
            disabled={!editingProfile}
          />
          <label htmlFor="email" className={`${labelStyle} ${editingProfile ? "text-black/80" : ""}`}>
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${inputStyle} ${editingProfile ? "" : "text-black/50"}`}
            disabled={!editingProfile}
          />
          <label htmlFor="created_at" className={`${labelStyle} ${editingProfile ? "text-black/80" : ""}`}>
            MEMBER SINCE
          </label>
          <input
            type="text"
            name="created_at"
            id="created_at"
            value={`${dateToString.toLocaleDateString("en-GB", options)}`}
            className={`${inputStyle} ${editingProfile ? "" : "text-black/50"}`}
            disabled
          />
        </form>
        <div className="border-b my-4 border-gray-300"></div>
        <div className="flex-center mb-1">
          <h1 className={profileHeadingStyle}>Change Password</h1>
          <div className="flex ml-auto gap-2">
            {editingPassword ? (
              <>
                <button onClick={handlePasswordSave} className={buttonStyle} type="button">Save Changes</button>
                <button onClick={handlePasswordCancel} className={redButtonStyle} type="button">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={handleChangePassword} className={buttonStyle} type="button">Change Password</button>
              </>
            )}
          </div>
        </div>
        <form className="flex flex-col gap-1">
          <label htmlFor="current_password" className={`${labelStyle} ${editingPassword ? "text-black/80" : ""}`}>
            VERIFY CURRENT PASSWORD
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="current_password"
              id="current_password"
              value={verifyCurrentPassword}
              onChange={(e) => setVerifyCurrentPassword(e.target.value)}
              className={inputStyle}
              disabled={!editingPassword}
            />
            <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className={eyeToggleStyle} disabled={!editingPassword}>{showCurrentPassword ? <EyeOff/> : <Eye/>}</button>
          </div>
          <label htmlFor="new_password" className={`${labelStyle} ${editingPassword ? "text-black/80" : ""}`}>
            NEW PASSWORD
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="new_password"
              id="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputStyle}
              disabled={!editingPassword}
            />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className={eyeToggleStyle} disabled={!editingPassword}>{showNewPassword ? <EyeOff/> : <Eye/>}</button>
          </div>
          <label htmlFor="confirm_password" className={`${labelStyle} ${editingPassword ? "text-black/80" : ""}`}>
            CONFIRM PASSWORD
          </label>
          <div className="relative">
            <input
              type={showVerifyPassword ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              value={verifyNewPassword}
              onChange={(e) => setVerifyNewPassword(e.target.value)}
              className={inputStyle}
              disabled={!editingPassword}
            />
            <button type="button" onClick={() => setShowVerifyPassword(!showVerifyPassword)} className={eyeToggleStyle} disabled={!editingPassword}>{showVerifyPassword ? <EyeOff/> : <Eye/>}</button>
          </div>
        </form>
        <div className="border-b my-4 border-gray-300"></div>
        <h1 className={`${profileHeadingStyle} text-red-500`}>Danger Zone</h1>
        <div className="flex">
          <p className="w-2/3 text-sm text-black/70">
            Permanently delete account metrics, progress statistics, and
            credentials.
          </p>
          <button className={redButtonStyle} onClick={handleDeleteAccount} type="button">
            Delete Account
          </button>
        </div>
      </div>

      {showVerifyModal && (
        <EmailVerificationModal
          email={pendingEmail}
          onClose={() => setShowVerifyModal(false)}
        />
      )}

      {showPasswordChangeModal && (
        <PasswordChangeSuccessModal
          onClose={() => setShowPasswordChangeModal(false)}
        />
      )}

      {showDeleteAccountModal && (
        <DeleteAccountConfirmationModal
          onClose={() => setShowDeleteAccountModal(false)}
        />
      )} 
    </div>
  );
}
