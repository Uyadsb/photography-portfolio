import ContactCTA from '../components/ContactCTA.jsx';
import Reveal from '../components/Reveal.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { assets, site } from '../config.js';

// Placeholder copy: edit freely. Nothing here is a verified credential.
export default function About() {
  usePageMeta({
    title: 'About',
    description: 'Iyad Sebti is an event photographer based in Algeria, focused on people, emotions and atmosphere.',
    image: assets.portrait,
  });

  return (
    <>
      <section className="about">
        <div className="about__media">
          <img src={assets.portrait} width="1200" height="1500" fetchPriority="high"
               alt="Placeholder portrait of Iyad Sebti, event photographer" />
        </div>
        <div className="about__text">
          <p className="label">{site.role}</p>
          <h1 className="about__title">{site.name}</h1>
          <div className="prose">
            <p>I'm Iyad Sebti, an event photographer based in Algeria, passionate about visual storytelling and capturing authentic moments.</p>
            <p>My approach focuses on people, emotions and atmosphere. From the energy of live events to the quieter moments behind the scenes, I aim to document experiences through meaningful photographs.</p>
            <p>For me, photography is not simply about recording what happened. It's about preserving how it felt.</p>
          </div>
          <dl className="about__facts">
            <div><dt>Based in</dt><dd>{site.location}</dd></div>
            <div><dt>Focus</dt><dd>Events and people</dd></div>
            <div><dt>Availability</dt><dd>Get in touch to check your date</dd></div>
          </dl>
        </div>
      </section>

      <section className="approach" aria-labelledby="approach-title">
        <Reveal>
          <h2 id="approach-title" className="approach__title">Working approach</h2>
        </Reveal>
        <div className="approach__cols">
          <Reveal>
            <h3>Before</h3>
            <p>Understanding the event, its people and the moments that matter most to you.</p>
          </Reveal>
          <Reveal>
            <h3>During</h3>
            <p>Staying present and unobtrusive, so moments are captured as they naturally unfold.</p>
          </Reveal>
          <Reveal>
            <h3>After</h3>
            <p>Carefully edited photographs that tell the story of the event in a consistent, natural style.</p>
          </Reveal>
        </div>
      </section>

      <ContactCTA title="Planning something worth remembering?" text="Tell me about your event and let's see how I can help." label="Get in touch" />
    </>
  );
}
