export { auth as middleware } from "@/auth";
import { auth } from "@/auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./route";

export default auth((req) => {
  const { nextUrl } = req;
  console.log("nextUrl", nextUrl);

  const isLogged = !!req.auth;
  console.log("isLogged", isLogged);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLogged) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT));
    }
    return null;
  }

  if (!isLogged && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});
