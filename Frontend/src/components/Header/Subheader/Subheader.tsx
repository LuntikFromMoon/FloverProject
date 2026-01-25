import styles from "./Subheader.module.css";
import {FlowerIcon} from "../../../assets/icons/FlowerIcon";
import {CategoryChoice} from "../CategoryChoice/CategoryChoice";
import {LoupeIcon} from "../../../assets/icons/LoupeIcon";
import {HeartIconBig} from "../../../assets/icons/HeartIcon(29px)";
import {Basket} from "../../../assets/icons/Basket(29px)";
import {CatalogMenu} from "../CatalogMenu/CatalogMenu";
import {Link} from "react-router-dom";
import {getCart} from "../../../utils/cartService";
import {useEffect, useState} from "react";

export const Subheader = () => {
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
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (<div className={styles.header__bottom}>
        <div className={styles.header__logo}>
            <Link to="/">
                <FlowerIcon/>
                <p className={styles.logoTitle}>YoFlower</p>
                <p className={styles.logoSubtitle}>Доставка цветов и подарков</p>
            </Link>
        </div>
        <div className={styles.header__searchBox}>
            <div className={styles.header__searchProd}>
                <div className={styles.header__searchCategory}>
                    <CategoryChoice/>
                </div>
                <div className={styles.header__searchExactProd}>
                    <p>Поиск по товарам</p>
                    <LoupeIcon/>
                </div>
            </div>
            <div className={styles.header__mainMenu}>
                <CatalogMenu />
                <a href='#'>Форум</a>
                <a href='#'>Отзывы</a>
                <a href='#'>Акции</a>
                <a href='#'>Новости</a>
                <a href='#'>Информация</a>
            </div>
        </div>
        <div className={styles.header__bottomRight}>
            <div className={styles.header__socialNetworks}>
            </div>
            <p className={styles.header__phoneNumb}>+7 902 106 06 45</p>
            <div className={styles.header__deferredProd}>
                <Link to='/basket' className={styles.header__basket}> <Basket/> </Link>
                <p className={styles.header__deferredCost}>{totalCost.toFixed(0)} ₽</p>
            </div>
        </div>
    </div>)
}