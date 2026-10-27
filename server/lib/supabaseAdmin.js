import dotenv from "dotenv";
dotenv.config();

import { createClient } from '@supabase/supabase-js'

let supabaseAdmin

export function getSupabaseAdmin() {
  if (supabaseAdmin) {
    return supabaseAdmin;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("SupabaseAdmin credentials missing");
  }
  supabaseAdmin =  createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth:{
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    }
  });

  return supabaseAdmin;
}