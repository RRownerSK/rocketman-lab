import type { Metadata } from "next";
import {
  Fira_Sans,
  Saira_Semi_Condensed,
  Roboto,
} from "next/font/google";

import CookieConsent from "./components/CookieConsent";
import PricingCalculator from "./components/PricingCalculator";
import ScrollToTop from "./components/ScrollToTop";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  ORGANIZATION_JSON_LD,
  SITE_NAME,
  SITE_URL,
  shareMetadata,
} from "./seo";
import "./globals.css";
import "./scene-system.css";

const firaSans = Fira_Sans({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const saira = Saira_Semi_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  /*
    Required for the social image to resolve: without it Next falls back to
    http://localhost:3000 in a non-Vercel production build and the card
    silently points at nothing. It also turns every relative canonical and
    openGraph url below into an absolute one.
  */
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  ...shareMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      globals.css sets scroll-behavior: smooth. Since Next 16 that also
      applies to route changes unless this attribute opts back into the
      instant jump, so going / → /kontakt would crawl up the whole page.
    */
    <html lang="sk" data-scroll-behavior="smooth">
      <body
        className={`${firaSans.variable} ${saira.variable} ${roboto.variable}`}
      >
        {/*
          Organization structured data. "<" is escaped so no string in the
          payload can close the script tag early (Next's JSON-LD guidance).
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <ScrollToTop />
        <PricingCalculator />
        <CookieConsent />
      </body>
    </html>
  );
}