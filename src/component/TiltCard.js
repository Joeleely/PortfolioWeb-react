import { useEffect, useRef } from 'react';
import '../css/tiltCard.css';

export default function TiltCard({ children, className = '', enabled = true }) {
  const card = useRef(null);

  useEffect(() => {
    const element = card.current;
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let point = null;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.removeAttribute('data-tilting');
      ['--card-x', '--card-y', '--shine-x', '--shine-y'].forEach((name) => element.style.removeProperty(name));
    };
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (point.x - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (point.y - bounds.top) / bounds.height));
      element.style.setProperty('--card-x', `${(0.5 - y) * 12}deg`);
      element.style.setProperty('--card-y', `${(x - 0.5) * 12}deg`);
      element.style.setProperty('--shine-x', `${x * 100}%`);
      element.style.setProperty('--shine-y', `${y * 100}%`);
      element.setAttribute('data-tilting', 'true');
    };
    const move = (event) => {
      if (!enabled || !preference.matches || event.pointerType !== 'mouse') return;
      point = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);
    preference.addEventListener('change', reset);
    return () => {
      reset();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      element.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
      preference.removeEventListener('change', reset);
    };
  }, [enabled]);

  return (
    <div className={`tilt-card ${className}`} ref={card}>
      <div className="tilt-card-surface">
        <div className="tilt-card-content">{children}</div>
      </div>
    </div>
  );
}
