import '../css/home.css';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import CameraHero from './camera/CameraHero';
import ParallaxBackground from './ParallaxBackground';

const Home = () => (
  <section className="home" id="home" aria-labelledby="home-heading">
    <ParallaxBackground />
    <div className="home-overlay">
      <div className="home-layout">
        <div className="home-content">
          <p className="home-eyebrow">JOEVRY / CREATIVE PORTFOLIO</p>
          <h1 className="home-title" id="home-heading">Varanyu{' '}<span>Leelasopin<span className="home-period">.</span></span></h1>
          <div className="home-line" />
          <p className="home-subtitle">Photographer · Software Engineer · Video Editor</p>
          <p className="home-description">From a frame to a line of code.<br />Explore the things I build and the moments I capture.</p>
          <a className="home-project-link" href="#projects">Explore projects <FiArrowUpRight aria-hidden="true" /></a>
        </div>
        <CameraHero />
      </div>
      <a className="home-scroll" href="#about"><FiArrowDown aria-hidden="true" /> A little more about me</a>
    </div>
  </section>
);

export default Home;
