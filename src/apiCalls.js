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

// get posts by page and category
export const getAllPosts = (data) => {
  return fetch("/api/all-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// get banners
export const getBanners = () => {
  return fetch("/api/banners", {
    method: "GET",
  });
};

// get post by id and all categories
export const getPostById = (id) => {
  return fetch(`/api/post/${id}`, {
    method: "GET",
  });
};

// update post
export const updatePost = (data) => {
  return fetch("/api/post", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// change post visibility
export const changePostVisibility = (body) => {
  return fetch(`/api/post/${body.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

// delete post
export const deletePost = (id) => {
  return fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
};
