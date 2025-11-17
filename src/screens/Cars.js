import { useState } from "react";
import { useNavigate } from "react-router-dom";   // 👈 add this
import "../components/FeaturedVehicles.css";
import { dummyCarData, assets } from "../assets/assets";

function Cars() {
  const navigate = useNavigate();                // 👈 create navigate
  const { users_icon, fuel_icon, location_icon, car_icon, search_icon } = assets;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = dummyCarData.filter((car) => {
    const text = `${car.brand} ${car.model} ${car.location} ${car.category}`.toLowerCase();
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

        {filteredCars.length === 0 ? (
          <p className="cars-empty">No cars match your search.</p>
        ) : (
          <div className="featured-grid">
            {filteredCars.map((car) => (
              <article
                key={car._id}
                className="featured-card"
                onClick={() => navigate(`/cars/${car._id}`)}  // 👈 go to details
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
        )}
      </div>
    </section>
  );
}

export default Cars;
