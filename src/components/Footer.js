// src/components/Footer.js
import "./Footer.css";
import { assets } from "../assets/assets";

function Footer() {
  const {
    logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    gmail_logo,
  } = assets;

  return (
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

        {/* Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li>Help Center</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Insurance</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>Plot number 1049, Fair view makanta close,(off makishi road)</li>
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
  );
}

export default Footer;
