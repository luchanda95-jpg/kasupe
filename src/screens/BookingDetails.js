// src/screens/MyBookings.js
import { useEffect, useMemo, useState } from "react";
import "./MyBookings.css";
import { dummyMyBookingsData, assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE = "https://kasuper-server-84g2.onrender.com";

const placeholderBookingImg =
  "https://via.placeholder.com/400x250?text=Kasupe+Car";

const getCarImageUrl = (image) => {
  if (!image) return placeholderBookingImg;
  if (typeof image === "string" && image.startsWith("http")) {
    return image;
  }
  return `${API_BASE}${image}`;
};

function MyBookings() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    calendar_icon_colored,
    location_icon_colored,
    car_icon,
    tick_icon,
    cautionIconColored,
  } = assets;

  const [filter, setFilter] = useState("all"); // all | upcoming | completed
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingDemo, setUsingDemo] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  const today = new Date();

  // Show success banner if we just created a booking via checkout
  useEffect(() => {
    if (location.state?.justCreated) {
      setFlashMessage(
        "Your booking has been submitted and is pending confirmation."
      );

      // Clear the state so it doesn't show again on refresh
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isCompleted = (booking) => {
    if (!booking.returnDate) return false;
    const returnDate = new Date(booking.returnDate);
    return returnDate < today;
  };

  // Load from API, fallback to dummy data if API fails
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/api/bookings`);
        if (!res.ok) {
          throw new Error("Failed to load bookings.");
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
        setUsingDemo(false);
      } catch (err) {
        console.warn("Bookings API not available, using demo data.", err);
        setBookings(dummyMyBookingsData || []);
        setUsingDemo(true);
        setError(
          "Bookings API not reachable. Showing demo bookings only (changes are not saved)."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredBookings = useMemo(() => {
    let source = bookings;

    if (filter === "upcoming") {
      return source.filter((b) => !isCompleted(b));
    }

    if (filter === "completed") {
      return source.filter((b) => isCompleted(b));
    }

    return source;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, bookings, today]);

  const getStatusLabel = (status) => {
    if (!status) return "Pending";
    return status;
  };

  const getStatusSlug = (status) => {
    return (status || "Pending").toLowerCase();
  };

  const getTripLengthLabel = (booking) => {
    if (!booking.pickupDate || !booking.returnDate) return "—";
    const start = new Date(booking.pickupDate);
    const end = new Date(booking.returnDate);
    const diffMs = end - start;
    const days = Math.max(Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1, 1);

    if (days === 1) return "Same-day hire";
    if (days === 2) return "2 days";
    return `${days} days`;
  };

  const getTotalPrice = (booking) => {
    if (typeof booking.totalPrice === "number") return booking.totalPrice;
    if (typeof booking.price === "number") return booking.price;
    if (
      booking.car &&
      typeof booking.car.pricePerDay === "number" &&
      booking.pickupDate &&
      booking.returnDate
    ) {
      const start = new Date(booking.pickupDate);
      const end = new Date(booking.returnDate);
      const diffMs = end - start;
      const days = Math.max(Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1, 1);
      return days * booking.car.pricePerDay;
    }
    return 0;
  };

  return (
    <section className="bookings-section">
      <div className="bookings-inner">
        {/* Header */}
        <header className="bookings-header">
          <h1>My Bookings</h1>
          <p>
            View all your Kasupe rentals in one place – past trips, upcoming
            journeys and pending bookings.
          </p>
        </header>

        {flashMessage && (
          <div className="bookings-alert bookings-alert-success">
            {flashMessage}
          </div>
        )}

        {error && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "#b91c1c",
              marginBottom: "0.5rem",
            }}
          >
            {error}
          </p>
        )}

        {/* Filter tabs */}
        <div className="bookings-filters">
          <button
            type="button"
            className={`bookings-filter-btn ${
              filter === "all" ? "active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`bookings-filter-btn ${
              filter === "upcoming" ? "active" : ""
            }`}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`bookings-filter-btn ${
              filter === "completed" ? "active" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <div className="bookings-empty">
            <p>Loading your bookings…</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bookings-empty">
            <p>You don’t have any bookings in this category yet.</p>
            <button
              type="button"
              className="bookings-empty-btn"
              onClick={() => navigate("/cars")}
            >
              Browse cars
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map((booking) => {
              const car =
                booking.car || booking.carSnapshot || booking.carInfo || {};
              const completed = isCompleted(booking);

              const carBrand = car.brand || booking.carBrand || "Car";
              const carModel = car.model || booking.carModel || "";
              const carCategory = car.category || "Vehicle";
              const carYear = car.year || "";
              const carLocation =
                car.location || booking.carLocation || "Pickup location";

              // Build correct image URL from car.image or booking.carImage
              const carImage = getCarImageUrl(
                car.image || booking.carImage || null
              );

              const statusLabel = getStatusLabel(booking.status);
              const statusSlug = getStatusSlug(booking.status);
              const totalPrice = getTotalPrice(booking);

              return (
                <article className="booking-card" key={booking._id}>
                  {/* Top row: status + price */}
                  <div className="booking-card-top">
                    <div className="booking-status-pill-wrapper">
                      <span
                        className={`booking-status-pill booking-status-${statusSlug}`}
                      >
                        <img
                          src={
                            statusLabel === "Confirmed"
                              ? tick_icon
                              : cautionIconColored
                          }
                          alt={statusLabel}
                          className="booking-status-icon"
                        />
                        {statusLabel}
                      </span>
                      {completed && (
                        <span className="booking-completed-label">
                          Completed trip
                        </span>
                      )}
                    </div>

                    <div className="booking-price">
                      <span className="booking-price-label">Total</span>
                      <span className="booking-price-value">
                        K{totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Main content: image + car info + dates */}
                  <div className="booking-card-main">
                    {/* Car image */}
                    <div className="booking-car-image-wrap">
                      <img
                        src={carImage}
                        alt={`${carBrand} ${carModel}`}
                        className="booking-car-image"
                      />
                    </div>

                    {/* Details */}
                    <div className="booking-details">
                      <h2 className="booking-car-title">
                        {carBrand} {carModel}
                      </h2>
                      <p className="booking-car-meta">
                        {carCategory} {carYear && `• ${carYear}`}
                      </p>

                      {/* Location */}
                      <div className="booking-detail-row">
                        <img
                          src={location_icon_colored}
                          alt="Location"
                          className="booking-detail-icon"
                        />
                        <span>{carLocation}</span>
                      </div>

                      {/* Dates */}
                      <div className="booking-dates">
                        <div className="booking-date-item">
                          <img
                            src={calendar_icon_colored}
                            alt="Pickup date"
                            className="booking-detail-icon"
                          />
                          <div>
                            <p className="booking-date-label">Pickup</p>
                            <p className="booking-date-value">
                              {formatDate(booking.pickupDate)}
                            </p>
                          </div>
                        </div>
                        <div className="booking-date-item">
                          <img
                            src={calendar_icon_colored}
                            alt="Return date"
                            className="booking-detail-icon"
                          />
                          <div>
                            <p className="booking-date-label">Return</p>
                            <p className="booking-date-value">
                              {formatDate(booking.returnDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side quick info + action */}
                    <div className="booking-right-pane">
                      <div className="booking-trip-summary">
                        <img
                          src={car_icon}
                          alt="Trip"
                          className="booking-detail-icon"
                        />
                        <div>
                          <p className="booking-trip-label">Trip length</p>
                          <p className="booking-trip-value">
                            {getTripLengthLabel(booking)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="booking-view-car-btn"
                        onClick={() =>
                          navigate(`/my-bookings/${booking._id}`)
                        }
                      >
                        View booking
                      </button>
                    </div>
                  </div>

                  {/* Booking ID row */}
                  <div className="booking-footer-row">
                    <span className="booking-id-label">Booking ID:</span>
                    <span className="booking-id-value">
                      {booking._id ? booking._id.slice(-8) : "—"}
                    </span>
                    {usingDemo && (
                      <span className="booking-id-demo-tag">Demo</span>
                    )}
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

export default MyBookings;
