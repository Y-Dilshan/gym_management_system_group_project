const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

// Clean trailing slashes
let cleanUrl = rawUrl.replace(/\/+$/, "");

// If the URL doesn't end with /api, append /api
if (!cleanUrl.endsWith("/api")) {
  cleanUrl = `${cleanUrl}/api`;
}

export const API_BASE_URL = cleanUrl;
