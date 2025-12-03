// src/components/Footer.js
import { useEffect, useState } from "react";
import "./Footer.css";
import { assets } from "../assets/assets";

// Re–use the same pattern for API base
const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://kasuper-server-84g2.onrender.com");

function Footer() {
  const {
    logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    gmail_logo,
  } = assets;

  // Which panel is open: 'help' | 'terms' | 'privacy' | 'insurance' | null
  const [activeKey, setActiveKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data coming from backend
  const [footerInfo, setFooterInfo] = useState({
    help: {
      title: "Help Center",
      text:
        "Get guidance on how to book a car, change your booking, or contact support.",
    },
    terms: {
      title: "Terms of Service",
      text:
        "Short summary of our rental rules and responsibilities for both Kasupe and the customer.",
    },
    privacy: {
      title: "Privacy Policy",
      text:
        "We explain how your personal data (phone, email, bookings) is collected and used.",
    },
    insurance: {
      title: "Insurance",
      text:
        "Basic information about vehicle cover, what is included, and what is not.",
    },
  });

  // eslint-disable-next-line no-unused-vars
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [infoError, setInfoError] = useState("");

  // Load footer info from public API
  useEffect(() => {
    const fetchFooterInfo = async () => {
      try {
        setLoadingInfo(true);
        setInfoError("");

        const res = await fetch(`${API_BASE}/api/footer-info`);
        if (!res.ok) {
          throw new Error("Failed to load footer info.");
        }

        const data = await res.json();
        setFooterInfo({
          help: data.help || footerInfo.help,
          terms: data.terms || footerInfo.terms,
          privacy: data.privacy || footerInfo.privacy,
          insurance: data.insurance || footerInfo.insurance,
        });
      } catch (err) {
        console.warn("Footer info API not reachable, using defaults.", err);
        setInfoError("Footer information may be out of date.");
      } finally {
        setLoadingInfo(false);
      }
    };

    fetchFooterInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPanel = (key) => {
    setActiveKey(key);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveKey(null);
  };

  const activePanel = activeKey ? footerInfo[activeKey] : null;

  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          {/* Brand column */}
          <div className="footer-col footer-brand">
            <div className="footer-logo-row">
              <img src={logo} alt="Kasupe logo" className="footer-logo-img" />
              <span className="footer-logo-text">Kasupe Car Hire</span>
            </div>
            <p className="footer-description">
              Premium car rental service with a wide selection of luxury and
              everyday vehicles for all your driving needs.
            </p>

            <div className="footer-socials">
              <button className="footer-social-btn">
                <img src={facebook_logo} alt="Facebook" />
              </button>
              <button className="footer-social-btn">
                <img src={instagram_logo} alt="Instagram" />
              </button>
              <button className="footer-social-btn">
                <img src={twitter_logo} alt="Twitter" />
              </button>
              <button className="footer-social-btn">
                <img src={gmail_logo} alt="Email" />
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Browse Cars</li>
              <li>List Your Car</li>
              <li>About Us</li>
            </ul>
          </div>

          {/* Resources – same look, but items are clickable */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => openPanel("help")}
                >
                  {footerInfo.help.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => openPanel("terms")}
                >
                  {footerInfo.terms.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => openPanel("privacy")}
                >
                  {footerInfo.privacy.title}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link-btn"
                  onClick={() => openPanel("insurance")}
                >
                  {footerInfo.insurance.title}
                </button>
              </li>
            </ul>
            {infoError && (
              <small className="footer-info-warning">{infoError}</small>
            )}
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                Plot number 1049, Fair view makanta close,(off makishi road)
              </li>
              <li>260 979871629</li>
              <li>kasupecarhire@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Kasupe Car Hire. All rights reserved.</span>

          <div className="footer-bottom-links">
            <span>Privacy</span>
            <span>|</span>
            <span>Terms</span>
            <span>|</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>

      {/* Simple modal for the active panel */}
      {isModalOpen && activePanel && (
        <div className="footer-modal-backdrop" onClick={closeModal}>
          <div
            className="footer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="footer-modal-close"
              onClick={closeModal}
            >
              ×
            </button>
            <h3 className="footer-modal-title">{activePanel.title}</h3>
            <p className="footer-modal-text">
              {activePanel.text || "No information added yet."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
