import styles from './MainMiddlePart.module.css';
import catalog_photo from "../../../assets/pictures/roses.jpg";
import CatItem from "./CatalogItem/CatalogItem.jsx";
import { useEffect, useState } from "react";

const MainMiddlePart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    return <div className={styles.main__middle}>
        <div className={styles.main__title}>
            <p className={styles.main__text}>Каталог</p>
        </div>
        <div className={styles.main__catalog}>
            {loading ? (
                <p>Загрузка...</p>
            ) : products.length > 0 ? (
                products.map(product => (
                    <CatItem
                        key={product.id}
                        image={product.imagePath || catalog_photo}
                        title={product.name}
                        price={product.price}
                    />
                ))
            ) : (
                <p>Товары не найдены</p>
            )}
        </div>
    </div>
};

export default MainMiddlePart;