import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

/*
  Every public page. /scene-demo is deliberately missing: it is an internal
  test bench marked noindex, and a sitemap should only list pages that are
  meant to be indexed. Add new routes here as they ship.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
