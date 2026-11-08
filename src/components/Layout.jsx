import { useEffect, useState } from 'react';
import { Link, ROUTES } from '../router.jsx';
import './Layout.css';

export function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--ink)" />
      <circle cx="16" cy="16" r="8.5" fill="none" stroke="#fafaf7" strokeWidth="2" />
      <path d="M16 7.5a8.5 8.5 0 0 1 0 17z" fill="#b8a9e3" />
      <circle cx="16" cy="16" r="2.4" fill="#fafaf7" />
    </svg>
  );
}

export function Navbar({ current }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [current]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ROUTES.filter((r) => r.path !== '/');

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${open ? 'navbar--open' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Cognitive Autonomy Toolkit, home">
          <Logo />
          <span>
            Cognitive Autonomy <em>Toolkit</em>
          </span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <nav id="primary-nav" className="navbar__links" aria-label="Primary">
          {links.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className={`navbar__link ${current === r.path ? 'is-active' : ''}`}
              aria-current={current === r.path ? 'page' : undefined}
            >
              {r.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__title">
            <Logo />
            <strong>Cognitive Autonomy Toolkit</strong>
          </div>
          <p>
            A university Social IT Project on cognitive autonomy in the age of generative AI.
            <br />
            <em>AI should assist human intelligence, not replace it.</em>
          </p>
        </div>
        <div className="footer__cols">
          <div>
            <h4>Toolkit</h4>
            {ROUTES.slice(1).map((r) => (
              <Link key={r.path} to={r.path}>
                {r.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>By design</h4>
            <span>No AI APIs</span>
            <span>No accounts</span>
            <span>No data collected</span>
            <span>Runs entirely in your browser</span>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>Social IT Project · Philosophy</span>
        <span>The self-assessment is a reflection tool, not a psychological test.</span>
      </div>
    </footer>
  );
}
