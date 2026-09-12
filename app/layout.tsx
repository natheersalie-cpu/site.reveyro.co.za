import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/ModalContext";
import { DemoModal } from "@/components/DemoModal";
import { ScrollProgress } from "@/components/ScrollProgress";

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
  metadataBase: new URL("https://site.reveyro.co.za"),
  title: "Reveyro — Customers. Quotes. Invoices. All in one place.",
  description:
    "Reveyro gives small businesses simple, professional tools to manage customers, quotes, invoices and payments — without the complexity and cost of enterprise software. Start simple. Grow with Reveyro.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/reveyro-mark.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    apple: "/reveyro-mark.svg",
  },
  openGraph: {
    title: "Reveyro — Customers. Quotes. Invoices. All in one place.",
    description:
      "Reveyro gives small businesses simple, professional tools to manage customers, quotes, invoices and payments — without the complexity and cost of enterprise software. Start simple. Grow with Reveyro.",
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
        <ScrollProgress />
        <ModalProvider>
          {children}
          <DemoModal />
        </ModalProvider>
      </body>
    </html>
  );
}