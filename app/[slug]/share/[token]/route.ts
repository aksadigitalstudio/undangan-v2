import { NextRequest, NextResponse } from "next/server";

// Keep the public link branded with the couple's slug while the lightweight
// share endpoint supplies the crawler-only Open Graph document.
export function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  return params.then(({ token }) => {
    const destination = new URL(`/share/${token}`, request.url);
    destination.search = request.nextUrl.search;
    return NextResponse.redirect(destination, 307);
  });
}
