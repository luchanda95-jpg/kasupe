// src/components/FeaturedVehicles.js
import { useNavigate } from "react-router-dom";
import "./FeaturedVehicles.css";
import { dummyCarData, assets } from "../assets/assets";

function FeaturedVehicles() {
  const navigate = useNavigate();

  const featured = dummyCarData.slice(0, 6);
  const { users_icon, fuel_icon, location_icon, car_icon } = assets;

  return (
    <section className="featured-section">
      <div className="featured-inner">
        <div className="featured-header">
          <h2>Featured Vehicles</h2>
          <p>
            Explore our selection of premium vehicles available for your next
            adventure.
          </p>
        </div>

        <div className="featured-grid">
          {featured.map((car) => (
            <article
              className="featured-card"
              key={car._id}
              onClick={() => navigate(`/cars/${car._id}`)}
            >
              <div className="featured-image-wrap">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="featured-image"
                />
                <span className="featured-tag-image">Available Now</span>
                <span className="featured-price-image">
                  ${car.pricePerDay}
                  <span className="featured-price-suffix"> / day</span>
                </span>
              </div>

              <div className="featured-card-body">
                <div className="featured-title-row">
                  <h3>
                    {car.brand} {car.model}
                  </h3>
                </div>

                <p className="featured-meta">
                  {car.category} • {car.year}
                </p>

                <div className="featured-details-grid">
                  <div className="detail-item">
                    <img
                      src={users_icon}
                      alt="Seats"
                      className="detail-icon"
                    />
                    <span>{car.seating_capacity} Seats</span>
                  </div>
                  <div className="detail-item">
                    <img
                      src={fuel_icon}
                      alt="Fuel Type"
                      className="detail-icon"
                    />
                    <span>{car.fuel_type}</span>
                  </div>
                  <div className="detail-item">
                    <img
                      src={location_icon}
                      alt="Location"
                      className="detail-icon"
                    />
                    <span>{car.location}</span>
                  </div>
                  <div className="detail-item">
                    <img
                      src={car_icon}
                      alt="Transmission"
                      className="detail-icon"
                    />
                    <span>{car.transmission}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="featured-footer">
          <button
            className="featured-see-all-btn"
            onClick={() => navigate("/cars")}
          >
            See all cars
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedVehicles;
