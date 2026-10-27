import { getSupabaseAdmin } from "../lib/supabaseAdmin.js";
import { getSupabase } from "../lib/supabase.js";

export const deleteAccount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({error: "Unauthorized"});
    }

    const token = authHeader.replace("Bearer ", "");
    const {password} = req.body;

    if (!password) {
      return res.status(400).json({error: "Password is required"});
    }

    const supabaseAdmin = getSupabaseAdmin();
    const {data: {user}, error} = await supabaseAdmin.auth.getUser(token);

     if (error || !user) {
      return res.status(401).json({error: "Unauthorized"});
    }

    const supabase = getSupabase();
    const {error: signInError} = await supabase.auth.signInWithPassword({
      email: user.email,
      password: password
    });

    if (signInError) {
      return res.status(401).json({error: "Incorrect password"});
    }
    
    const {error: deleteError} = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      return res.status(500).json({error: deleteError.message});
    }

    return res.status(200).json({success: true, message: "account deleted successfully"});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}