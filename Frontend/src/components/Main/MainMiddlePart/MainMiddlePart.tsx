import styles from './MainMiddlePart.module.css';
import catalog_photo from "../../../assets/pictures/roses.jpg";
import CatItem from "./CatalogItem/CatalogItem";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

interface IProduct {
    id: number;
    name: string;
    price: number;
    imagePath?: string;
}

const MainMiddlePart = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
    const displayedProducts = products.slice(0, 10);

    return <div className={styles.main__middle}>
        <div className={styles.main__title}>
            <p className={styles.main__text}>Каталог</p>
        </div>
        <div className={styles.main__catalog}>
            {loading ? (
                <p>Загрузка...</p>
            ) : displayedProducts.length > 0 ? (
                displayedProducts.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <CatItem
                            image={product.imagePath || catalog_photo}
                            title={product.name}
                            price={product.price}
                        />
                    </Link>
                ))
            ) : (
                <p>Товары не найдены</p>
            )}
        </div>
    </div>
};

export default MainMiddlePart;