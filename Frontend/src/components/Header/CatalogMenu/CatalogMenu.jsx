import styles from './CatalogMenu.module.css';
import {MaimMArrow} from "../../../assets/icons/MainMTriangle.tsx";
import {useState} from "react";

export const CatalogMenu = () => {
    const [catalogMenuState, setCatalogMenuState] = useState(false);

    const toggleCatalogMenu = () => {
        setCatalogMenuState(prevState => !prevState);
    };

    return (
        <button className={styles.header__catalog} onClick={toggleCatalogMenu}>
            <p>Каталог товаров</p>
            <MaimMArrow/>
            {catalogMenuState ? (
                <div className={styles.header__categoryMenu_active}>
                    <p className={styles.header__categoryMenuItem}>Сезонная коллекция</p>
                    <p className={styles.header__categoryMenuItem}>Сборные букеты</p>
                    <p className={styles.header__categoryMenuItem}>Корзины с цветами</p>
                    <p className={styles.header__categoryMenuItem}>Букет невесты</p>
                    <p className={styles.header__categoryMenuItem}>Монобукеты</p>
                    <p className={styles.header__categoryMenuItem}>Другое</p>
                </div>
            ) : (
                <div className={styles.header__categoryMenu}>
                    <p className={styles.header__categoryMenuItem}>Сезонная коллекция</p>
                    <p className={styles.header__categoryMenuItem}>Сборные букеты</p>
                    <p className={styles.header__categoryMenuItem}>Корзины с цветами</p>
                    <p className={styles.header__categoryMenuItem}>Букет невесты</p>
                    <p className={styles.header__categoryMenuItem}>Монобукеты</p>
                    <p className={styles.header__categoryMenuItem}>Другое</p>
                </div>
            )}
        </button>
    );
}