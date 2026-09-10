export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-mark" />
              VEGE·GROUT
            </div>
            <p>
              Self-sustaining soil stabilization from vegetable waste.
              Developed with UNITEN, deployed with Geomapping Technology Sdn
              Bhd.
            </p>
            <a
              className="foot-wa"
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "60123456789"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Us
            </a>
          </div>
          <div>
            <h4>Site</h4>
            <ul className="footer-links">
              <li><a href="/technology">Technology</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/projects">Case Studies</a></li>
              <li><a href="/partners">Partners</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li>hello@vegegrout.com</li>
              <li>+60 12-345 6789</li>
              <li>Kajang, Selangor, MY</li>
            </ul>
          </div>
          <div>
            <h4>Credentials</h4>
            <ul className="footer-links">
              <li>Patent MY-174566-A</li>
              <li>TRL 7 · Field Proven</li>
              <li>BS 1377 Compliant Testing</li>
            </ul>
          </div>
        </div>
        <div className="bottom-bar">
          <span>
            © 2026 VEGE-GROUT (VG3S). All rights reserved. — dummy content
            for design preview
          </span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
