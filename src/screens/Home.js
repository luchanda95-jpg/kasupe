// src/screens/Home.js
import Hero from "../components/Hero";
import FeaturedVehicles from "../components/FeaturedVehicles";
import AdBanner from "../components/AdBanner";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";
import BlogSection from "../components/BlogSection";   // 👈 new

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedVehicles />
      <AdBanner />
      <Testimonial />
      <Newsletter />
      <BlogSection />   {/* 👈 blog comes right after newsletter */}
    </div>
  );
}

export default Home;
