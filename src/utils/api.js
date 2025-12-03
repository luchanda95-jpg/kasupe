// src/utils/api.js

// ✅ Single source of truth for your backend URL
export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://kasuper-server-84g2.onrender.com");

// Simple wrapper for public API calls
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  return res;
}
