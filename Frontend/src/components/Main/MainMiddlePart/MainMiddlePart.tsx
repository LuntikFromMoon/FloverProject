import styles from './MainMiddlePart.module.css';
import catalog_photo from "../../../assets/pictures/roses.jpg";
import CatItem from "./CatalogItem/CatalogItem";
import {Link} from "react-router-dom";

const MainMiddlePart = () => {
    return <div className={styles.main__middle}>
        <div className={styles.main__title}>
            <p className={styles.main__text}>Каталог</p>
        </div>
        <div className={styles.main__catalog}>
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
};

export default MainMiddlePart;