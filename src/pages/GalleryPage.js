import '../css/allGallery.css';
import galleryAllImages from '../Data/GalleryData';
import { useState, useEffect } from 'react';

const GalleryPage = ({ setPage }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const closeModal = () => setSelectedIndex(null);
  const showNext = () => setSelectedIndex((prev) => (prev + 1) % galleryAllImages.length);
  const showPrev = () => setSelectedIndex((prev) => (prev - 1 + galleryAllImages.length) % galleryAllImages.length);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
  const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') showNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') showPrev();
    };

  const handleWheel = (e) => {
    if (selectedIndex === null) return;
    e.preventDefault();
    if (e.deltaY > 50) showNext();
    else if (e.deltaY < -50) showPrev();
  };

  if (selectedIndex !== null) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
  }

  return () => {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('wheel', handleWheel);
  };
}, [selectedIndex]);

 useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gallery" id="gallery">
      <button onClick={() => setPage('home')} className="back-button">← Back</button>
      <h1 className="gallery-title">Gallery</h1>
      <p className='quotes'>"A picture is a moment that never fades."</p>

      <div className="masonry">
        {galleryAllImages.map((img, idx) => (
          <div key={idx} className="masonry-item" onClick={() => setSelectedIndex(idx)}>
            <img src={img} alt={`Gallery ${idx + 1}`} />
          </div>
        ))}
        {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
      </div>

      <div>
        <p className='end'>Thats all :D</p>
      </div>

      {selectedIndex !== null && (
        <div className="gallery-modal" onClick={closeModal}>
          <img
            src={galleryAllImages[selectedIndex]}
            alt="Full view"
            className="modal-image"
            onClick={(e) => e.stopPropagation()} // prevent modal close on img click
          />
          <span className="close-modal" onClick={closeModal}>✕</span>
          <button className="nav-button left" onClick={(e) => { e.stopPropagation(); showPrev(); }}>‹</button>
          <button className="nav-button right" onClick={(e) => { e.stopPropagation(); showNext(); }}>›</button>
        </div>
      )}

    </div>
  );
};

export default GalleryPage;
