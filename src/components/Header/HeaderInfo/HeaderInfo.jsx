import styles from './HeaderInfo.module.css';
import {HeartIcon} from "../../../assets/icons/HeartIcon.jsx";
import {CarIcon} from "../../../assets/icons/CarIcon.jsx";
import {PhoneIcon} from "../../../assets/icons/PhoneIcon.jsx";
import {UserIcon} from "../../../assets/icons/UserIcon.jsx";
// import OptionList from "./Option/Option.jsx";
import {CategoryChoice} from "../CurrencyChoice/CurrencyChoice.jsx";
import {LanguageChoice} from "../LanguageChoice/LanguageChoice.jsx";
import {CityChoice} from "../CityChoice/CityChoice.jsx";

const HeaderInfo = () => {
    return <div className={styles.header__top}>
        <div className={styles.header__nav}>
            <div className={styles.header__item}>
                <p className={styles.header__options}>Валюта</p>
                <CategoryChoice />
            </div>
            <div className={styles.header__item}>
                <p className={styles.header__options}>Язык</p>
                <LanguageChoice />
            </div>
            <div className={styles.header__item}>
                <p className={styles.header__options}>Город</p>
                <CityChoice />
            </div>
            <a className={styles.header__item} href='#'>
                <div className={styles.header__icon}>
                    <HeartIcon/>
                </div>
                <a className={styles.header__options} href='#'>Закладки</a>
            </a>
            <a className={styles.header__item} href='#'>
                <div className={styles.header__icon}>
                    <CarIcon/>
                </div>
                <a className={styles.header__options} href='#'>Доставка и оплата</a>
            </a>
            <a className={styles.header__item} href='#'>
                <div className={styles.header__icon}>
                    <PhoneIcon/>
                </div>
                <a className={styles.header__options} href='#'>Контакты</a>
            </a>
        </div>
        <div className={styles.header__authorization}>
            <a className={styles.header__enter} href='#'>
                <div className={styles.header__icon}>
                    <UserIcon/>
                </div>
                <a className={styles.header__entText} href='#'>Вход</a>
            </a>
            <a href='#'>
                <a className={styles.header__regist} href='#'>Регистрация</a>
            </a>
        </div>
    </div>

};

export default HeaderInfo;