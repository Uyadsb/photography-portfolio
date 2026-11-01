import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { getYear } from '../data/projects.js';

export default function ProjectCard({ project }) {
  return (
    <Reveal as="article" className="card">
      <Link to={`/work/${project.slug}`} className="card__link">
        <div className="card__media">
          <img src={project.cover} width="1800" height="1200" loading="lazy" decoding="async" alt={project.coverAlt || `Cover photograph for ${project.title}`} />
        </div>
        <h3 className="card__title"><span>{project.title}</span></h3>
        <p className="card__meta">
          <span>{project.category}</span>
          <span>{getYear(project.date)}</span>
          {project.location && <span>{project.location}</span>}
        </p>
      </Link>
    </Reveal>
  );
}
