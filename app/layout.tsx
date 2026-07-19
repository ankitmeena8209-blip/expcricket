import type { Metadata } from "next";
import "./globals.css";
import BackgroundShader from "@/components/layout/BackgroundShader";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name + " | Command Center",
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  keywords: ["Cricket Analytics", "Xpert Cricket", "EXP Cricket", "Cricket AI", "Match Prediction", "Virat Kohli Stats", "MCG Pitch Report"],
  authors: [{ name: "EXP Cricket Engineering Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name + " (Xpert Cricket)",
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen flex flex-col relative antialiased selection:bg-primary/30 selection:text-primary">
        {/* Interactive WebGL Dark Shader Background */}
        <BackgroundShader />

        {/* Responsive App Layout Container */}
        <div className="flex min-h-screen relative z-10">
          {/* Collapsible Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
            <Header />

            <main className="flex-1 p-4 lg:p-8 max-w-[1440px] w-full mx-auto pb-24 lg:pb-12">
              {children}
            </main>

            <Footer />
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <MobileNav />
      </body>
    </html>
  );
}
