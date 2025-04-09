import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/search",
    "/empty-legs",
    "/empty-legs/(.*)",
    "/api/flights",
    "/api/empty-legs",
    "/how-it-works",
    "/about",
    "/contact",
  ],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
