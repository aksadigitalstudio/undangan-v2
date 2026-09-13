import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/preview"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Existing invitation records may still reference the pre-optimization PNG
  // paths. Keep those old links working while serving their WebP replacements
  // instead, without querying Supabase for a static asset request.
  if (pathname.endsWith(".png")) {
    if (pathname !== "/icon.png" && pathname !== "/apple-icon.png") {
      const optimizedAssetUrl = request.nextUrl.clone();
      optimizedAssetUrl.pathname = pathname.replace(/\.png$/, ".webp");
      return NextResponse.rewrite(optimizedAssetUrl);
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: claims } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(claims?.claims?.sub);
  const { search } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isAuthenticated && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && pathname === "/login") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|jpg|jpeg|gif|webp)$).*)"],
};
