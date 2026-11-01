import { useCallback, useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import Lightbox from './Lightbox.jsx';

// Photos may be plain URL strings or { src, width, height, alt } objects.
const normalise = (img, i, title) =>
  typeof img === 'string'
    ? { src: img, width: 1800, height: 1200, alt: `${title}, photograph ${i + 1}` }
    : { width: 1800, height: 1200, alt: `${title}, photograph ${i + 1}`, ...img };

const isWide = (p) => p.width / p.height >= 1.15;

/**
 * Turns a flat list into an editorial sequence of rows, driven by each photo's
 * orientation: wide → inset / full-bleed (alternating, so the first never repeats the cover); tall + tall → offset pair;
 * tall + wide → asymmetric pair (side alternates); a lone tall photo is centred.
 */
function buildRows(photos) {
  const rows = [];
  let wideCount = 0;
  let mixedCount = 0;
  for (let i = 0; i < photos.length; i += 1) {
    const a = photos[i];
    const b = photos[i + 1];
    if (isWide(a)) {
      rows.push({ type: wideCount % 2 === 0 ? 'inset' : 'full', flip: Math.floor(wideCount / 2) % 2 === 1, ids: [i] });
      wideCount += 1;
    } else if (b && !isWide(b)) {
      rows.push({ type: 'pair', flip: false, ids: [i, i + 1] });
      i += 1;
    } else if (b) {
      rows.push({ type: 'mixed', flip: mixedCount % 2 === 1, ids: [i, i + 1] });
      mixedCount += 1;
      i += 1;
    } else {
      rows.push({ type: 'solo', flip: false, ids: [i] });
    }
  }
  return rows;
}

export default function Gallery({ project }) {
  const photos = useMemo(() => project.images.map((img, i) => normalise(img, i, project.title)), [project]);
  const rows = useMemo(() => buildRows(photos), [photos]);
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className="gallery" aria-label={`${project.title} photographs`}>
      {rows.map((row) => (
        <div key={row.ids.join('-')} className={`g-row g-row--${row.type}${row.flip ? ' is-flip' : ''}`}>
          {row.ids.map((idx) => {
            const p = photos[idx];
            return (
              <Reveal as="figure" className="g-fig" key={p.src}>
                <button
                  type="button"
                  className="g-btn"
                  onClick={() => setActive(idx)}
                  aria-label={`Open photograph ${idx + 1} of ${photos.length}: ${p.alt}`}
                >
                  <img src={p.src} width={p.width} height={p.height} loading="lazy" decoding="async" alt={p.alt}
                       style={{ aspectRatio: `${p.width} / ${p.height}` }} />
                </button>
              </Reveal>
            );
          })}
        </div>
      ))}
      {active !== null && <Lightbox items={photos} index={active} onClose={close} onChange={setActive} />}
    </section>
  );
}
