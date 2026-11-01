import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';

export default function NotFound() {
  usePageMeta({ title: 'Page not found' });
  return (
    <section className="notfound">
      <p className="label">Error 404</p>
      <h1 className="notfound__title">This page could not be found.</h1>
      <p>The link may be broken, or the project may have been removed.</p>
      <Link to="/" className="btn btn--ink">Back to the work</Link>
    </section>
  );
}
