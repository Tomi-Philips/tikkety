import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ArrowRight, Star, Users, Zap, Gift, Globe2, BadgeCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassadors — Tikkety",
  description:
    "Join the Tikkety Ambassador Program. Help shape the future of event ticketing in Africa and earn rewards for growing the community.",
};

const PERKS = [
  {
    icon: Gift,
    title: "Exclusive Early Access",
    desc: "Be the first to use every new feature and platform upgrade before public release.",
  },
  {
    icon: Zap,
    title: "Revenue Sharing",
    desc: "Earn a referral commission on every organizer or attendee you bring to the platform.",
  },
  {
    icon: Star,
    title: "Verified Badge",
    desc: "Get a Tikkety Ambassador badge on your public profile, building credibility in your community.",
  },
  {
    icon: Users,
    title: "Insider Community",
    desc: "Join a private group of campus leaders, event creators, and platform builders shaping Tikkety.",
  },
  {
    icon: Globe2,
    title: "Campus Leadership",
    desc: "Represent Tikkety at your institution and become the go-to for event ticketing on campus.",
  },
  {
    icon: BadgeCheck,
    title: "Priority Support",
    desc: "Direct line to the Tikkety team — your feedback shapes the product roadmap.",
  },
];

export default function AmbassadorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="relative pt-36 pb-20 overflow-hidden bg-white">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Ambassador Program · Founding Cohort
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Be the Face of Tikkety{" "}
              <span className="text-blue-700">
                on Your Campus
              </span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
              We're building a network of passionate campus leaders and event creators to grow
              Tikkety across Nigeria. If you love events and want early access, perks, and a seat
              at the table — this is for you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Apply to Be an Ambassador
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Learn About Tikkety
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Founding Cohort Open
              </div>
              <span className="text-gray-300">•</span>
              <div>Paid Commission Structure</div>
              <span className="text-gray-300">•</span>
              <div>Nigeria-wide Program</div>
            </div>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <span className="text-blue-600 font-semibold uppercase tracking-wider text-xs">
                Ambassador Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
                What You Get as an Ambassador
              </h2>
              <p className="text-gray-500 mt-3 text-base leading-relaxed">
                Being a Tikkety Ambassador comes with real value — not just a title.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PERKS.map((perk, idx) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-colors"
                  >
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to Represent Tikkety?
            </h2>
            <p className="text-gray-500 mt-3 text-base leading-relaxed">
              Create a free account and join the founding ambassador cohort.
              Limited spots — first come, first served.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 mt-7 rounded-xl bg-blue-600 px-7 py-3.5 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}