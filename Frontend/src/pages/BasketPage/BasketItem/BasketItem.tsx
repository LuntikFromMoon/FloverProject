import styles from './BasketItem.module.css'
import Counter from "../../../components/Counter/Counter";
import TrashBin from "../../../assets/icons/TrashBin";

interface BasketItemProps {
    id: number;
    image: string;
    title: string;
    price: number;
    count: number;
    onUpdate: (id: number, newCount: number) => void;
    onRemove: (id: number) => void;
}

const BasketItem = ({id, image, title, price, count, onUpdate, onRemove}: BasketItemProps) => {

    return (
        <div className={styles.basketItem}>
            <img src={image} alt={title} className={styles.basketItem__img} />
            <p className={styles.basketItem__title}>{title}</p>
            <p className={styles.basketItem__price}>{price} руб.</p>
            <Counter
                count={count}
                onCountChange={(val) => onUpdate(id, val)}
            />
            <p className={styles.basketItem__total}>{(price*count).toFixed(2)} руб.</p>
            <div className={styles.basketItem__binWrapper} onClick={() => onRemove(id)}>
                <TrashBin/>
            </div>
        </div>
    )
};

export default BasketItem;