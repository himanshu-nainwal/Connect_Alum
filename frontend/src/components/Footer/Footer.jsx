import React from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer id='contact' className="footer">
      <div className="container">
        {/* Left Section - Logo & Description */}
        <div>
          <div className="logo-section">
            <h2 className="logo">LOGO</h2>
          </div>
          <p className="description">
            AI-powered legal research platform providing access to landmark
            judgments and legal precedents.
          </p>
          {/* Social Icons */}
          <div className="social-icons">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        {/* Middle Section - Product & Company */}
        <div className="middle-section">
          <div>
            <h3 className="section-title">Product</h3>
            <ul className="section-list">
              <li>Features</li>
              <li>Case Library</li>
              <li>Pricing</li>
              <li>Updates</li>
              <li>Roadmap</li>
              <li>Beta Program</li>
            </ul>
          </div>

          <div>
            <h3 className="section-title">Company</h3>
            <ul className="section-list">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
              <li>Partners</li>
              <li>Legal</li>
            </ul>
          </div>
        </div>

        {/* Right Section - Newsletter Subscription */}
        <div>
          <h3 className="section-title">Subscribe to Our Newsletter</h3>
          <p className="description">
            Get the latest updates, articles, and insights from the legal world.
          </p>
          <div className="newsletter-section">
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
            />
            <button className="newsletter-button">
              Subscribe <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <p>© 2025 LexInsight. All rights reserved.</p>
        <div className="bottom-links">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
          <span>Accessibility</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;