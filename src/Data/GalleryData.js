import img1 from '../images/gallery/img1.jpg';
import img2 from '../images/gallery/img2.jpg';
import img3 from '../images/gallery/img3.jpg';
import img4 from '../images/gallery/img4.jpg';
import img5 from '../images/gallery/img5.jpg';
import img6 from '../images/gallery/img6.jpg';
import img7 from '../images/gallery/img7.jpg';
import img8 from '../images/gallery/img8.jpg';
import img9 from '../images/gallery/img9.jpg';
import img10 from '../images/gallery/img10.jpg';
import img11 from '../images/gallery/img11.jpg';
import img12 from '../images/gallery/img12.jpg';

export const galleryImages = [
  img1, img2, img3, img4,
  img5, img6, img7, img8,
  img9, img10, img11, img12
];

const galleryAllImages = [];

for (let i=1; i<=45; i++){
  const image = require(`../images/gallery/img${i}.jpg`);
  galleryAllImages.push(image);
}

export default galleryAllImages;

