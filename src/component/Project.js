import '../css/project.css';
import { useEffect, useState } from 'react';
import TiltCard from './TiltCard';

const projects = [
    {
        title: 'Student Life',
        desc: 'This is an application that helps facilitate for the KMUTT students such as tell what restaurant around KMUTT.',
    },
    {
        title: 'Tung Tee',
        desc: 'This is the apllication that will bring the group of people that interest in the same thing to be together.',
    },
    {
        title: 'Tung Leua',
        desc: 'This app is use for help the people, restaurant and also reduce the waste food.',
    },
    {
        title: 'Shortlink Service',
        desc: 'A web service that shortens URLs efficiently.',
    },
    {
        title: 'Readee',
        desc: 'An application for exchanging secondhand books—discover and swap books with readers in Thailand.',
    },
];

const Project = ({ setPage }) => {
    const [index, setIndex] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let interval;
        const sync = () => {
            clearInterval(interval);
            if (!hovered && !focused && !preference.matches && !document.hidden) {
                interval = setInterval(() => setIndex(prev => (prev + 1) % projects.length), 3000);
            }
        };
        sync();
        preference.addEventListener('change', sync);
        document.addEventListener('visibilitychange', sync);
        return () => {
            clearInterval(interval);
            preference.removeEventListener('change', sync);
            document.removeEventListener('visibilitychange', sync);
        };
    }, [hovered, focused]);

    const prevSlide = () => setIndex((index - 1 + projects.length) % projects.length);
    const nextSlide = () => setIndex((index + 1) % projects.length);

    return (
        <div className='project'>
            <h1 className='project-title'>Project</h1>
            <div className="project-section" id="projects">
                <div className="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                    onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
                    <button className="nav left" aria-label="Previous project" onClick={prevSlide}>‹</button>
                    <div className="card-container">
                        {projects.map((project, i) => {
                            let className = 'card';
                            if (i === index) className += ' active';
                            else if (i === (index - 1 + projects.length) % projects.length) className += ' left';
                            else if (i === (index + 1) % projects.length) className += ' right';
                            else className += ' hidden';

                            return (
                                <div key={i} className={className} aria-hidden={i !== index}>
                                  <TiltCard className="project-preview" enabled={i === index}>
                                    <h2 className='title-card'>{project.title}</h2>
                                    <p>{project.desc}</p>
                                  </TiltCard>
                                </div>
                            );
                        })}
                    </div>
                    <button className="nav right" aria-label="Next project" onClick={nextSlide}>›</button>
                </div>
            </div>
            <div className="see-all-container">
                <button className="see-all-button" onClick={() => setPage('projects')}>
                    See All
                </button>
            </div>
        </div>
    );
};

export default Project;
