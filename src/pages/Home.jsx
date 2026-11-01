import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProjectGrid from '../components/ProjectGrid.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import Reveal from '../components/Reveal.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { assets } from '../config.js';

export default function Home() {
  usePageMeta({});
  return (
    <>
      <Hero />
      <ProjectGrid />

      <section className="intro" aria-labelledby="intro-title">
        <Reveal className="intro__media">
          <img src={assets.portrait} width="1200" height="1500" loading="lazy" decoding="async"
               alt="Placeholder portrait of Iyad Sebti, event photographer" />
        </Reveal>
        <Reveal className="intro__text">
          <h2 id="intro-title" className="intro__title">Photography is about preserving how it felt.</h2>
          <p>
            I'm Iyad Sebti, an event photographer based in Algeria, passionate about visual storytelling and
            capturing authentic moments. My approach focuses on people, emotions and atmosphere.
          </p>
          <Link to="/about" className="text-link">More about me</Link>
        </Reveal>
      </section>

      <ContactCTA />
    </>
  );
}
