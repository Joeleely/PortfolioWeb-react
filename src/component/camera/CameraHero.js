import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiPause, FiPlay, FiRotateCcw } from 'react-icons/fi';
import CameraFallback from './CameraFallback';
import '../../css/camera.css';

const CameraScene = lazy(() => import('./CameraScene'));

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? <CameraFallback /> : this.props.children; }
}

export default function CameraHero() {
  const container = useRef(null);
  const motion = useRef({ x: 0, y: 0 });
  const drag = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [yaw, setYaw] = useState(0);
  const onFailure = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    updateMotion();
    preference.addEventListener('change', updateMotion);
    let inView = true;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    updateVisibility();
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility();
    });
    observer.observe(container.current);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  const rotate = (value) => setYaw((previous) => Math.max(-1.1, Math.min(1.1, previous + value)));
  const stopDrag = () => { drag.current = null; motion.current = { x: 0, y: 0 }; };
  const pointerMove = (event) => {
    if (drag.current && event.pointerId === drag.current.id) {
      rotate((event.clientX - drag.current.x) * 0.008);
      drag.current.x = event.clientX;
    } else if (!reducedMotion && !paused && event.pointerType === 'mouse') {
      const bounds = event.currentTarget.getBoundingClientRect();
      motion.current = { x: (event.clientX - bounds.left) / bounds.width * 2 - 1, y: (event.clientY - bounds.top) / bounds.height * 2 - 1 };
    }
  };

  const interactive = ready && !failed;
  return (
    <figure className="camera-hero" ref={container}>
      <div className="camera-stage" role="group" aria-label="Interactive 3D camera" aria-describedby="camera-hint" tabIndex={interactive ? 0 : undefined}
        onKeyDown={(event) => {
          if (!interactive) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            rotate(event.key === 'ArrowLeft' ? -0.2 : 0.2);
          } else if (event.key === 'Home') { event.preventDefault(); setYaw(0); }
        }}
        onPointerDown={(event) => {
          if (!interactive || event.button !== 0) return;
          drag.current = { id: event.pointerId, x: event.clientX };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={pointerMove} onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag} onPointerLeave={() => { if (!drag.current) stopDrag(); }}>
        <div className="camera-orbit" aria-hidden="true" />
        <div className="camera-ground" aria-hidden="true" />
        <span className="camera-stage-label" aria-hidden="true">THROUGH MY LENS</span>
        <div className="camera-canvas" aria-hidden="true">
          {failed ? <CameraFallback /> : <SceneBoundary onFailure={onFailure}><Suspense fallback={<CameraFallback />}><CameraScene motion={motion} active={visible && !paused && !reducedMotion} yaw={yaw} onFailure={onFailure} onReady={onReady} /></Suspense></SceneBoundary>}
        </div>
        <span className="camera-stage-signature" aria-hidden="true">JOEVRY <span>FRAME / 001</span></span>
      </div>
      <figcaption className="camera-caption">
        <p id="camera-hint">{interactive ? 'Drag to explore · Arrow keys to rotate' : 'A different perspective'}</p>
        {interactive && <div className="camera-controls" role="group" aria-label="Camera controls">
          <button type="button" aria-label="Rotate camera left" onClick={() => rotate(-0.2)} disabled={yaw <= -1.1}><FiArrowLeft /></button>
          {!reducedMotion && <button type="button" aria-label={paused ? 'Resume camera motion' : 'Pause camera motion'} onClick={() => setPaused((value) => !value)}>{paused ? <FiPlay /> : <FiPause />}</button>}
          <button type="button" aria-label="Reset camera view" onClick={() => { setYaw(0); stopDrag(); }}><FiRotateCcw /></button>
          <button type="button" aria-label="Rotate camera right" onClick={() => rotate(0.2)} disabled={yaw >= 1.1}><FiArrowRight /></button>
        </div>}
        <a className="camera-gallery-link" href="#gallery">View photography <FiArrowUpRight aria-hidden="true" /></a>
      </figcaption>
    </figure>
  );
}
