// middleware.ts (Edge-safe)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Không decode ở đây vì Edge Runtime không hỗ trợ `jsonwebtoken`
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/explore", "/search", "/moderate"],
};
