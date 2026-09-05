import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AccountPage() {
  const navigation = useNavigate();

  const signOut = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) throw error;  
    navigation("/login")
  }

  return (
    <div>
      <h1>ACCOUNT PAGE</h1>
      <button onClick={signOut} className="bg-slate-200 cursor-pointer">Sign Out</button>
    </div>
  );
}