import Header from "@/components/header";
import Hero from "@/components/hero";
import Statistics from "@/components/statistics";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <Hero />
      <Statistics />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  );
}
