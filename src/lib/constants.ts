export const AUTHENTICATION_COOKIE = "Authentication";
export const GENERIC_ERROR = "Something went wrong. Please try again.";

export type RouteVisibility = "public" | "auth" | "guest";

export type NavRoute = {
  title: string;
  path: string;
  visibility: RouteVisibility;
};

export const navRoutes: NavRoute[] = [
  { title: "Home", path: "/", visibility: "auth" },
];

export const guestOnlyPaths = ["/login", "/signup"];
