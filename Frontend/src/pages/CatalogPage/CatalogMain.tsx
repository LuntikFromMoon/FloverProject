import styles from "./CatalogMain.module.css";
import { Link } from 'react-router-dom';
import CatItem from "./CatalogItem/CatalogItem";
import catalog_photo from "../../assets/pictures/roses.jpg";
import {useEffect, useState} from "react";

interface ICategory {
    id: number;
    name: string;
}

interface IProduct {
    id: number;
    name: string;
    price: number;
    imagePath?: string;
}

export const CatalogMain = () => {
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [sortType, setSortType] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/product-category')
            .then(res => res.json())
            .then(data => setCategories(data.productCategories))
            .catch(err => console.error("Ошибка категорий:", err));
    }, []);

    useEffect(() => {
        setLoading(true);

        let url = 'http://localhost:8000/api/products';
        if (selectedCategoryId) {
            url += `?category=${selectedCategoryId}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка товаров:", err);
                setLoading(false);
            });
    }, [selectedCategoryId]);

    useEffect(() => {
        setLoading(true);

        const params = new URLSearchParams();

        if (selectedCategoryId) params.append('category', selectedCategoryId.toString());
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
        if (sortType) {
            params.append('sort', sortType);
            params.append('order', sortOrder);
        }

        fetch(`http://localhost:8000/api/products?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setProducts(Array.isArray(data) ? data : data.products);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка фильтрации:", err);
                setLoading(false);
            });
    }, [selectedCategoryId, minPrice, maxPrice, sortType, sortOrder]);

    return (
        <div className={styles.catalogMain}>
            <div className={styles.catalogMain__title}>
                <p className={styles.catalogMain__text}>Каталог товаров</p>
            </div>
            <div className={styles.catalogMain__menu}>
                <div className={styles.catalogMain__settings}>
                    <p className={styles.catalogMain__priceSortTitle}>Цена</p>
                    <div className={styles.catalogMain__priceSortWrapper}>
                        <input
                            type="number"
                            placeholder="От"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="До"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <p className={styles.catalogMain__priceSortTitle}>Сортировка</p>
                    <div className={styles.sortButtons}>
                        <button onClick={() => {
                            setSortType('price');
                            setSortOrder('asc');
                        }}>Сначала дешевые
                        </button>
                        <button onClick={() => {
                            setSortType('price');
                            setSortOrder('desc');
                        }}>Сначала дорогие
                        </button>
                        <button onClick={() => {
                            setSortType('name');
                            setSortOrder('asc');
                        }}>А-Я
                        </button>
                        <button onClick={() => {
                            setSortType('name');
                            setSortOrder('desc');
                        }}>Я-А
                        </button>
                    </div>
                    <p className={styles.catalogMain__priceSortTitle}>Категории</p>
                    <div className={styles.catalogMain__categories}>
                        <p
                            className={!selectedCategoryId ? styles.activeCategory : ''}
                            onClick={() => setSelectedCategoryId(null)}
                        >
                            Все товары
                        </p>
                        {categories.map(cat => (
                            <p
                                key={cat.id}
                                className={selectedCategoryId === cat.id ? styles.activeCategory : ''}
                                onClick={() => setSelectedCategoryId(cat.id)}
                            >
                                {cat.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={styles.catalogMain__catalog}>
                {loading ? (
                        <p>Загрузка цветов...</p>
                    ) : products.length > 0 ? (
                        products.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <CatItem
                                    image={product.imagePath || catalog_photo}
                                    title={product.name}
                                        price={product.price}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p>В этой категории пока нет товаров</p>
                        )}
                </div>
            </div>
        </div>
    )
};