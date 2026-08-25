import type { Metadata } from "next";
import "./globals.css";
import BackToHome from "@/components/BackToHome";

export const metadata: Metadata = {
  title: {
    default: "AKSA Digital Studio",
    template: "%s | AKSA Digital Studio",
  },
  description:
    "Platform undangan digital modern dengan RSVP online, galeri foto, countdown, peta lokasi, dan gift registry.",
applicationName: "AKSA Digital Studio",

metadataBase: new URL("https://aksadigitalstudio.com"),
  keywords: [
    "Undangan Digital",
    "Undangan Pernikahan",
    "Wedding Invitation",
    "RSVP Online",
    "AKSA Digital Studio",
  ],
  authors: [
    {
      name: "AKSA Digital Studio",
    },
  ],
openGraph: {
  title: "AKSA Digital Studio",
  description:
    "Platform undangan digital modern dengan RSVP online, galeri foto, countdown, peta lokasi, dan gift registry.",
  url: "https://aksadigitalstudio.com",
  siteName: "AKSA Digital Studio",
  locale: "id_ID",
  type: "website",
},
twitter: {
  card: "summary_large_image",
  title: "AKSA Digital Studio",
  description:
    "Platform undangan digital modern dengan RSVP online, galeri foto, countdown, peta lokasi, dan gift registry.",
},
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><BackToHome />{children}</body>
    </html>
  );
}
