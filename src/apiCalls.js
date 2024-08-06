// export const baseUrl = "http://localhost:3000";

export const fetcher = ({ url, options = {} }) =>
  fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then((res) => res.json());

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
  });
};

// update a category
export const updateCategory = (data) => {
  return fetch("/api/category", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// delete a category
export const deleteCategory = (id) => {
  return fetch(`/api/category/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// delete category and its posts
export const deleteCategoryAndPosts = (id) => {
  return fetch(`/api/category/${id}`, {
    method: "DELETE",
  });
};

// create post
export const createPost = (data) => {
  return fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get all posts
export const getPosts = () => {
  return fetch("/api/post", {
    method: "GET",
  });
};
