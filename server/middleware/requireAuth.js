import { getSupabaseAdmin } from "../lib/supabaseAdmin.js";

export const createRequireAuth = (getAdminClient) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.replace("Bearer ", "");

      if (token.trim() === "") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const supabaseAdmin = getAdminClient();

      const { data, error } = await supabaseAdmin.auth.getUser(token);

      const user = data?.user;

      if (!user || error) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};

export const requireAuth = createRequireAuth(getSupabaseAdmin);