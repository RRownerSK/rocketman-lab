import type { Metadata } from "next";

/*
  One source for everything search engines and share cards read: the root
  layout, each page's metadata, the sitemap, robots and the JSON-LD all pull
  from here, so the domain or a phone number only ever changes in one place.
*/

export const SITE_URL = "https://rocketman.digital";
export const SITE_NAME = "Rocketman";
export const DEFAULT_TITLE = "Rocketman – digitálne štúdio";
export const DEFAULT_DESCRIPTION =
  "Rocketman je digitálne štúdio pre web, marketing, branding a consulting. Navrhujeme weby, e-shopy a kampane pre značky, ktoré chcú rásť.";

export const CONTACT_EMAIL = "info@rocketman.digital";
export const CONTACT_PHONE = "+421 917 746 172";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: DEFAULT_TITLE,
};

type PageSeo = {
  /* The full title as it should read in a share card (no template). */
  title: string;
  description: string;
  /* Route path, e.g. "/" or "/kontakt". */
  path: string;
};

/*
  A page's openGraph / twitter blocks replace the layout's wholesale rather
  than merging with them, so every page has to restate the image, site name
  and locale — this keeps that in one place. The canonical stays with each
  page on purpose: set here, the layout would hand "/" to every route that
  forgets its own.
*/
export function shareMetadata({ title, description, path }: PageSeo) {
  return {
    openGraph: {
      type: "website",
      locale: "sk_SK",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  } satisfies Metadata;
}

/*
  schema.org Organization for the root layout. Organization rather than
  LocalBusiness: the latter wants a street address, which the site does not
  publish. sameAs (social profiles) is left out until the real profile URLs
  exist — the /kontakt icons still point at "#".
*/
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/rocketman-logo.svg`,
  description: DEFAULT_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  founder: { "@type": "Person", name: "Filip Bajtoš" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    areaServed: "SK",
    availableLanguage: "sk",
  },
};
