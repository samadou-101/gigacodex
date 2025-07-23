import Header from "@/components/pages/home/Header";
import Hero from "@/components/pages/home/Hero";
import Features from "@/components/pages/home/Features";
import HowItWorks from "@/components/pages/home/HowItWorks";
import CTA from "@/components/pages/home/CTA";
import Footer from "@/components/pages/home/Footer";

export default function ModernGigaCodeX() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
