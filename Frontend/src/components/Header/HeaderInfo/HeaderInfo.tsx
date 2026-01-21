import styles from './HeaderInfo.module.css';
import {HeartIcon} from "../../../assets/icons/HeartIcon";
import {CarIcon} from "../../../assets/icons/CarIcon";
import {PhoneIcon} from "../../../assets/icons/PhoneIcon";
import {UserIcon} from "../../../assets/icons/UserIcon";
// import OptionList from "./Option/Option.tsx";
import {CategoryChoice} from "../CurrencyChoice/CurrencyChoice";
import {LanguageChoice} from "../LanguageChoice/LanguageChoice";
import {CityChoice} from "../CityChoice/CityChoice";

const HeaderInfo = () => {
    function OnClickLogin() {
        fetch("http://localhost:8000/api/login", {
            method: "POST",
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

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
                {/*<a className={styles.header__entText} href='#'>Вход</a>*/}
                <button className={styles.header__entText} type={"button"} onClick={OnClickLogin}>Вход</button>
            </a>
            <a href='#'>
                <a className={styles.header__regist} href='#'>Регистрация</a>
            </a>
        </div>
    </div>

};

export default HeaderInfo;