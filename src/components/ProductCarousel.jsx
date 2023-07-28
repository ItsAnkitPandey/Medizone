import React, { useState, useEffect } from 'react'
import { images } from './Products';


const ProductCarousel = () => {
   
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${image.img})` }}
                    />
                ))}
                
               
            </div>
        </div>
    )
}

export default ProductCarousel