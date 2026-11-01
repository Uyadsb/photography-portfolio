import { useEffect } from 'react';
import { site, assets } from '../config';

function setMeta(key, val, content) {
  let el = document.head.querySelector(`meta[${key}="${val}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Sets the document title, meta description and Open Graph tags for a page. */
export default function usePageMeta({ title, description = site.description, image = assets.hero }) {
  useEffect(() => {
    const full = title ? `${title} — ${site.name}` : `${site.name} — ${site.role} in ${site.location}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', image);
  }, [title, description, image]);
}
