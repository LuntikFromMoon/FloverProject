import styles from "./ProductCard.module.css";
import ProductGallery from './ProductGallery/ProductGallery';
import CatItem from "../../components/Main/MainMiddlePart/CatalogItem/CatalogItem";
import CounterWithButton from "./CounterWithButton/CounterWithButton"
import catalog_photo from "../../assets/pictures/roses.jpg";
import catalog_photo2 from "../../assets/pictures/image 26 (1).png";
import catalog_photo3 from "../../assets/pictures/main_right_first.png";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addToCart} from "../../utils/cartService";

export const ProductCard = () => {
    const { id } = useParams(); // Достаем id из URL
    const [product, setProduct] = useState<any>(null); // Тут будут данные товара
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        // Запрашиваем данные конкретного товара по ID
        fetch(`http://localhost:8000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setProduct(data.product);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки товара:", err);
                setLoading(false);
            });

        //сопутствующие
        fetch(`http://localhost:8000/api/products`)
            .then(res => res.json())
            .then(data => {
                const allProducts = data.products || data;

                const shuffled = [...allProducts]
                    .filter(item => item.id !== Number(id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);

                setRelatedProducts(shuffled);
            })
            .catch(err => console.error("Ошибка загрузки сопутствующих товаров:", err));
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (!product) return <p>Товар не найден</p>;

    const productImages = product?.imagePath
        ? [product.imagePath]
        : [catalog_photo];

    // Функция для добавления в корзину
    const handleAddToCart = (quantity: number) => {
        const newItem = {
            id: Number(id),
            title: product.name,
            price: product.price,
            image: product.imagePath,
            count: quantity
        };
        addToCart(newItem);
    };

    return (
        <div className={styles.productCard}>
            <div className={styles.productCard__review}>
                <div className={styles.productCard__productGallery}>
                    <ProductGallery images={productImages} alt={product.name}/>
                </div>
                <div className={styles.productCard__description}>
                    <p className={styles.productCard__name}>{product.name}</p>
                    <p className={styles.productCard__price}>{product.price} руб.</p>
                    <CounterWithButton
                        min={1}
                        max={50}
                        initial={1}
                        onAddToCart={handleAddToCart}
                    />
                    <p className={styles.productCard__descName}>Описание</p>
                    <p className={styles.productCard__descText}>
                        {product.description || "Описание отсутствует"}
                    </p>
                </div>
            </div>
            <p className={styles.productCard__hintText}>Сопутствующие товары</p>
            <div className={styles.productCard__hint}>
                {relatedProducts.map((item) => (
                    <Link to={`/product/${item.id}`} key={item.id}>
                        <CatItem
                            image={item.imagePath || catalog_photo}
                            title={item.name}
                            price={item.price}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}