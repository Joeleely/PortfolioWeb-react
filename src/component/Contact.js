import '../css/contact.css';
import React, { useEffect, useRef, useState } from 'react';

const Contact = () => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

    return (
        <div className="contact" id="contact" ref={containerRef}>
            {/* <p>Contact</p> */}
            <div className={`socials ${isVisible ? 'visible' : 'hidden'}`}>
                <ul>
                    <li className="item item-1" style={{ '--i': 1 }}>
                        <a href="https://www.facebook.com/varanyu.leelasopin/" target="_blank" rel="noreferrer">
                            <i className="bx bxl-facebook icon"></i>
                        </a>
                    </li>
                    <li className="item item-2" style={{ '--i': 2 }}>
                        <a href="https://www.instagram.com/joe.vry/" target="_blank" rel="noreferrer">
                            <i className="bx bxl-instagram icon"></i>
                        </a>
                    </li>
                    <li className="item item-3" style={{ '--i': 3 }}>
                        <a href="https://www.linkedin.com/in/varanyu-leelasopin-a8b3942a8/" target="_blank" rel="noreferrer">
                            <i className="bx bxl-linkedin icon"></i>
                        </a>
                    </li>
                    <li className="item item-4" style={{ '--i': 4 }}>
                        <a href="https://github.com/Joeleely" target="_blank" rel="noreferrer">
                            <i className="bx bxl-github icon"></i>
                        </a>
                    </li>
                    <li className="item item-5" style={{ '--i': 5 }}>
                        <a href="mailto:Varanyu50015@gmail.com" target="_blank" rel="noreferrer">
                            <i className="bx bxl-gmail icon"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <p className="copyr">©Copyright all rights reserved - "Varanyu Leelasopin"</p>
        </div>
    );
};

export default Contact;