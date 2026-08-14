import Navbar from "../components/layout/Navbar.jsx";
import Hero from "../components/landing/Hero.jsx";
import Features from "../components/landing/Features.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import AdaptiveLearning from "../components/landing/AdaptiveLearning.jsx";
import AnalyticsPreview from "../components/landing/AnalyticsPreview.jsx";
import CTA from "../components/landing/CTA.jsx";
import Footer from "../components/layout/Footer.jsx";
import DashboardPreview from "../components/landing/DashboardPreview.jsx";


function LandingPage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <AdaptiveLearning />
                <AnalyticsPreview />
                <CTA />
                <DashboardPreview />
            </main>
            <Footer /> 
        </>
    );
}

export default LandingPage;