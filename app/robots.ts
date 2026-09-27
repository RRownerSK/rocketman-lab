import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

/*
  Everything may be crawled. Pages that should stay out of the index (the
  scene demo) say so with their own robots meta instead of a disallow here:
  a crawler has to be able to fetch a page to see its noindex.
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
