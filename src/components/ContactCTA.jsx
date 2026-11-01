import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function ContactCTA({
  title = 'Have an event coming up?',
  text = "Let's make sure its moments are remembered.",
  label = "Let's talk",
}) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Reveal className="cta__inner">
        <h2 id="cta-title" className="cta__title">{title}</h2>
        <div className="cta__side">
          <p>{text}</p>
          <Link to="/contact" className="btn btn--light">{label}</Link>
        </div>
      </Reveal>
    </section>
  );
}
