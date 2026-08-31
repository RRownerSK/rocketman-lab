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

export const metadata: Metadata = {
  title: "Rocketman — digital studio",
  description:
    "Web, marketing a digitálne riešenia pre značky, ktoré nechcú zostať stáť na mieste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body
        className={`${firaSans.variable} ${saira.variable} ${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  );
}