import styles from './HeaderInfo.module.css';
import {FlowerIcon} from "../../../assets/icons/FlowerIcon";
import {Link} from "react-router-dom";
import {Basket} from "../../../assets/icons/Basket(29px)";
import {useEffect, useState} from "react";
import {getCart} from "../../../utils/cartService";

const HeaderInfo = () => {
    const [totalCost, setTotalCost] = useState(0);

    const calculateTotal = () => {
        const cartItems = getCart();
        const cost = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);
        setTotalCost(cost);
    };

    useEffect(() => {
        calculateTotal();
        const handleCartUpdate = () => {
            calculateTotal();
        };
        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('storage', handleCartUpdate);
        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
        };
    }, []);

    return <div className={styles.header__top}>
        <div className={styles.header__nav}>
            <div className={styles.header__item}>
                <Link to="/">
                    <div className={styles.header__logo}>
                        <FlowerIcon/>
                        <div className={styles.header__logoText}>
                            <p className={styles.logoTitle}>YoFlower</p>
                            <p className={styles.logoSubtitle}>Доставка цветов и подарков</p>
                        </div>
                    </div>
                </Link>
                <div className={styles.header__logoNext}>
                    <div className={styles.header__logoCity}>
                        <p className={styles.header__options}>Город</p>
                        <p className={styles.header__choice}>Йошкар-Ола</p>
                    </div>
                    <Link to="/catalog">
                        <p className={styles.header__catalog}>Каталог товаров</p>
                    </Link>
                </div>
            </div>
        </div>
        <div className={styles.header__authorization}>
            <div className={styles.header__deferredProd}>
                <p className={styles.header__deferredCost}>{totalCost.toFixed(0)} ₽</p>
                <Link to='/basket' className={styles.header__basket}> <Basket/> </Link>
            </div>
        </div>
    </div>

};

export default HeaderInfo;