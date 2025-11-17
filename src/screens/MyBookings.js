// src/screens/MyBookings.js
import { useMemo, useState } from "react";
import "./MyBookings.css";
import { dummyMyBookingsData, assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();
  const {
    calendar_icon_colored,
    location_icon_colored,
    car_icon,
    tick_icon,
    cautionIconColored,
  } = assets;

  const [filter, setFilter] = useState("all"); // all | upcoming | completed

  const today = new Date();

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isCompleted = (booking) => {
    const returnDate = new Date(booking.returnDate);
    return returnDate < today;
  };

  const filteredBookings = useMemo(() => {
    if (filter === "all") return dummyMyBookingsData;

    if (filter === "upcoming") {
      return dummyMyBookingsData.filter((b) => !isCompleted(b));
    }

    if (filter === "completed") {
      return dummyMyBookingsData.filter((b) => isCompleted(b));
    }

    return dummyMyBookingsData;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, today]);

  const getStatusLabel = (status) => {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getTripLengthLabel = (booking) => {
    const start = new Date(booking.pickupDate);
    const end = new Date(booking.returnDate);
    const diffMs = end - start;
    const days = Math.max(Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1, 1);

    if (days === 1) return "Same-day hire";
    if (days === 2) return "2 days";
    return `${days} days`;
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

        {/* No bookings state */}
        {filteredBookings.length === 0 ? (
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
              const car = booking.car;
              const completed = isCompleted(booking);

              return (
                <article className="booking-card" key={booking._id}>
                  {/* Top row: status + price */}
                  <div className="booking-card-top">
                    <div className="booking-status-pill-wrapper">
                      <span
                        className={`booking-status-pill booking-status-${
                          booking.status || "pending"
                        }`}
                      >
                        <img
                          src={
                            booking.status === "confirmed"
                              ? tick_icon
                              : cautionIconColored
                          }
                          alt={getStatusLabel(booking.status)}
                          className="booking-status-icon"
                        />
                        {getStatusLabel(booking.status)}
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
                        ${booking.price}
                      </span>
                    </div>
                  </div>

                  {/* Main content: image + car info + dates */}
                  <div className="booking-card-main">
                    {/* Car image */}
                    <div className="booking-car-image-wrap">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="booking-car-image"
                      />
                    </div>

                    {/* Details */}
                    <div className="booking-details">
                      <h2 className="booking-car-title">
                        {car.brand} {car.model}
                      </h2>
                      <p className="booking-car-meta">
                        {car.category} • {car.year}
                      </p>

                      {/* Location */}
                      <div className="booking-detail-row">
                        <img
                          src={location_icon_colored}
                          alt="Location"
                          className="booking-detail-icon"
                        />
                        <span>{car.location}</span>
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
                      {booking._id.slice(-8)}
                    </span>
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
