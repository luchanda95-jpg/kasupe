// src/components/Newsletter.js
import { useState } from "react";
import "./Newsletter.css";
import { apiFetch } from "../utils/api";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!email.trim()) {
      setMsg({ type: "error", text: "Please enter your email." });
      return;
    }

    try {
      setLoading(true);

      const res = await apiFetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Subscription failed.");
      }

      setMsg({ type: "success", text: data?.message || "Subscribed!" });
      setEmail("");
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Subscription failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <h2 className="newsletter-title">Never Miss a Deal!</h2>
        <p className="newsletter-text">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="newsletter-button"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {msg.text && (
          <p
            style={{
              marginTop: "0.6rem",
              fontSize: "0.9rem",
              color: msg.type === "success" ? "#15803d" : "#b91c1c",
            }}
          >
            {msg.text}
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
