import { useState } from 'react';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
    images: string[];
    alt?: string;
}

const ProductGallery = ({ images, alt = 'Товар' }: ProductGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className={styles.gallery}>
            <div className={styles.mainImage}>
                <img
                    src={images[selectedImage]}
                    alt={`${alt} - фото ${selectedImage + 1}`}
                    className={styles.mainImage__img}
                />
            </div>

            <div className={styles.thumbnails}>
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={`${styles.thumbnail} ${
                            selectedImage === index ? styles.thumbnail_active : ''
                        }`}
                        onClick={() => setSelectedImage(index)}
                        aria-label={`Показать фото ${index + 1}`}
                    >
                        <img
                            src={image}
                            alt={`${alt} - миниатюра ${index + 1}`}
                            className={styles.thumbnail__img}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;