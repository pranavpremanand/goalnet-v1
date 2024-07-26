// export const baseUrl = "http://localhost:3000";

// api instance
const api = (url, method, data) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// login
export const login = (data) => {
  return api("/api/auth/login", "POST", data);
};

// logout
export const logout = () => {
  return api("/api/auth/logout", "GET");
};
