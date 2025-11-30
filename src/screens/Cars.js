import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/FeaturedVehicles.css";
import { assets } from "../assets/assets";

const API_BASE = "https://kasuper-server.onrender.com";

const placeholderImg =
  "https://via.placeholder.com/400x250?text=Kasupe+Car";

// Helper: build correct image URL for each car
const getCarImageUrl = (car) => {
  if (!car || !car.image) return placeholderImg;

  // If it's already a full URL (http/https), use it directly
  if (typeof car.image === "string" && car.image.startsWith("http")) {
    return car.image;
  }

  // Otherwise treat it as a relative path like /uploads/cars/xxx.jpg
  return `${API_BASE}${car.image}`;
};

function Cars() {
  const navigate = useNavigate();
  const { users_icon, fuel_icon, location_icon, car_icon, search_icon } = assets;

  const [searchTerm, setSearchTerm] = useState("");
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
          throw new Error("Failed to load cars.");
        }

        const data = await res.json();
        setCars(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Could not load cars. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars
    // Only show cars that are available (or if isAvailable is missing)
    .filter((car) => car.isAvailable !== false)
    .filter((car) => {
      const text = `${car.brand || ""} ${car.model || ""} ${
        car.location || ""
      } ${car.category || ""}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });

  return (
    <section className="featured-section">
      <div className="featured-inner">
        <div className="featured-header">
          <h2>All Cars</h2>
          <p>Browse all vehicles currently available for hire.</p>
        </div>

        {/* Search bar at the top */}
        <div className="cars-search-bar">
          <div className="cars-search-input-wrap">
            <input
              type="text"
              placeholder="Search by brand, model or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search_icon} alt="Search" />
          </div>
        </div>

        {/* Loading & error states */}
        {loading && <p className="cars-empty">Loading cars...</p>}
        {error && !loading && (
          <p className="cars-empty" style={{ color: "#b91c1c" }}>
            {error}
          </p>
        )}

        {!loading && !error && filteredCars.length === 0 && (
          <p className="cars-empty">No cars match your search.</p>
        )}

        {!loading && !error && filteredCars.length > 0 && (
          <div className="featured-grid">
            {filteredCars.map((car) => {
              const imgSrc = getCarImageUrl(car);

              return (
                <article
                  key={car._id}
                  className="featured-card"
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
      </div>
    </section>
  );
}

export default Cars;
