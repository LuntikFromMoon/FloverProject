import {CategoryTriangle} from "../../../assets/icons/CategoryTriangle.jsx";
import { useState } from 'react';
import styles from './CategoryChoice.module.css';

export const CategoryChoice = () => {
    const [categoryMenuState, setCategoryMenuState] = useState(false);

    const toggleCategoryMenu = () => {
        setCategoryMenuState(prevState => !prevState);
    };

    return (
        <div onClick={toggleCategoryMenu}>
            <button className={styles.header__searchCategoryBar} >
                <CategoryTriangle />
                <p>Поиск по категориям</p>
            </button>
            {categoryMenuState ? (
                <div className={styles.header__categoryMenu_active}>
                    <p className={styles.header__categoryMenuItem}>Букеты</p>
                    <p className={styles.header__categoryMenuItem}>Подарки</p>
                </div>
            ) : (
                <div className={styles.header__categoryMenu}>
                    <p className={styles.header__categoryMenuItem}>Букеты</p>
                    <p className={styles.header__categoryMenuItem}>Подарки</p>
                </div>
            )}
        </div>
    );
}
