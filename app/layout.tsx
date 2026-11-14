import type { Metadata } from "next";
import "./tailwind-compiled.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKYNET DIGITAL | Agence Digitale & Créative — Donnez vie à vos idées",
  description: "Agence créative et technologique de référence : création de sites web, applications mobiles, production vidéo cinématique et formation en IA.",
  icons: {
    icon: "/brand/logo-s-ribbon.png",
    apple: "/brand/logo-s-ribbon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#07060b] text-[#f1f3f9] selection:bg-[#b13257]/40 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
