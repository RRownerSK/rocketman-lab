import type { Metadata } from "next";
import {
  Fira_Sans,
  Saira_Semi_Condensed,
  Roboto,
} from "next/font/google";

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

const SITE_URL = "https://rocketman.digital";
const TITLE = "Rocketman — digital studio";
const DESCRIPTION =
  "Web, marketing a digitálne riešenia pre značky, ktoré nechcú zostať stáť na mieste.";

const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: TITLE,
};

export const metadata: Metadata = {
  /*
    Required for the social image to resolve: without it Next falls back to
    http://localhost:3000 in a non-Vercel production build and the card
    silently points at nothing.
  */
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: SITE_URL,
    siteName: "Rocketman",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
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
        {children}
      </body>
    </html>
  );
}