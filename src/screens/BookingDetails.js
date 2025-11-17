// src/screens/BookingDetails.js
import { useParams, useNavigate } from "react-router-dom";
import "./BookingDetails.css";
import { dummyMyBookingsData, assets } from "../assets/assets";

function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    calendar_icon_colored,
    location_icon_colored,
    fuel_icon,
    users_icon,
    tick_icon,
    cautionIconColored,
  } = assets;

  const today = new Date();

  // Try to find by full id, then by ending segment (if you ever pass a short id)
  let booking =
    dummyMyBookingsData.find((b) => b._id === id) ||
    dummyMyBookingsData.find((b) => b._id.endsWith(id));

  if (!booking) {
    return (
      <section className="bd-section">
        <div className="bd-inner">
          <button className="bd-back-btn" onClick={() => navigate("/my-bookings")}>
            ← Back to My Bookings
          </button>
          <p>Booking not found.</p>
        </div>
      </section>
    );
  }

  const car = booking.car;

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isCompleted = () => {
    const returnDate = new Date(booking.returnDate);
    return returnDate < today;
  };

  const getDurationText = () => {
    const start = new Date(booking.pickupDate);
    const end = new Date(booking.returnDate);
    const diffMs = end - start;
    const days = Math.max(Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1, 1);

    if (days === 1) return "1 day (same-day hire)";
    if (days === 2) return "2 days";
    return `${days} days`;
  };

  const getStatusLabel = (status) => {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const completed = isCompleted();

  // Timeline logic
  const pickupDate = new Date(booking.pickupDate);
  const returnDate = new Date(booking.returnDate);

  let activeStepIndex = 0;
  if (booking.status === "pending") {
    activeStepIndex = 0;
  } else if (booking.status === "confirmed" && today < pickupDate) {
    activeStepIndex = 1; // Confirmed, waiting for pickup
  } else if (today >= pickupDate && today <= returnDate) {
    activeStepIndex = 3; // Trip ongoing
  } else if (completed) {
    activeStepIndex = 4; // Completed
  }

  const timelineSteps = [
    "Booking requested",
    "Booking confirmed",
    "Car ready for pickup",
    "Trip ongoing",
    "Completed",
  ];

  const handleDownloadInvoice = () => {
    alert("Invoice download coming soon (demo).");
  };

  const handlePayRemaining = () => {
    alert("Payment flow coming soon (demo).");
  };

  const handleModifyBooking = () => {
    alert("Modify booking coming soon (demo).");
  };

  const handleCancelBooking = () => {
    const ok = window.confirm(
      "Are you sure you want to request cancellation for this booking?"
    );
    if (ok) {
      alert("Cancellation flow coming soon (demo).");
    }
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@kasupecarhire.com";
  };

  return (
    <section className="bd-section">
      <div className="bd-inner">
        {/* Back */}
        <button className="bd-back-btn" onClick={() => navigate("/my-bookings")}>
          ← Back to My Bookings
        </button>

        {/* Summary Card */}
        <div className="bd-summary-card">
          <div className="bd-summary-left">
            <div className="bd-summary-image-wrap">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="bd-summary-image"
              />
            </div>
            <div className="bd-summary-info">
              <p className="bd-booking-ref">
                Booking ref: <span>{booking._id.slice(-8)}</span>
              </p>
              <h1 className="bd-car-title">
                {car.brand} {car.model}
              </h1>
              <p className="bd-car-subtitle">
                {car.category} • {car.year} • {car.transmission}
              </p>
              <div className="bd-summary-meta-row">
                <div className="bd-summary-meta-item">
                  <img
                    src={location_icon_colored}
                    alt="Location"
                    className="bd-meta-icon"
                  />
                  <span>{car.location}</span>
                </div>
                <div className="bd-summary-meta-item">
                  <img
                    src={users_icon}
                    alt="Seats"
                    className="bd-meta-icon"
                  />
                  <span>{car.seating_capacity} seats</span>
                </div>
                <div className="bd-summary-meta-item">
                  <img
                    src={fuel_icon}
                    alt="Fuel"
                    className="bd-meta-icon"
                  />
                  <span>{car.fuel_type}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bd-summary-right">
            <div className="bd-status-wrap">
              <span
                className={`bd-status-pill bd-status-${booking.status || "pending"}`}
              >
                <img
                  src={booking.status === "confirmed" ? tick_icon : cautionIconColored}
                  alt={getStatusLabel(booking.status)}
                  className="bd-status-icon"
                />
                {getStatusLabel(booking.status)}
              </span>
              {completed && (
                <span className="bd-status-badge">Completed trip</span>
              )}
            </div>

            <div className="bd-total-wrap">
              <p className="bd-total-label">Total amount</p>
              <p className="bd-total-value">${booking.price}</p>
              <p className="bd-total-sub">
                {getDurationText()} • {car.location}
              </p>
            </div>
          </div>
        </div>

        {/* Grid layout */}
        <div className="bd-grid">
          {/* LEFT COLUMN */}
          <div className="bd-col-left">
            {/* Pickup & Drop-off */}
            <section className="bd-card">
              <h2 className="bd-card-title">Pickup & drop-off</h2>
              <div className="bd-dates-grid">
                <div className="bd-date-block">
                  <p className="bd-label">Pickup date</p>
                  <div className="bd-date-row">
                    <img
                      src={calendar_icon_colored}
                      alt="Pickup"
                      className="bd-meta-icon"
                    />
                    <span>{formatDate(booking.pickupDate)}</span>
                  </div>
                  <p className="bd-muted">Pickup time: 09:00 (example)</p>
                </div>
                <div className="bd-date-block">
                  <p className="bd-label">Drop-off date</p>
                  <div className="bd-date-row">
                    <img
                      src={calendar_icon_colored}
                      alt="Return"
                      className="bd-meta-icon"
                    />
                    <span>{formatDate(booking.returnDate)}</span>
                  </div>
                  <p className="bd-muted">Drop-off time: 17:00 (example)</p>
                </div>
              </div>

              <div className="bd-location-row">
                <div>
                  <p className="bd-label">Pickup location</p>
                  <div className="bd-location-inner">
                    <img
                      src={location_icon_colored}
                      alt="Location"
                      className="bd-meta-icon"
                    />
                    <span>{car.location} (default)</span>
                  </div>
                </div>
                <div>
                  <p className="bd-label">Drop-off location</p>
                  <div className="bd-location-inner">
                    <img
                      src={location_icon_colored}
                      alt="Location"
                      className="bd-meta-icon"
                    />
                    <span>{car.location} (same as pickup)</span>
                  </div>
                </div>
              </div>

              <div className="bd-duration-box">
                <p className="bd-label">Duration of hire</p>
                <p className="bd-duration-text">{getDurationText()}</p>
                <p className="bd-muted">
                  Duration is calculated from pickup to drop-off dates.
                </p>
              </div>

              <div className="bd-map-placeholder">
                <p className="bd-map-title">Route preview</p>
                <p className="bd-map-sub">
                  Map & route preview coming soon. You’ll be able to see
                  estimated distance and travel time here.
                </p>
              </div>
            </section>

            {/* Car details */}
            <section className="bd-card">
              <h2 className="bd-card-title">Car details</h2>
              <div className="bd-car-detail-list">
                <div className="bd-car-detail-row">
                  <span className="bd-label">Brand & model</span>
                  <span className="bd-value">
                    {car.brand} {car.model}
                  </span>
                </div>
                <div className="bd-car-detail-row">
                  <span className="bd-label">Year</span>
                  <span className="bd-value">{car.year}</span>
                </div>
                <div className="bd-car-detail-row">
                  <span className="bd-label">Category</span>
                  <span className="bd-value">{car.category}</span>
                </div>
                <div className="bd-car-detail-row">
                  <span className="bd-label">Transmission</span>
                  <span className="bd-value">{car.transmission}</span>
                </div>
                <div className="bd-car-detail-row">
                  <span className="bd-label">Fuel type</span>
                  <span className="bd-value">{car.fuel_type}</span>
                </div>
                <div className="bd-car-detail-row">
                  <span className="bd-label">Seats</span>
                  <span className="bd-value">{car.seating_capacity}</span>
                </div>
              </div>

              <div className="bd-feature-tags">
                <span>AC</span>
                <span>Bluetooth</span>
                <span>USB charging</span>
                <span>Basic insurance</span>
              </div>

              <button
                type="button"
                className="bd-secondary-btn"
                onClick={() => navigate(`/cars/${car._id}`)}
              >
                View car details
              </button>
            </section>

            {/* Add-ons & extras */}
            <section className="bd-card">
              <h2 className="bd-card-title">Add-ons & extras</h2>
              <p className="bd-muted">
                No extra services have been added for this booking.
              </p>
              {/* Example tags – can be dynamic later */}
              <div className="bd-tag-row">
                <span className="bd-pill-muted">Child seat (not added)</span>
                <span className="bd-pill-muted">GPS device (not added)</span>
                <span className="bd-pill-muted">Extra driver (not added)</span>
              </div>
            </section>

            {/* Security & deposit */}
            <section className="bd-card">
              <h2 className="bd-card-title">Security & deposit</h2>
              <p className="bd-muted">
                No security deposit has been recorded for this booking in the
                demo data. In production, deposit details and refund status
                will appear here.
              </p>
            </section>

            {/* Documents */}
            <section className="bd-card">
              <h2 className="bd-card-title">Documents</h2>
              <div className="bd-doc-actions">
                <button
                  type="button"
                  className="bd-secondary-btn"
                  onClick={() =>
                    alert("Rental agreement viewer coming soon (demo).")
                  }
                >
                  View rental agreement
                </button>
                <button
                  type="button"
                  className="bd-secondary-btn"
                  onClick={() =>
                    alert("Upload flow coming soon (demo).")
                  }
                >
                  Upload driver’s license
                </button>
                <button
                  type="button"
                  className="bd-secondary-btn"
                  onClick={() =>
                    alert("Vehicle condition report coming soon (demo).")
                  }
                >
                  View condition report
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="bd-col-right">
            {/* Payment info */}
            <section className="bd-card">
              <h2 className="bd-card-title">Payment information</h2>
              <div className="bd-payment-row">
                <span className="bd-label">Amount paid</span>
                <span className="bd-value">${booking.price}</span>
              </div>
              <div className="bd-payment-row">
                <span className="bd-label">Amount remaining</span>
                <span className="bd-value">$0</span>
              </div>
              <div className="bd-payment-row">
                <span className="bd-label">Payment status</span>
                <span className="bd-pill-success">Paid in full</span>
              </div>
              <div className="bd-payment-row">
                <span className="bd-label">Payment method</span>
                <span className="bd-value">Card ending •••• 1234 (demo)</span>
              </div>

              <div className="bd-payment-actions">
                <button
                  type="button"
                  className="bd-primary-btn"
                  onClick={handleDownloadInvoice}
                >
                  Download invoice
                </button>
                <button
                  type="button"
                  className="bd-secondary-btn"
                  onClick={handlePayRemaining}
                  disabled
                >
                  Pay remaining balance
                </button>
              </div>
            </section>

            {/* Booking timeline */}
            <section className="bd-card">
              <h2 className="bd-card-title">Booking status</h2>
              <div className="bd-timeline">
                {timelineSteps.map((step, index) => (
                  <div className="bd-timeline-step" key={step}>
                    <div className="bd-timeline-marker-wrap">
                      <div
                        className={`bd-timeline-marker ${
                          index <= activeStepIndex ? "active" : ""
                        }`}
                      />
                      {index < timelineSteps.length - 1 && (
                        <div
                          className={`bd-timeline-line ${
                            index < activeStepIndex ? "active" : ""
                          }`}
                        />
                      )}
                    </div>
                    <div className="bd-timeline-text">
                      <p className="bd-timeline-title">{step}</p>
                      {index === activeStepIndex && (
                        <p className="bd-timeline-current">Current stage</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Driver info (future) */}
            <section className="bd-card">
              <h2 className="bd-card-title">Driver information</h2>
              <p className="bd-muted">
                No driver has been assigned for this booking. If you choose a
                driver option in the future, their name and contact details will
                appear here.
              </p>
            </section>

            {/* Actions */}
            <section className="bd-card">
              <h2 className="bd-card-title">Actions</h2>
              <div className="bd-actions-grid">
                <button
                  type="button"
                  className="bd-secondary-btn"
                  onClick={handleModifyBooking}
                >
                  Modify booking
                </button>
                <button
                  type="button"
                  className="bd-secondary-btn bd-danger-outline"
                  onClick={handleCancelBooking}
                >
                  Cancel booking
                </button>
                <button
                  type="button"
                  className="bd-secondary-btn"
                  onClick={handleContactSupport}
                >
                  Contact support
                </button>
              </div>
            </section>

            {/* Cancellation policy */}
            <section className="bd-card">
              <h2 className="bd-card-title">Cancellation & refunds</h2>
              <p className="bd-muted">
                Free cancellation up to 24 hours before pickup. Cancellations
                made less than 24 hours before pickup may incur a fee.
              </p>
              <p className="bd-muted">
                Refunds are processed within 3–5 business days after confirming
                eligibility.
              </p>
            </section>

            {/* Notifications / history */}
            <section className="bd-card">
              <h2 className="bd-card-title">Notifications</h2>
              <ul className="bd-notification-list">
                <li>
                  Booking confirmed – 10 Jun 2025, 14:05 (demo)
                </li>
                <li>
                  Payment received – 10 Jun 2025, 14:06 (demo)
                </li>
                {completed && (
                  <li>Trip marked completed – {formatDate(booking.returnDate)} (demo)</li>
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingDetails;
