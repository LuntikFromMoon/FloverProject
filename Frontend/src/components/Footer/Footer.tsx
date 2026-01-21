import styles from './Footer.module.css';
import {FlowerIcon} from "../../assets/icons/FlowerIcon";
import {PayFirstIcon} from "../../assets/icons/PayFirstIcon";
import {PaySecondIcon} from "../../assets/icons/PaySecondIcon";
import {PayThirdIcon} from "../../assets/icons/PayThirdIcon";
import {PayForthIcon} from "../../assets/icons/PayForthIcon";
import {PayFifthIcon} from "../../assets/icons/PayFifthIcon";
import {PaySixthIcon} from "../../assets/icons/PaySixthIcon";
import InfoList from "./FooterInfo/FooterInfo";

export const Footer = () => {
    return (<div className={styles.footer}>
            <div className={styles.footer__top}>
                <div className={styles.footer__icon}>
                    <FlowerIcon />
                    <p className={styles.logoTitle}>YoFlower</p>
                    <p className={styles.logoSubtitle}>Доставка цветов и подарков</p>
                </div>
                <div className={styles.footer__info}>
                    <InfoList name={'ДОПОЛНИТЕЛЬНО'} options={['ПОДАРОЧНЫЕ СЕРТИФИКАТЫ', 'АКЦИИ', 'ЦВЕТЫ В ОФИС']}/>
                    <InfoList name={'ЛИЧНЫЙ КАБИНЕТ'} options={['ЛИЧНЫЙ КАБИНЕТ', 'ИСТОРИЯ ЗАКАЗА', 'ЗАКЛАДКИ', 'СПИСОК НОВОСТЕЙ']}/>
                    <InfoList name={'СЛУЖБА ПОДДЕРЖКИ'} options={['КАРТА САЙТА', 'ВОЗВРАТ ТОВАРА', 'СВЯЗАТЬСЯ С НАМИ ДЛЯ СОТРУДНИЧЕСТВА']}/>
                    <InfoList name={'ИНФОРМАЦИЯ'} options={['О НАС', 'ДОСТАВКА И ОПЛАТА', 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ']}/>
                </div>
            </div>
            <div className={styles.footer__bot}>
                <p>Copyright © 2025. Все права защищены</p>
                <div className={styles.footer__pay}>
                    <p>Способы оплаты</p>
                    <a href='#'><PayFirstIcon /></a>
                    <a href='#'><PaySecondIcon/></a>
                    <a href='#'><PayThirdIcon/></a>
                    <a href='#'><PayForthIcon/></a>
                    <a href='#'><PayFifthIcon/></a>
                    <a href='#'><PaySixthIcon/></a>
                </div>
            </div>
        </div>
    )
}