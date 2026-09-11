import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/ModalContext";
import { DemoModal } from "@/components/DemoModal";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono-ff",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reveyro — Every transaction. Seen before it happens.",
  description:
    "Reveyro gives your team one control surface for customers, invoices, and permissions — watching everything that moves through your business, in real time.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/reveyro-mark.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    apple: "/reveyro-mark.svg",
  },
  openGraph: {
    title: "Reveyro — Every transaction. Seen before it happens.",
    description:
      "Reveyro gives your team one control surface for customers, invoices, and permissions — watching everything that moves through your business, in real time.",
    url: "https://site.reveyro.co.za",
    siteName: "Reveyro",
    images: [
      {
        url: "/reveyro-mark.svg",
        width: 512,
        height: 512,
        alt: "Reveyro",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-screen flex flex-col">
        <ModalProvider>
          {children}
          <DemoModal />
        </ModalProvider>
      </body>
    </html>
  );
}
