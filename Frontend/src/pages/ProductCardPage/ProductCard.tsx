import styles from "./ProductCard.module.css";
import ProductGallery from './ProductGallery/ProductGallery';
import CatItem from "../../components/Main/MainMiddlePart/CatalogItem/CatalogItem";
import CounterWithButton from "../../components/Counter/CounterWithButton"
import catalog_photo from "../../assets/pictures/roses.jpg";
import catalog_photo2 from "../../assets/pictures/image 26 (1).png";
import catalog_photo3 from "../../assets/pictures/main_right_first.png";

export const ProductCard = () => {
    // Функция для добавления в корзину
    const handleAddToCart = (quantity: number) => {
        console.log(`Добавляем ${quantity} товара(ов) в корзину`);
        // Здесь будет реальная логика добавления в корзину
    };

    const productImages = [
        catalog_photo,
        catalog_photo2,
        catalog_photo3,
    ];

    return (
        <div className={styles.productCard}>
            <div className={styles.productCard__review}>
                <div className={styles.productCard__productGallery}>
                    <ProductGallery images={productImages} alt="Букет алых роз"/>
                </div>
                <div className={styles.productCard__description}>
                    <p className={styles.productCard__name}>Алые розы</p>
                    <p className={styles.productCard__price}>4000 руб</p>
                    <CounterWithButton
                        min={1}
                        max={50}
                        initial={1}
                        onAddToCart={handleAddToCart}
                    />
                    <p className={styles.productCard__descName}>Описание</p>
                    <p className={styles.productCard__descText}>Ну типа розы появились давно ну знаете как это бывает ходишь ходишь по местному району в поисках хоть одного иссохшего бархатца который тебе надо было вырастить в домашних условиях ещё 5 месяцев назад в качестве домашнего задания по Окружающему миру, а на дороге прямо перед тобой валяется букетик Алых роз, ну да, не совсем то, что ты искал(а больше и нет ничего), но это ведь лучше, чем пустые руки? подари его географичке, пусть она разочаруется в тебе, но хотя бы с цветочком в руках. Стоит подчеркнуть, что он валялся на дороге, поэтому уже не первой свежести, но и что ты хотел от цветов, чтобы он тебе за 4 тыщи полы дома помыл? Много хочешь, кидай в корзину короче и разговор короткий...</p>
                </div>
            </div>
            <p className={styles.productCard__hintText}>Сопутствующие товары</p>
            <div className={styles.productCard__hint}>
                <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
            </div>
        </div>
    )
}