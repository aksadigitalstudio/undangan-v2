import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/preview", "/login", "/pricing"],
      },
    ],
    sitemap: "https://aksadigitalstudio.com/sitemap.xml",
    host: "https://aksadigitalstudio.com",
  };
}
