import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Navigate } from "react-router-dom";

export default function Wrapper({children}) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {data: {session}} = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  if (session) {
    return <>{children}</>
  }

  return <Navigate to="/login"/>
}