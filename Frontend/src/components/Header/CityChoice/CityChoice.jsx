import styles from "./CityChoice.module.css";
import {Arrow} from "../../../assets/icons/Arrow.tsx";
import {useState} from "react";
// import OptionList from "./Option/Option.jsx";

export const CityChoice = () => {
    const [cityMenuState, setCityMenuState] = useState(false);

    const toggleCityMenu = () => {
        setCityMenuState(prevState => !prevState);
    };

    return (
        <div onClick={toggleCityMenu}>
            <button className={styles.header__city}>
                <p className={styles.header__choice}>Йошкар-Ола</p>
                <Arrow/>
            </button>
            {cityMenuState ? (
                <div className={styles.header__currMenu_active}>
                    <p className={styles.header__currMenuItem}>Йошкар-Ола</p>
                    <p className={styles.header__currMenuItem}>Москва</p>
                    <p className={styles.header__currMenuItem}>Чебоксары</p>
                </div>
            ) : (
                <div className={styles.header__currMenu}>
                    <p className={styles.header__currMenuItem}>Йошкар-Ола</p>
                    <p className={styles.header__currMenuItem}>Москва</p>
                    <p className={styles.header__currMenuItem}>Чебоксары</p>
                </div>
            )}
            {/*<OptionList classNameList={'header__currMenu'} optionClassName={'header__currMenuItem'} options={['Йошкар-Ола','Москва', "Питер"]}/>*/}
        </div>
    );
}