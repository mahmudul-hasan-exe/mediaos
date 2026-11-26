import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/super-admin/", "/api/"],
    },
    sitemap: "https://mediaos.io/sitemap.xml",
  };
}

