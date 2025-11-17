// src/components/Header.js
import { useState } from "react";
import "./Header.css";
import { assets, menuLinks } from "../assets/assets"; // adjust path if needed

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo (SVG) */}
        <div className="logo" onClick={closeMenu}>
          <img src={assets.logo} alt="Kasupe logo" className="logo-img" />
        </div>

        {/* Center: nav + search (desktop) */}
        <div className="header-center desktop-only">
          <nav className="nav-links">
            {menuLinks.map((link) => (
              <a key={link.path} href={link.path}>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="nav-search">
            <input type="text" placeholder="Search cars" />
            <img
              src={assets.search_icon}
              alt="Search"
              className="search-icon"
            />
          </div>
        </div>

        {/* (Right side removed – no List cars / Login) */}

        {/* Hamburger (mobile) */}
        <button
          className="menu-toggle mobile-only"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <img
            src={isOpen ? assets.close_icon : assets.menu_icon}
            alt="Menu"
            className="menu-icon-img"
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          {menuLinks.map((link) => (
            <a key={link.path} href={link.path} onClick={closeMenu}>
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mobile-search">
          <input type="text" placeholder="Search cars" />
          <img
            src={assets.search_icon}
            alt="Search"
            className="search-icon"
          />
        </div>

        {/* mobile-actions removed (no List cars / Login) */}
      </div>
    </header>
  );
}

export default Header;
