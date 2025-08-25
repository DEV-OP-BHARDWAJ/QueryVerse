// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // The middleware currently has no logic to run,
  // so we just pass the request through.
  // Later, you might add authentication checks here.
  return NextResponse.next()
}
 
// The matcher config stays the same.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}