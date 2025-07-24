import '../css/about.css';
import BirthdayCountdown from './BirthdayCountdown';
import joePhoto from '../images/joe_photo.jpg';
import React, { useEffect, useRef, useState } from 'react';
import { SiAdobepremierepro, SiUbuntu, SiMysql } from 'react-icons/si';
import { FaGuitar, FaGolang } from "react-icons/fa6";
import { FaBookOpen, FaHeadphones } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

const About = () => {
    const aboutRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();

        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    const age = calculateAge('2003-03-10');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        if (aboutRef.current) observer.observe(aboutRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="about" id="about" ref={aboutRef}>
            <h1 className='about-title'>About Me</h1>

            <div className="aboutBody">
                <div className={`about-photo ${isVisible ? 'slide-photo' : ''}`}>
                    <img className="photo" src={joePhoto} alt="Varanyu Leelasopin" />
                </div>
                <div className={`about-text ${isVisible ? 'slide-text' : ''}`}>
                    <h2>Varanyu Leelasopin</h2>
                    <p>Nickname: Joe&nbsp;|&nbsp;Age: {age}</p>
                    <div className='birth'><p>Birth: 10 March 2003&nbsp;|&nbsp;</p><BirthdayCountdown /></div>
                    <p>Bachelor Degree at KMUTT</p>
                    <p>Computer-Science</p>
                    <button className="toggle-button" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show less' : 'Show more'}
                    </button>
                </div>
            </div>

            {/* Skill Blocks */}
            {showMore && (
                <div className={"more-info"}>
                    <div className="info-grid">
                        <div className="info-block" onClick={() => setActiveModal('dev')}>
                            <h3>Development Skills</h3>
                            <div className="icon-group">
                                <i className="bx bxl-html5" title="HTML"></i>
                                <i className="bx bxl-css3" title="CSS"></i>
                                <i className="bx bxl-bootstrap" title="Bootstrap"></i>
                                <i className="bx bxl-tailwind-css" title="TailwindCSS"></i>
                                <i className="bx bxl-javascript" title="Javascript"></i>
                                <i className="bx bxl-typescript" title="Typescript"></i>
                                {/* <i class="bx bxl-vite-js" title="CSS"></i>  */}
                                <i className="bx bxl-react" title="React"></i>
                                <i className="bx bxl-nodejs" title="Nodejs"></i>
                                <i className="bx bxl-flutter" title="Flutter"></i>
                                <FaGolang className="skill-icon" title="Golang"/>
                                <i className="bx bxl-docker" title="Docker"></i>
                                <i className="bx bxl-postgresql" title="PostgreSQL"></i>
                                <SiUbuntu className="skill-icon" title="Ubuntu" />
                                <SiMysql className="skill-icon" title="MySQL" />
                            </div>
                        </div>
                        <div className="info-block" onClick={() => setActiveModal('other')}>
                            <h3>Other Skills</h3>
                            <div className="icon-group">
                                <i className="bx bxl-figma" title="Figma"></i>
                                <SiAdobepremierepro className="skill-icon" title="Premiere Pro" />
                            </div>
                        </div>
                        <div className="info-block" onClick={() => setActiveModal('hobby')}>
                            <h3>Hobbies</h3>
                            <div className="icon-group">
                                <i className="bx bxs-camera" title="Photographer"></i>
                                <i className="bx bxs-joystick" title="Game"></i>
                                <FaGuitar className="skill-icon" title="Guitar" />
                                <FaBookOpen className="skill-icon" title="Reading" />
                                <FaHeadphones className="skill-icon" title="Music" />
                                <CgGym className="skill-icon" title="Gym" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeModal && (
                <div className="modal-overlay" onClick={() => setActiveModal(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setActiveModal(null)}>×</button>
                        {activeModal === 'dev' &&
                            <div>
                                <h2>Development Skills</h2>
                                <div className="icon-group-plus">
                                    <div className='info-icon'><i className="bx bxl-html5" title="HTML"><p>Html</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-css3" title="CSS"><p>CSS</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-bootstrap" title="Bootstrap"><p>Bootstrap</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-tailwind-css" title="TailwindCSS"><p>TailwindCSS</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-javascript" title="Javascript"><p>Javascript</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-typescript" title="Typescript"><p>Typescript</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-react" title="React"><p>React</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-nodejs" title="Nodejs"><p>Nodejs</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-flutter" title="Flutter"><p>Flutter</p></i></div>
                                    <div className='info-icon-react'><FaGolang className="skill-icon" title="Golang"/><span>Golang</span></div>
                                    <div className='info-icon'><i className="bx bxl-docker" title="Docker"><p>Docker</p></i></div>
                                    <div className='info-icon'><i className="bx bxl-postgresql" title="PostgreSQL"><p>PostgreSQL</p></i></div>
                                    <div className='info-icon-react'><SiUbuntu className="skill-icon" title="Ubuntu" /><span>Ubuntu</span></div>
                                    <div className='info-icon-react'><SiMysql className="skill-icon" title="MySQL" /><span>MySQL</span></div>                                
                                </div>
                            </div>
                        }
                        {activeModal === 'other' &&
                            <div>
                                <h2>Other Skills</h2>
                                <div className="icon-group-plus">
                                    <div className='info-icon'><i className="bx bxl-figma" title="Figma"><p>Figma</p></i> </div>
                                    <div className='info-icon-react'><SiAdobepremierepro className="skill-icon" title="Premiere Pro" /><span>Premiere Pro</span></div>                             
                                </div>
                            </div>
                        }
                        {activeModal === 'hobby' &&
                            <div>
                                <h2>Hobbies</h2>
                                <div className="icon-group-plus">
                                    <div className='info-icon'><i className="bx bxs-camera" title="Photographer"><p>Photographer</p></i></div>
                                    <div className='info-icon'><i className="bx bxs-joystick" title="Game"><p>Game</p></i></div>
                                    <div className='info-icon-react'><FaGuitar className="skill-icon" title="Guitar" /><span>Guitar</span></div>
                                    <div className='info-icon-react'><FaBookOpen className="skill-icon" title="Reading" /><span>Reading</span></div>   
                                    <div className='info-icon-react'><FaHeadphones className="skill-icon" title="Music" /><span>Music</span> </div>   
                                    <div className='info-icon-react'><CgGym className="skill-icon" title="Gym" /><span>Gym</span> </div>  
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;