import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/auth-provider";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Tikkety",
  description: "Discover, book, and enjoy unforgettable experiences with Tikkety – your go-to platform for concerts, festivals, conferences, and exclusive events.",
  keywords: ["events", "tickets", "book", "concerts", "festivals", "conferences", "exclusive events", "Tikkety", "event booking", "event tickets"],
  icons: {
    icon: [
      {
        url: "/tikkety-icon.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
