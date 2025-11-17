// src/components/Hero.js
import "./Hero.css";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        {/* Heading */}
        <h1 className="hero-heading">Luxury cars on Rent</h1>

        {/* Search card */}
        <div className="hero-search-card">
          {/* Pickup location */}
          <div className="hero-field hero-field-divider">
            <span className="hero-field-label">Pickup Location ▾</span>
            <span className="hero-field-value hero-muted">
              Please select location
            </span>
          </div>

          {/* Pickup date */}
          <div className="hero-field hero-field-divider">
            <span className="hero-field-label">Pick-up Date</span>
            <div className="hero-field-inline">
              <span className="hero-field-value hero-muted">dd/mm/yyyy</span>
              <img
                src={assets.calendar_icon_colored}
                alt="Calendar"
                className="hero-icon"
              />
            </div>
          </div>

          {/* Return date */}
          <div className="hero-field hero-field-divider">
            <span className="hero-field-label">Return Date</span>
            <div className="hero-field-inline">
              <span className="hero-field-value hero-muted">dd/mm/yyyy</span>
              <img
                src={assets.calendar_icon_colored}
                alt="Calendar"
                className="hero-icon"
              />
            </div>
          </div>

          {/* Search button */}
          <button className="hero-search-button">
            <img
              src={assets.search_icon}
              alt="Search"
              className="hero-search-icon"
            />
            <span>Search</span>
          </button>
        </div>

        {/* Car image */}
        <div className="hero-car-wrapper">
          <img
            src={assets.main_car || assets.banner_car_image}
            alt="Luxury car"
            className="hero-car-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
