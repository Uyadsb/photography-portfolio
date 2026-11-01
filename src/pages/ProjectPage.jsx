import { Link, useNavigate, useParams } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { projects, getProjectIndex, formatDate } from '../data/projects.js';

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const index = getProjectIndex(slug);
  const project = projects[index];

  usePageMeta({
    title: project?.title ?? 'Project not found',
    description: project?.description,
    image: project?.cover,
  });

  if (!project) return <NotFound />;

  const many = projects.length > 1;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const allProjects = (e) => {
    e.preventDefault();
    navigate('/', { state: { scrollTo: 'work' } });
  };

  return (
    <>
      <article>
        <header className="p-intro">
          <h1 className="p-intro__title">{project.title}</h1>
          <dl className="p-intro__meta">
            <div><dt>Category</dt><dd>{project.category}</dd></div>
            <div><dt>Date</dt><dd><time dateTime={project.date}>{formatDate(project.date)}</time></dd></div>
            {project.location && <div><dt>Location</dt><dd>{project.location}</dd></div>}
          </dl>
          <p className="p-intro__desc">{project.description}</p>
        </header>

        <figure className="p-cover">
          <img src={project.cover} width="1800" height="1200" fetchPriority="high"
               alt={project.coverAlt || `Cover photograph for ${project.title}`} />
        </figure>

        <Gallery project={project} />
      </article>

      <nav className="p-nav" aria-label="Project navigation">
        {many ? (
          <Link to={`/work/${prev.slug}`} className="p-nav__item" rel="prev">
            <span className="label">Previous project</span>
            <span className="p-nav__title">{prev.title}</span>
          </Link>
        ) : <span />}
        <a href="#/" onClick={allProjects} className="text-link p-nav__all">All projects</a>
        {many ? (
          <Link to={`/work/${next.slug}`} className="p-nav__item p-nav__item--next" rel="next">
            <span className="label">Next project</span>
            <span className="p-nav__title">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>

      <ContactCTA title="Looking for a photographer for your next event?" text="Tell me about your date, your venue and what matters most." label="Get in touch" />
    </>
  );
}
