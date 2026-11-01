import { Link } from 'react-router-dom';
import { site } from '../config.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <Link to="/" className="wordmark">Iyad Sebti</Link>
          <p className="footer__small">{site.role}</p>
        </div>
        <ul className="footer__links">
          <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><a href={site.instagramUrl} target="_blank" rel="noreferrer noopener">Instagram {site.instagramHandle}</a></li>
        </ul>
        <p className="footer__small footer__end">
          {site.location}<br />© {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
