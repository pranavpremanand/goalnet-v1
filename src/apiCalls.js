// export const baseUrl = "http://localhost:3000";

// api instance
// const api = (url, method, data) => {
//   return fetch(url, {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// };

// login
export const login = (data) => {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// logout
export const logout = () => {
  return fetch("/api/auth/logout", { method: "GET" });
};

// create a new category
export const createCategory = (data) => {
  return fetch("/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get all categories
export const getCategories = () => {
  return fetch("/api/category", {
    method: "GET",
    // next: { tags: ["categories"] },
  });
};
