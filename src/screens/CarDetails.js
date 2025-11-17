// src/screens/CarDetails.js
import { useParams, useNavigate } from "react-router-dom";
import "./CarDetails.css";
import { dummyCarData, assets } from "../assets/assets";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = dummyCarData.find((c) => c._id === id) || dummyCarData[0];

  const {
    users_icon,
    fuel_icon,
    car_icon,
    location_icon,
    check_icon,
  } = assets;

  const features = [
    "360 Camera",
    "GPS",
    "Rear View Mirror",
    "Bluetooth",
    "Heated Seats",
  ];

  return (
    <section className="car-details-section">
      <div className="car-details-inner">
        <button className="car-back-btn" onClick={() => navigate("/cars")}>
          ← Back to all cars
        </button>

        {/* Top row: image + booking card */}
        <div className="car-top-row">
          <div className="car-image-card">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="car-main-image"
            />
          </div>

          <aside className="car-booking-card">
            <div className="car-price-row">
              <span className="car-price">${car.pricePerDay}</span>
              <span className="car-price-unit">per day</span>
            </div>

            <hr className="car-divider" />

            <div className="car-booking-field">
              <label>Pickup Date</label>
              <div className="car-input-wrap">
                <input type="text" placeholder="dd/mm/yyyy" />
              </div>
            </div>

            <div className="car-booking-field">
              <label>Return Date</label>
              <div className="car-input-wrap">
                <input type="text" placeholder="dd/mm/yyyy" />
              </div>
            </div>

            <button className="car-book-btn">Book Now</button>

            <p className="car-book-note">
              No credit card required to reserve
            </p>
          </aside>
        </div>

        {/* Bottom info area */}
        <div className="car-info">
          <h1 className="car-title">
            {car.brand} {car.model}
          </h1>
          <p className="car-subtitle">
            {car.category} • {car.year}
          </p>

          <hr className="car-divider car-divider-wide" />

          <div className="car-spec-grid">
            <div className="car-spec-card">
              <img src={users_icon} alt="Seats" />
              <span>{car.seating_capacity} Seats</span>
            </div>
            <div className="car-spec-card">
              <img src={fuel_icon} alt="Fuel" />
              <span>{car.fuel_type}</span>
            </div>
            <div className="car-spec-card">
              <img src={car_icon} alt="Transmission" />
              <span>{car.transmission}</span>
            </div>
            <div className="car-spec-card">
              <img src={location_icon} alt="Location" />
              <span>{car.location}</span>
            </div>
          </div>

          <div className="car-description">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>

          <div className="car-features">
            <h3>Features</h3>
            <div className="car-features-grid">
              {features.map((feat) => (
                <div key={feat} className="car-feature-item">
                  <img src={check_icon} alt="Included" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarDetails;
