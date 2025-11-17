// src/components/Newsletter.js
import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <h2 className="newsletter-title">Never Miss a Deal!</h2>
        <p className="newsletter-text">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts.
        </p>

        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault();
            // later we can connect this to backend / API
          }}
        >
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email id"
            required
          />
          <button type="submit" className="newsletter-button">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
