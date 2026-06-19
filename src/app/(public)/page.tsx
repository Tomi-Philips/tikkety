import Navbar from "@/components/layout/navbar";

import HeroSection from "@/components/landing/hero-section";
import ProblemSection from "@/components/landing/problem-section";
import WhyTikketySection from "@/components/landing/why-tikkety-section";
import OrganizerSection from "@/components/landing/organizer-section";
import AttendeeSection from "@/components/landing/attendee-section";
import VendorSection from "@/components/landing/vendor-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import AnalyticsPreviewSection from "@/components/landing/analytics-preview-section";
import TestimonialSection from "@/components/landing/testimonial-section";
import FAQSection from "@/components/landing/faq-section";
import CTASection from "@/components/landing/cta-section";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-blue-200">
      <Navbar />

      <HeroSection />

      <ProblemSection />

      <WhyTikketySection />

      <OrganizerSection />

      <AttendeeSection />

      <VendorSection />

      <HowItWorksSection />

      <AnalyticsPreviewSection />

      <TestimonialSection />

      <FAQSection />

      <CTASection />

      <Footer />
    </main>
  );
}