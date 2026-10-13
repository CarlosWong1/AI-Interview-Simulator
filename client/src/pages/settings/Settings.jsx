import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import LoadingState from "../../components/LoadingState";
import EmailVerificationModal from "../../components/modal/EmailVerificationModal";
import PasswordChangeSuccessModal from "../../components/modal/PasswordChangeSuccessModal";
import DeleteAccountConfirmationModal from "../../components/modal/DeleteAccountConfirmationModal";
import SettingsIntroduction from "./SettingsIntroduction";
import ProfileInformation from "./ProfileInformation";
import PasswordSecurity from "./PasswordSecurity";
import DangerZone from "./DangerZone";

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
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

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

  return (
    <div className="flex flex-col min-h-full py-10 mx-auto w-full md:w-3/4 max-w-6xl px-5 gap-10">
      <SettingsIntroduction />
      <ProfileInformation
        fullName={fullName}
        email={email}
        memberSince={dateToString.toLocaleDateString("en-GB", options)}
        editing={editingProfile}
        onEdit={handleEditingProfile}
        onSave={handleSave}
        onCancel={handleCancel}
        onFullNameChange={setFullName}
        onEmailChange={setEmail}
      />
      <PasswordSecurity
        currentPassword={verifyCurrentPassword}
        newPassword={newPassword}
        confirmPassword={verifyNewPassword}
        onCurrentPasswordChange={setVerifyCurrentPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setVerifyNewPassword}
        onSubmit={handlePasswordSave}
      />
      <DangerZone onDelete={handleDeleteAccount} />

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
          email={user.email}
          onClose={() => setShowDeleteAccountModal(false)}
        />
      )} 
    </div>
  );
}
