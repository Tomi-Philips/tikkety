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
    color: "text-violet-600 bg-violet-50 border-violet-100",
    title: "Exclusive Early Access",
    desc: "Be the first to use every new feature and platform upgrade before public release.",
  },
  {
    icon: Zap,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    title: "Revenue Sharing",
    desc: "Earn a referral commission on every organizer or attendee you bring to the platform.",
  },
  {
    icon: Star,
    color: "text-amber-600 bg-amber-50 border-amber-100",
    title: "Verified Badge",
    desc: "Get a Tikkety Ambassador badge on your public profile, building credibility in your community.",
  },
  {
    icon: Users,
    color: "text-blue-600 bg-blue-50 border-blue-100",
    title: "Insider Community",
    desc: "Join a private group of campus leaders, event creators, and platform builders shaping Tikkety.",
  },
  {
    icon: Globe2,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    title: "Campus Leadership",
    desc: "Represent Tikkety at your institution and become the go-to for event ticketing on campus.",
  },
  {
    icon: BadgeCheck,
    color: "text-rose-600 bg-rose-50 border-rose-100",
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
        <section className="relative pt-36 pb-24 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-100/50 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-100/40 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Ambassador Program · Founding Cohort
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              Be the Face of Tikkety{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                on Your Campus
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto">
              We're building a network of passionate campus leaders and event creators to grow
              Tikkety across Nigeria. If you love events and want early access, perks, and a seat
              at the table — this is for you.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-4 text-white font-bold shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Apply to Be an Ambassador
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-zinc-200 bg-white px-7 py-4 font-bold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200"
              >
                Learn About Tikkety
              </Link>
            </div>

            {/* Trust line */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-semibold text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Founding Cohort Open
              </div>
              <div>•</div>
              <div>Paid Commission Structure</div>
              <div>•</div>
              <div>Nigeria-wide Program</div>
            </div>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="py-24 bg-zinc-50 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs">
                Ambassador Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 mt-3 tracking-tight">
                What You Get as an Ambassador
              </h2>
              <p className="text-zinc-500 mt-4 text-base font-medium leading-relaxed">
                Being a Tikkety Ambassador comes with real value — not just a title.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PERKS.map((perk, idx) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl border border-zinc-200/80 p-8 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl border ${perk.color} mb-5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                      {perk.title}
                    </h3>
                    <p className="text-zinc-500 text-sm font-medium mt-2 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Ready to Represent Tikkety?
            </h2>
            <p className="text-zinc-500 mt-4 text-base font-medium leading-relaxed">
              Create a free account and join the founding ambassador cohort.
              Limited spots — first come, first served.
            </p>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-bold shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
