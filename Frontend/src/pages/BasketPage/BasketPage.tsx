import styles from "./BasketPage.module.css";
import BasketItem from "./BasketItem/BasketItem"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCart, removeFromCart, updateCartQuantity} from "../../utils/cartService";

export const BasketPage = () => {
    const [items, setItems] = useState(getCart());

    useEffect(() => {
        const handleUpdate = () => setItems(getCart());
        window.addEventListener('cart-updated', handleUpdate);
        return () => window.removeEventListener('cart-updated', handleUpdate);
    }, []);

    const totalSum = items.reduce((sum, item) => sum + (item.price * item.count), 0);

    return (
        <div className={styles.basketPage}>
            <p className={styles.basketPage__text}>Корзина</p>
            <div className={styles.basketPage__content}>
                <div className={styles.basketPage__productList}>
                    <div className={styles.basketPage__description}>
                        <p className={styles.basketPage__name}>Название</p>
                        <p className={styles.basketPage__coast}>Цена за шт.</p>
                        <p className={styles.basketPage__count}>Кол-во</p>
                        <p className={styles.basketPage__total}>Итог</p>
                    </div>
                    {items.map(item => (
                        <BasketItem
                            key={item.id}
                            {...item}
                            onUpdate={updateCartQuantity} // Передаем функцию обновления
                            onRemove={removeFromCart}    // И удаления
                        />
                    ))}
                </div>
                <div className={styles.basketPage__cheque}>
                    <p className={styles.basketPage__chequeTitle}>Ваш заказ</p>
                    <div className={styles.basketPage__chequeRow}>
                        <p className={styles.basketPage__chequeTotalTitle}>Всего</p>
                        <p className={styles.basketPage__chequeTotalCost}>{totalSum.toFixed(2)} руб.</p>
                    </div>
                    <Link to='/order'>
                        <p className={styles.basketPage__orderBut}>Оформить заказ</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}