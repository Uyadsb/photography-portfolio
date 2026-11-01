import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Chevron = ({ flip }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export default function Lightbox({ items, index, onClose, onChange }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touch = useRef(null);
  const [dir, setDir] = useState(0);
  const n = items.length;
  const item = items[index];

  const go = useCallback(
    (d) => {
      setDir(d);
      onChange((index + d + n) % n);
    },
    [index, n, onChange]
  );

  // Lock scroll, focus the close button, restore focus on unmount.
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, []);

  // Keyboard: arrows, Escape, and a simple focus trap.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll('button');
        if (!f?.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Preload neighbours so navigation feels instant.
  useEffect(() => {
    [1, -1].forEach((d) => {
      const im = new Image();
      im.src = items[(index + d + n) % n].src;
    });
  }, [index, items, n]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  // Portal to <body>: the page's fade-in animation creates a stacking context
  // that would otherwise trap the lightbox beneath the sticky header.
  return createPortal(
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <p className="lightbox__count" aria-live="polite">{index + 1} / {n}</p>
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose}>
        <span>Close</span>
      </button>

      <div className="lightbox__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
           onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img
          key={item.src}
          className={`lightbox__img${dir > 0 ? ' from-right' : dir < 0 ? ' from-left' : ''}`}
          src={item.src}
          width={item.width}
          height={item.height}
          alt={item.alt}
          draggable="false"
        />
      </div>

      {n > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__prev" onClick={() => go(-1)} aria-label="Previous photograph"><Chevron flip /></button>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__next" onClick={() => go(1)} aria-label="Next photograph"><Chevron /></button>
        </>
      )}
    </div>,
    document.body
  );
}
