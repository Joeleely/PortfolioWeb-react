import '../css/gallery.css';
import galleryImages from '../Data/GalleryData';

const Gallery = ({ setPage }) => {
    return (
        <div className="gallery-home" id='gallery'>
            <div className="gallery-collage">
                {galleryImages.map((img, index) => (
                    <img key={index} src={img} alt={`gallery-img-${index}`} className="collage-img" />
                ))}
            </div>
            <div className="gallery-overlay">
                <button className="gallery-button" onClick={() => setPage('gallery')}>
                    See More
                </button>
            </div>
        </div>
    );
};

export default Gallery;
