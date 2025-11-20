// src/screens/Checkout.js
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { assets } from "../assets/assets";

const API_BASE = "https://kasuper-server.onrender.com";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state?.car || null;
  const pickupDate = location.state?.pickupDate || "";
  const returnDate = location.state?.returnDate || "";

  const { mtnLogo, airtelLogo } = assets;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // if car or dates are missing (user typed /checkout directly), send them back
  useEffect(() => {
    if (!car || !pickupDate || !returnDate) {
      navigate("/cars", { replace: true });
    }
  }, [car, pickupDate, returnDate, navigate]);

  const formatDate = (isoLike) => {
    if (!isoLike) return "—";
    const d = new Date(isoLike);
    if (Number.isNaN(d.getTime())) return isoLike;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
    const diffMs = end - start;
    return Math.max(Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1, 1);
  }, [pickupDate, returnDate]);

  const totalPrice = useMemo(() => {
    if (!car) return 0;
    return (car.pricePerDay || 0) * (days || 0);
  }, [car, days]);

  const handleOpenContract = () => {
    // Open contract form with pre-filled details
    navigate("/contract", {
      state: {
        car,
        pickupDate,
        returnDate,
        customerName,
        customerEmail,
        customerPhone,
        days,
      },
    });
  };

  const handleConfirmPayment = async () => {
    setErrorMsg("");

    if (!paymentMethod) {
      setErrorMsg("Please select a payment method (MTN, Airtel, or Credit Card).");
      return;
    }

    if (!customerName || !customerPhone) {
      setErrorMsg("Please enter at least your name and phone number.");
      return;
    }

    if (paymentMethod === "mtn" || paymentMethod === "airtel") {
      if (!mobileNumber) {
        setErrorMsg("Please enter your mobile money number.");
        return;
      }
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
        setErrorMsg("Please fill in all card details.");
        return;
      }
    }

    if (!car || !pickupDate || !returnDate) {
      setErrorMsg("Missing car or date information.");
      return;
    }

    try {
      setProcessing(true);

      const payload = {
        car: car._id,
        carBrand: car.brand,
        carModel: car.model,
        customerName,
        customerEmail,
        customerPhone,
        pickupDate,
        returnDate,
        status: "Pending", // admin will confirm
        totalPrice,
        notes: `Payment method: ${
          paymentMethod === "mtn"
            ? "MTN Mobile Money"
            : paymentMethod === "airtel"
            ? "Airtel Money"
            : "Credit/Debit Card"
        }`,
      };

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message || "Failed to create booking after payment."
        );
      }

      const created = await res.json();

      // ✅ After successful checkout → go to MyBookings with a success flag
      navigate("/my-bookings", {
        replace: true,
        state: {
          justCreated: true,
          lastBookingId: created._id,
        },
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err.message ||
          "Could not complete checkout. Please check if the API is running."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (!car) {
    return null;
  }

  return (
    <section className="checkout-section">
      <div className="checkout-inner">
        <button
          className="checkout-back-btn"
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="checkout-layout">
          {/* LEFT: Summary */}
          <div className="checkout-summary-card">
            <h1 className="checkout-title">Confirm your trip</h1>
            <p className="checkout-subtitle">
              Review the rental details before paying.
            </p>

            <div className="checkout-car-summary">
              <img
                src={
                  car.image ||
                  "https://via.placeholder.com/400x250?text=Kasupe+Car"
                }
                alt={`${car.brand} ${car.model}`}
                className="checkout-car-image"
              />
              <div className="checkout-car-info">
                <h2>
                  {car.brand} {car.model}
                </h2>
                <p>
                  {car.category} • {car.year}
                </p>
                <p className="checkout-car-location">{car.location}</p>
              </div>
            </div>

            <div className="checkout-trip-box">
              <h3>Trip details</h3>
              <div className="checkout-trip-row">
                <span>Pickup date</span>
                <span>{formatDate(pickupDate)}</span>
              </div>
              <div className="checkout-trip-row">
                <span>Return date</span>
                <span>{formatDate(returnDate)}</span>
              </div>
              <div className="checkout-trip-row">
                <span>Daily rate</span>
                <span>K{car.pricePerDay}</span>
              </div>
              <div className="checkout-trip-row checkout-trip-row-total">
                <span>
                  Total ({days} {days === 1 ? "day" : "days"})
                </span>
                <span>K{totalPrice}</span>
              </div>
            </div>

            <div className="checkout-contract-box">
              <p>Need a formal contract copy?</p>
              <button
                type="button"
                className="checkout-contract-btn"
                onClick={handleOpenContract}
              >
                View / Print Rental Contract
              </button>
              <p className="checkout-contract-hint">
                Opens the Kasupe rental contract form with your trip details
                pre-filled. You can print or save it as PDF.
              </p>
            </div>
          </div>

          {/* RIGHT: Customer + Payment */}
          <div className="checkout-form-card">
            <h2>Traveller & payment details</h2>

            {errorMsg && <p className="checkout-error">{errorMsg}</p>}

            {/* Customer info */}
            <div className="checkout-field-group">
              <label>Full name</label>
              <input
                type="text"
                placeholder="e.g. John Banda"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="checkout-two-col">
              <div className="checkout-field-group">
                <label>Email (optional)</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="checkout-field-group">
                <label>Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. 097xxxxxxx"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Payment method */}
            <div className="checkout-field-group">
              <label>Payment method</label>
              <div className="checkout-payment-options">
                <label
                  className={`checkout-pay-option ${
                    paymentMethod === "mtn" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mtn"
                    checked={paymentMethod === "mtn"}
                    onChange={() => setPaymentMethod("mtn")}
                  />
                  {mtnLogo && (
                    <img
                      src={mtnLogo}
                      alt="MTN"
                      className="checkout-pay-option-logo"
                    />
                  )}
                  <span>MTN Mobile Money</span>
                </label>
                <label
                  className={`checkout-pay-option ${
                    paymentMethod === "airtel" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="airtel"
                    checked={paymentMethod === "airtel"}
                    onChange={() => setPaymentMethod("airtel")}
                  />
                  {airtelLogo && (
                    <img
                      src={airtelLogo}
                      alt="Airtel"
                      className="checkout-pay-option-logo"
                    />
                  )}
                  <span>Airtel Money</span>
                </label>
                <label
                  className={`checkout-pay-option ${
                    paymentMethod === "card" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Credit / Debit Card</span>
                </label>
              </div>
            </div>

            {/* Dynamic fields per payment method */}
            {(paymentMethod === "mtn" || paymentMethod === "airtel") && (
              <div className="checkout-field-group">
                <label>
                  {paymentMethod === "mtn" ? "MTN" : "Airtel"} number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 096/097/077xxxxxxx"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <p className="checkout-hint">
                  You’ll receive a prompt on your phone to approve the payment
                  (demo).
                </p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="checkout-card-fields">
                <div className="checkout-field-group">
                  <label>Card number</label>
                  <input
                    type="text"
                    placeholder="1111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="checkout-field-group">
                  <label>Name on card</label>
                  <input
                    type="text"
                    placeholder="As printed on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="checkout-two-col">
                  <div className="checkout-field-group">
                    <label>Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="checkout-field-group">
                    <label>CVC</label>
                    <input
                      type="password"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className="checkout-confirm-btn"
              onClick={handleConfirmPayment}
              disabled={processing}
            >
              {processing ? "Processing…" : "Confirm & pay"}
            </button>

            <p className="checkout-small-print">
              This is a demo checkout. In production, MTN/Airtel/card integrations
              will handle secure payments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
