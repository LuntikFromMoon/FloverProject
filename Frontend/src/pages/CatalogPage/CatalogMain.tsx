import styles from "./CatalogMain.module.css";
import { Link } from 'react-router-dom';
import CatItem from "./CatalogItem/CatalogItem";
import catalog_photo from "../../assets/pictures/roses.jpg";

export const CatalogMain = () => {
    return (
        <div className={styles.catalogMain}>
            <div className={styles.catalogMain__title}>
                <p className={styles.catalogMain__text}>Каталог товаров</p>
            </div>
            <div className={styles.catalogMain__menu}>
                <div className={styles.catalogMain__categories}>
                    <p>Каатегории типа</p>
                    <p>Каатегории типа</p>
                    <p>Каатегории типа</p>
                    <p>Каатегории типа</p>
                </div>
                <div className={styles.catalogMain__catalog}>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                    <Link to="/product">
                        <CatItem image={catalog_photo} title={"Алые Розы"} price={4000}></CatItem>
                    </Link>
                </div>
            </div>
        </div>
    )
};