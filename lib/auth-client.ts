import { createAuthClient } from "better-auth/react";
const baseURL = process.env.BASE_URL;
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: baseURL,
});
