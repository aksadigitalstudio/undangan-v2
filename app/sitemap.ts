import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aksadigitalstudio.com";
  const templateUrls = ["template-001", "template-002", "template-003", "template-004", "template-005", "template-006", "template-007", "template-008"].map((templateId) => ({
    url: `${baseUrl}/templates/${templateId}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...templateUrls,
  ];
}
