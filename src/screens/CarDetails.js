import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CarDetails.css";
import { assets } from "../assets/assets";
import { API_BASE, apiFetch } from "../utils/api"; // ✅ NEW

const placeholderImg =
  "https://via.placeholder.com/800x450?text=Kasupe+Car";

// Helper: resolve car.image into a usable URL
const getCarImageUrl = (car) => {
  if (!car || !car.image) return placeholderImg;

  // For Cloudinary-stored images, this will already be a full https URL
  if (typeof car.image === "string" && car.image.startsWith("http")) {
    return car.image;
  }

  // Fallback for any legacy relative paths
  return `${API_BASE}${car.image}`;
};

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [dateError, setDateError] = useState("");

  const { users_icon, fuel_icon, car_icon, location_icon, check_icon } = assets;

  const features = [
    "360 Camera",
    "GPS",
    "Rear View Mirror",
    "Bluetooth",
    "Heated Seats",
  ];

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiFetch(`/api/cars/${id}`); // ✅ uses helper
        if (!res.ok) {
          if (res.status === 404) {
            setError("Car not found.");
          } else {
            setError("Failed to load car details.");
          }
          setCar(null);
          return;
        }

        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
        setError("Could not load car details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/cars");
  };

  const calcDays = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
      return 0;
    const diffMs = end - start;
    const days = Math.max(Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1, 1);
    return days;
  };

  const handleBookNow = () => {
    setDateError("");

    if (!pickupDate || !returnDate) {
      setDateError("Please select both pickup and return dates.");
      return;
    }

    const days = calcDays(pickupDate, returnDate);
    if (days <= 0) {
      setDateError("Return date must be the same or after pickup date.");
      return;
    }

    if (!car) {
      setDateError("Car details not loaded yet.");
      return;
    }

    // Go to Checkout screen with car + dates
    navigate("/checkout", {
      state: {
        car,
        pickupDate,
        returnDate,
      },
    });
  };

  if (loading) {
    return (
      <section className="car-details-section">
        <div className="car-details-inner">
          <button className="car-back-btn" onClick={handleBack}>
            ← Back to all cars
          </button>
          <p>Loading car details...</p>
        </div>
      </section>
    );
  }

  if (error || !car) {
    return (
      <section className="car-details-section">
        <div className="car-details-inner">
          <button className="car-back-btn" onClick={handleBack}>
            ← Back to all cars
          </button>
          <p style={{ color: "#b91c1c" }}>{error || "Car not found."}</p>
        </div>
      </section>
    );
  }

  const imageSrc = getCarImageUrl(car);

  return (
    <section className="car-details-section">
      <div className="car-details-inner">
        <button className="car-back-btn" onClick={handleBack}>
          ← Back to all cars
        </button>

        {/* Top row: image + booking card */}
        <div className="car-top-row">
          <div className="car-image-card">
            <img
              src={imageSrc}
              alt={`${car.brand} ${car.model}`}
              className="car-main-image"
            />
          </div>

          <aside className="car-booking-card">
            <div className="car-price-row">
              <span className="car-price">K{car.pricePerDay}</span>
              <span className="car-price-unit">per day</span>
            </div>

            <hr className="car-divider" />

            <div className="car-booking-field">
              <label>Pickup Date</label>
              <div className="car-input-wrap">
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
            </div>

            <div className="car-booking-field">
              <label>Return Date</label>
              <div className="car-input-wrap">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>

            <button className="car-book-btn" onClick={handleBookNow}>
              Proceed to checkout
            </button>

            {dateError && (
              <p className="car-book-note" style={{ color: "#b91c1c" }}>
                {dateError}
              </p>
            )}

            {!dateError && (
              <p className="car-book-note">
                You’ll choose MTN, Airtel or Credit Card on the next step.
              </p>
            )}
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
            <p>
              {car.description || "No description provided for this vehicle."}
            </p>
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
