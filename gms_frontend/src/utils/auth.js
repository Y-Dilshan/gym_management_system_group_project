import { jwtDecode } from "jwt-decode";

export const getValidAuth = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!token || !userString) {
    return { isLogged: false, user: null };
  }

  try {
    const decoded = jwtDecode(token);
    // Check if token is expired (exp is in seconds)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { isLogged: false, user: null };
    }
    const user = JSON.parse(userString);
    return { isLogged: true, user };
  } catch (e) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { isLogged: false, user: null };
  }
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
