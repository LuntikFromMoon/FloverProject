import styles from "./Subheader.module.css";
import {FlowerIcon} from "../../../assets/icons/FlowerIcon";
import {CategoryChoice} from "../CategoryChoice/CategoryChoice";
import {LoupeIcon} from "../../../assets/icons/LoupeIcon";
import {HeartIconBig} from "../../../assets/icons/HeartIcon(29px)";
import {Basket} from "../../../assets/icons/Basket(29px)";
import {CatalogMenu} from "../CatalogMenu/CatalogMenu";

export const Subheader = () => {
    return (<div className={styles.header__bottom}>
        <div className={styles.header__logo}>
            <FlowerIcon/>
            <p className={styles.logoTitle}>YoFlower</p>
            <p className={styles.logoSubtitle}>Доставка цветов и подарков</p>
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
                <a href='#'> <HeartIconBig/> </a>
                <a href='#'> <Basket/> </a>
                <p className={styles.header__deferredCost}>1 520 ₽</p>
            </div>
        </div>
    </div>)
}