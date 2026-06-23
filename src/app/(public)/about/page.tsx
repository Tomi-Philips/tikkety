import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  AboutHero,
  MissionVision,
  CoreValues,
  Ecosystem,
  AboutCTA,
} from "@/components/about/about-sections";

export const metadata: Metadata = {
  title: "About Us — Tikkety",
  description:
    "Learn about Tikkety — our mission, vision, and core values to build a secure, connected, and fraud-free event ticket and vendor booking ecosystem in Africa.",
  keywords: [
    "about Tikkety",
    "event ticketing Africa",
    "secure ticket validation",
    "event vendor hiring",
    "Tikkety team",
    "Tikkety mission",
  ],
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <AboutHero />
        <MissionVision />
        <CoreValues />
        <Ecosystem />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
