import styles from './CatalogItem.module.css';
import {Basket} from "../../../assets/icons/Basket(29px)_white";

interface CatItemProps {
    image: string;
    title: string;
    price: number;
}

const CatItem = ({image, title, price}: CatItemProps) => {
    return (<div className={styles.catalogItemf}>
        <div className={styles.catalogImgContainer}>
            <img src={image} alt='flower img' className={styles.catalogImg}/>
        </div>
        <div className={styles.catalogItem}>
            <p className={styles.catalogTitle}>{title}</p>
            <p className={styles.catalogText}>{price} руб</p>
            <a href='#' className={styles.orderButton}>
                <Basket/>
                <p className={styles.orderButton__text}>Заказать</p>
            </a>
        </div>
    </div>)
};

export default CatItem;