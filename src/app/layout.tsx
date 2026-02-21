import type { Metadata } from "next";
import { Inter, Poppins, Ubuntu } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Venswa Studios - Premium Social Media Marketing Agency",
    template: "%s | Venswa Studios"
  },
  description: "Venswa Studios is a premium social media marketing agency turning brands into digital experiences. We specialize in social media management, content creation, ad campaigns, and brand strategy.",
  keywords: ["social media marketing", "digital agency", "brand strategy", "content creation", "ad campaigns", "influencer marketing"],
  authors: [{ name: "Venswa Studios" }],
  creator: "Venswa Studios",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://venswastudios.com",
    title: "Venswa Studios - Premium Social Media Marketing Agency",
    description: "We turn brands into digital experiences with creative social media strategies that drive growth.",
    siteName: "Venswa Studios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venswa Studios - Premium Social Media Marketing Agency",
    description: "We turn brands into digital experiences with creative social media strategies that drive growth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${ubuntu.variable} font-sans antialiased bg-soft-white text-dark-text selection:bg-royal-blue selection:text-pure-white`}
      >
        <div className="min-h-dvh">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
