import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/projects.js';

/** Editorial grid: the layout rhythm repeats every four cards (see components.css). */
export default function ProjectGrid() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="work__head">
        <h2 id="work-title" className="work__title">Selected work</h2>
        <p className="work__note">Every event is an independent visual story.</p>
      </div>
      <div className="grid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
