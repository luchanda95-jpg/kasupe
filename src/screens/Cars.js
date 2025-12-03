import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/FeaturedVehicles.css";
import { assets } from "../assets/assets";
import { API_BASE, apiFetch } from "../utils/api"; // ✅ NEW

const placeholderImg =
  "https://via.placeholder.com/400x250?text=Kasupe+Car";

const getCarImageUrl = (car) => {
  if (!car || !car.image) return placeholderImg;

  // For new Cloudinary-stored images, this will already be a full https URL
  if (typeof car.image === "string" && car.image.startsWith("http")) {
    return car.image;
  }

  // Fallback for any legacy relative paths (will hit your server)
  return `${API_BASE}${car.image}`;
};

function Cars() {
  const navigate = useNavigate();
  const { users_icon, fuel_icon, location_icon, car_icon, search_icon } =
    assets;

  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    let isFirst = true;

    const fetchCars = async () => {
      try {
        if (isFirst) {
          setLoading(true);
          setError("");
        }

        const res = await apiFetch("/api/cars"); // ✅ uses shared API_BASE
        if (!res.ok) {
          throw new Error("Failed to load cars.");
        }

        const data = await res.json();
        if (isMounted) {
          setCars(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Could not load cars. Please try again later.");
        }
      } finally {
        if (isMounted && isFirst) {
          setLoading(false);
          isFirst = false;
        }
      }
    };

    // initial load
    fetchCars();

    // 🔁 refresh every 30s (optional – you can remove if too heavy)
    const intervalId = setInterval(fetchCars, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const filteredCars = cars
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
