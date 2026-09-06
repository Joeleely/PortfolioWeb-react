import { useEffect, useRef } from 'react';
import '../css/parallaxBackground.css';

export default function ParallaxBackground() {
  const background = useRef(null);
  useEffect(() => {
    const element = background.current;
    const hero = element.parentElement;
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let inView = true;
    let frame = 0;
    let x = 0;
    let y = 0;
    const render = () => {
      frame = 0;
      const bounds = hero.getBoundingClientRect();
      const scroll = Math.max(0, Math.min(bounds.height, -bounds.top));
      element.style.setProperty('--parallax-x', `${x}px`);
      element.style.setProperty('--parallax-y', `${y}px`);
      element.style.setProperty('--parallax-scroll', `${Math.min(scroll * 0.09, 70)}px`);
    };
    const schedule = () => {
      if (preference.matches && inView && !document.hidden && !frame) frame = requestAnimationFrame(render);
    };
    const reset = () => {
      x = 0;
      y = 0;
      schedule();
    };
    const move = (event) => {
      if (!preference.matches || !pointer.matches || event.pointerType !== 'mouse') return;
      const bounds = hero.getBoundingClientRect();
      x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 20;
      y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
      schedule();
    };
    const syncPreference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      x = 0;
      y = 0;
      element.removeAttribute('style');
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView) { cancelAnimationFrame(frame); frame = 0; }
      else schedule();
    });
    observer.observe(hero);
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    preference.addEventListener('change', syncPreference);
    pointer.addEventListener('change', syncPreference);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      preference.removeEventListener('change', syncPreference);
      pointer.removeEventListener('change', syncPreference);
    };
  }, []);

  return (
    <div className="parallax-background" ref={background} aria-hidden="true">
      <div className="parallax-photo" />
      <div className="parallax-wash" />
      <div className="parallax-glow" />
      <div className="parallax-grid" />
    </div>
  );
}
