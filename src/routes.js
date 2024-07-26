/**
 * This is an array of routes that can be accessed without authentication
 */
export const publicRoutes = ["/", "/about-us", "/contact-us", "/fixtures"];

/**
 * This is an array of routes that are used for authentication.
 */
export const authRoutes = [
  "/admin/login",
];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/admin";
