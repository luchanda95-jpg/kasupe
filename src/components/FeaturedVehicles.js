// src/components/FeaturedVehicles.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedVehicles.css";
import { assets } from "../assets/assets";

const API_BASE = "https://kasuper-server.onrender.com";

function FeaturedVehicles() {
  const navigate = useNavigate();
  const { users_icon, fuel_icon, location_icon, car_icon } = assets;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/cars`);
        if (!res.ok) {
          throw new Error("Failed to load featured cars.");
        }

        const data = await res.json();
        setCars(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load featured cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // only available cars, then take first 6
  const featured = cars
    .filter((car) => car.isAvailable !== false)
    .slice(0, 6);

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

        {loading && <p className="cars-empty">Loading featured cars...</p>}
        {error && !loading && (
          <p className="cars-empty" style={{ color: "#b91c1c" }}>
            {error}
          </p>
        )}

        {!loading && !error && featured.length === 0 && (
          <p className="cars-empty">
            No featured cars available at the moment.
          </p>
        )}

        {!loading && !error && featured.length > 0 && (
          <div className="featured-grid">
            {featured.map((car) => {
              const imgSrc =
                car.image ||
                "https://via.placeholder.com/400x250?text=Kasupe+Car";

              return (
                <article
                  className="featured-card"
                  key={car._id}
                  onClick={() => navigate(`/cars/${car._id}`)}
                >
                  <div className="featured-image-wrap">
                    <img
                      src={imgSrc}
                      alt={`${car.brand} ${car.model}`}
                      className="featured-image"
                    />
                    {car.isAvailable !== false && (
                      <span className="featured-tag-image">Available Now</span>
                    )}
                    <span className="featured-price-image">
                      K{car.pricePerDay}
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
              );
            })}
          </div>
        )}

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
