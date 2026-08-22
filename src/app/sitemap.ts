import type { MetadataRoute } from "next";
import { business } from "@/data/business";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/order", "/contact"];

  return routes.map((route, index) => ({
    url: `${business.siteUrl}${route}`,
    changeFrequency: route === "/menu" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/menu" ? 0.9 : 0.8,
  }));
}
