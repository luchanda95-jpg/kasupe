// src/screens/About.js
import { useState } from "react";
import "./About.css";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const { main_car, banner_car_image, location_icon, users_icon, car_icon } =
    assets;

  const heroImage = banner_car_image || main_car;

  const [showPricing, setShowPricing] = useState(false);

  const openPricing = () => setShowPricing(true);
  const closePricing = () => setShowPricing(false);

  return (
    <section className="about-page">
      <div className="about-wrapper">
        {/* ========== HERO ========== */}
        <section className="about-hero">
          <div className="about-hero-left">
            <span className="about-pill">About us</span>
            <h1 className="about-hero-title">
              Your trusted partner for modern car hire.
            </h1>
            <p className="about-hero-text">
              Kasupe makes car rentals simple, transparent and reliable — from
              city errands and airport transfers to long-distance and safari
              trips. We focus on comfort, safety and a smooth customer
              experience from booking to drop-off.
            </p>

            <div className="about-hero-stats">
              <div className="about-stat">
                <p className="about-stat-number">1,200+</p>
                <p className="about-stat-label">Trips completed</p>
              </div>
              <div className="about-stat">
                <p className="about-stat-number">4.8/5</p>
                <p className="about-stat-label">Average rating</p>
              </div>
              <div className="about-stat">
                <p className="about-stat-number">24/7</p>
                <p className="about-stat-label">Support on call</p>
              </div>
            </div>
          </div>

          <div className="about-hero-right">
            <div className="about-hero-image-card">
              {/* Price pill on hero image */}
              <div className="about-hero-price-pill">
                From <span>K550</span> / day
              </div>

              {heroImage && (
                <img
                  src={heroImage}
                  alt="Kasupe car hire"
                  className="about-hero-image"
                />
              )}

              <div className="about-hero-floating-card">
                <p className="floating-title">Plan your next trip with us</p>
                <p className="floating-sub">
                  Flexible pickup times, clean vehicles and friendly assistance.
                </p>
                <div className="about-hero-actions">
                  <button
                    type="button"
                    className="about-primary-btn"
                    onClick={() => navigate("/cars")}
                  >
                    Browse cars
                  </button>
                  <button
                    type="button"
                    className="about-secondary-btn"
                    onClick={openPricing}
                  >
                    View pricing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== WHY CHOOSE US ========== */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>Why travelers choose Kasupe</h2>
            <p>
              We combine technology, local expertise and a friendly team to
              deliver a car hire experience that feels smooth from start to
              finish.
            </p>
          </div>

          <div className="about-three-cards">
            <div className="about-feature-card">
              <div className="about-icon-badge">
                {car_icon && (
                  <img
                    src={car_icon}
                    alt="Fleet"
                    className="about-icon-img"
                  />
                )}
              </div>
              <h3>Diverse, well-maintained fleet</h3>
              <p>
                From compact city cars to spacious SUVs, every vehicle is
                cleaned, checked and prepared before each trip.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-icon-badge">
                {location_icon && (
                  <img
                    src={location_icon}
                    alt="Coverage"
                    className="about-icon-img"
                  />
                )}
              </div>
              <h3>Built around real routes</h3>
              <p>
                We think in terms of your journeys — airport transfers, town
                runs, business travel, tourism routes and more.
              </p>
            </div>

            <div className="about-feature-card">
              <div className="about-icon-badge">
                {users_icon && (
                  <img
                    src={users_icon}
                    alt="Customers"
                    className="about-icon-img"
                  />
                )}
              </div>
              <h3>Customer-first service</h3>
              <p>
                Clear communication, fair policies and human support when you
                need it — not just automated messages.
              </p>
            </div>
          </div>
        </section>

        {/* ========== STORY + VALUES ========== */}
        <section className="about-section about-split">
          <div className="about-story">
            <h2>Our story</h2>
            <p>
              Kasupe was created to solve a simple problem: people needed
              reliable vehicles without the confusion of hidden costs,
              complicated terms or poor communication.
            </p>
            <p>
              We are a locally-rooted team that understands how people actually
              move — to work, to events, to family and back home. That means we
              design our service around real life, not just bookings in a
              system.
            </p>
            <p>
              As we grow, we are investing in better technology, safer vehicles
              and a stronger support team, so every trip feels smoother than the
              last.
            </p>
          </div>

          <div className="about-values">
            <h2>What we believe in</h2>
            <ul>
              <li>
                <span className="about-dot" />
                <div>
                  <h3>Honesty in pricing</h3>
                  <p>No hidden extras or surprise charges at the last step.</p>
                </div>
              </li>
              <li>
                <span className="about-dot" />
                <div>
                  <h3>Comfort & safety first</h3>
                  <p>
                    Vehicles are serviced regularly and inspected before each
                    hire.
                  </p>
                </div>
              </li>
              <li>
                <span className="about-dot" />
                <div>
                  <h3>Respect for your time</h3>
                  <p>
                    Clear pickup plans, quick responses and help when
                    arrangements need to change.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="about-section">
          <div className="about-section-header">
            <h2>How it works</h2>
            <p>
              A simple booking flow designed to help you confirm your trip in a
              few clear steps.
            </p>
          </div>

          <div className="about-steps">
            <div className="about-step-card">
              <span className="about-step-number">1</span>
              <h3>Choose your car</h3>
              <p>
                Filter by type, price, seats and location to find the right fit
                for your journey.
              </p>
            </div>
            <div className="about-step-card">
              <span className="about-step-number">2</span>
              <h3>Confirm your booking</h3>
              <p>
                Set pickup & drop-off dates, review the summary and confirm in
                just a few clicks.
              </p>
            </div>
            <div className="about-step-card">
              <span className="about-step-number">3</span>
              <h3>Drive with confidence</h3>
              <p>
                Pick up your car, follow your route and contact us anytime if
                you need support.
              </p>
            </div>
          </div>
        </section>

        {/* ========== CTA STRIP ========== */}
        <section className="about-cta-strip">
          <div className="about-cta-content">
            <div>
              <h2>Ready to start your next journey?</h2>
              <p>
                Explore available vehicles, compare options and secure your
                booking with us.
              </p>
            </div>
            <div className="about-cta-actions">
              <button
                type="button"
                className="about-primary-btn"
                onClick={() => navigate("/cars")}
              >
                Browse cars
              </button>
              <button
                type="button"
                className="about-secondary-btn"
                onClick={openPricing}
              >
                View pricing
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ========== PRICING POPUP MODAL ========== */}
      {showPricing && (
        <div className="pricing-modal-backdrop" onClick={closePricing}>
          <div
            className="pricing-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pricing-modal-header">
              <h2>Our standard pricing</h2>
              <button
                type="button"
                className="pricing-close-btn"
                onClick={closePricing}
              >
                ×
              </button>
            </div>

            <p className="pricing-subtitle">
              Below are guide rates. Final prices may vary based on dates,
              routes and availability.
            </p>

            {/* ===== PRICING TABLE ===== */}
            <div className="pricing-table">
              {/* Header row */}
              <div className="pricing-header-row">
                <span>Vehicle</span>
                <span>Local rates</span>
                <span>Out of town</span>
                <span>Contract</span>
              </div>

              {/* Honda Fit */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Honda Fit</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K550 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K650 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Toyota Allion – 1 */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Toyota Allion</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K600 / per hour</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K1000 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Mitsubishi Pajero */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Mitsubishi Pajero</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K2500 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K2500 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Toyota Hiace */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Toyota Hiace</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K3000 / per hour</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K3500 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Toyota Allion – 2 */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Toyota Allion</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K650 / per hour</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K1000 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Toyota Alphard */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Toyota Alphard</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K1500</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K2500 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Nissan Patrol */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Nissan Patrol</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K3500</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K4700 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Toyota Fortuner */}
              <div className="pricing-row">
                <div className="pricing-car">
                  <p className="pricing-car-name">Toyota Fortuner</p>
                  <p className="pricing-car-rated">Rated</p>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K3500</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <p className="pricing-col-price">K4700 / per day</p>
                  <button className="pricing-mini-btn">Rent a car</button>
                </div>
                <div className="pricing-col">
                  <button
                    className="pricing-mini-btn secondary"
                    onClick={() => navigate("/contract")}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="pricing-footer">
              <button
                type="button"
                className="about-primary-btn"
                onClick={() => {
                  closePricing();
                  navigate("/cars");
                }}
              >
                Check available cars
              </button>
              <p className="pricing-note">
                For long-term contracts, tours and custom packages, please
                contact us directly and we’ll prepare a tailored quote.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;
