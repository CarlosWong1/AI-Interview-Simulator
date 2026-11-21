import { supabase } from "./supabase.js";

export const authenticatedFetch = async (url, options = {}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${session.access_token}`
    }
  });

  return response
};
