let rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

// Auto-fallback from old project-4 to active project-3 on Render
if (rawUrl.includes("gym-management-system-group-project-4")) {
  rawUrl = rawUrl.replace("gym-management-system-group-project-4", "gym-management-system-group-project-3");
}

// Clean trailing slashes
let cleanUrl = rawUrl.replace(/\/+$/, "");

// If the URL doesn't end with /api, append /api
if (!cleanUrl.endsWith("/api")) {
  cleanUrl = `${cleanUrl}/api`;
}

export const API_BASE_URL = cleanUrl;
