import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import WhyInvest from '../components/landing/WhyInvest'
import Learn from '../components/landing/Learn'
import HowItWorks from '../components/landing/HowItWorks'
import FAQ from '../components/landing/FAQ'
import CTA from '../components/landing/CTA'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WhyInvest />
        <Learn />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
