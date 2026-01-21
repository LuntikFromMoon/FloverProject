import styles from "./LanguageChoice.module.css";
import {Arrow} from "../../../assets/icons/Arrow";
import {useState} from "react";


export const LanguageChoice = () => {
    const [languageMenuState, setLanguageMenuState] = useState(false);

    const toggleLanguageMenu = () => {
        setLanguageMenuState(prevState => !prevState);
    };

    return (
        <div onClick={toggleLanguageMenu}>
            <button className={styles.header__language}>
                <p className={styles.header__choice}>RU</p>
                <Arrow/>
            </button>
            {languageMenuState ? (
                <div className={styles.header__currMenu_active}>
                    <p className={styles.header__currMenuItem}>RU</p>
                    <p className={styles.header__currMenuItem}>ENG</p>
                </div>
            ) : (
                <div className={styles.header__currMenu}>
                    <p className={styles.header__currMenuItem}>RU</p>
                    <p className={styles.header__currMenuItem}>ENG</p>
                </div>
            )}
        </div>
    );
}
