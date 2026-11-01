import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from '../utils.js';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const workActive = pathname === '/' || pathname.startsWith('/work');
  const goWork = (e) => {
    e.preventDefault();
    setOpen(false);
    if (pathname === '/') scrollToId('work');
    else navigate('/', { state: { scrollTo: 'work' } });
  };
  const cls = ({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`;

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="wordmark" aria-label="Iyad Sebti — home">Iyad Sebti</Link>

        <button
          type="button"
          className={`menu-btn${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-btn__bars" aria-hidden="true" />
        </button>

        <nav id="site-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
          <a href="#/" className={`nav__link${workActive ? ' is-active' : ''}`} onClick={goWork}>Work</a>
          <NavLink to="/about" className={cls}>About</NavLink>
          <NavLink to="/contact" className={cls}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
