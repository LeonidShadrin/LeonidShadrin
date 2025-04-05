import React from 'react';
import { galleryData } from '../data/galleryData';
// import './Gallery.css';

function Gallery() {
  return (
    <div className="Gallery">
      <h1>Галерея</h1>
      <div className="gallery-grid">
        {galleryData.map((image, index) => (
          <img key={index} src={image.url} alt={image.alt} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
