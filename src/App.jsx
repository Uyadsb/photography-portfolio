import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import { scrollToId } from './utils.js';

/** Scrolls to top (or to a requested section) and moves focus to <main> on navigation. */
function ScrollManager() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state?.scrollTo) {
      requestAnimationFrame(() => scrollToId(state.scrollTo));
    } else {
      window.scrollTo(0, 0);
      document.getElementById('main')?.focus({ preventScroll: true });
    }
  }, [pathname, state]);
  return null;
}

export default function App() {
  const location = useLocation();

  const skip = (e) => {
    e.preventDefault(); // a plain #main link would clash with the hash router
    const main = document.getElementById('main');
    main?.focus();
    main?.scrollIntoView();
  };

  return (
    <>
      <a href="#/" className="skip-link" onClick={skip}>Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} key={location.pathname} className="page">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
