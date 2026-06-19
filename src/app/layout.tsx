import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/auth-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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
      <body className={dmSans.className} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
