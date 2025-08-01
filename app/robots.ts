import envConfig from "@/config/envConfig";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/me/",
    },
    sitemap: `${envConfig.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}
