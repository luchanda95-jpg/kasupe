// src/components/AdBanner.js
import "./AdBanner.css";
import { assets } from "../assets/assets";

function AdBanner() {
  const { main_car, banner_car_image } = assets;

  return (
    <section className="ad-banner-section">
      <div className="ad-banner-card">
        {/* Left text */}
        <div className="ad-banner-content">
          <h2 className="ad-banner-title">Do You Own a Luxury Car?</h2>
          <p className="ad-banner-text">
            Monetize your vehicle effortlessly by listing it on Kasupe Car Hire.
            We take care of insurance, driver verification and secure payments —
            so you can earn passive income, stress-free.
          </p>

          <button className="ad-banner-button">List your car</button>
        </div>

        {/* Right car image */}
        <div className="ad-banner-image-wrap">
          <img
            src={banner_car_image || main_car}
            alt="Luxury car"
            className="ad-banner-image"
          />
        </div>
      </div>
    </section>
  );
}

export default AdBanner;
