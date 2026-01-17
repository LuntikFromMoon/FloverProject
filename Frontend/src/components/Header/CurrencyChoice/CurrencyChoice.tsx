import { useState } from 'react';
import styles from './CurrencyChoice.module.css';
import {Arrow} from "../../../assets/icons/Arrow";

export const CategoryChoice = () => {
    const [currencyMenuState, setCurrencyMenuState] = useState(false);

    const toggleCurrencyMenu = () => {
        setCurrencyMenuState(prevState => !prevState);
    };

    return (
        <div onClick={toggleCurrencyMenu}>
            <button className={styles.header__currency}>
                <p className={styles.header__choice}>Руб</p>
                <div className={styles.header__arrow_notact}>
                    <Arrow/>
                </div>
            </button>
            {currencyMenuState ? (
                <div className={styles.header__currMenu_active}>
                    <p className={styles.header__currMenuItem}>Руб</p>
                    <p className={styles.header__currMenuItem}>Евр</p>
                    <p className={styles.header__currMenuItem}>Долл</p>
                </div>
            ) : (
                <div className={styles.header__currMenu}>
                    <p className={styles.header__currMenuItem}>Руб</p>
                    <p className={styles.header__currMenuItem}>Евр</p>
                    <p className={styles.header__currMenuItem}>Долл</p>
                </div>
            )}
        </div>
    );
}
