import { assets, site } from '../config.js';
import { scrollToId } from '../utils.js';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__top">
        <h1 id="hero-title" className="hero__title">
          <span className="line"><span>Capturing moments.</span></span>
          <span className="line"><span>Preserving stories.</span></span>
        </h1>
        <p className="hero__lede">{site.description}</p>
      </div>
      <div className="hero__media">
        <img
          src={assets.hero}
          width="2400"
          height="1100"
          fetchPriority="high"
          alt="Placeholder hero photograph: guests gathered at an event in warm evening light"
        />
        <button type="button" className="hero__scroll" onClick={() => scrollToId('work')}>
          <span>Scroll</span>
          <i aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
