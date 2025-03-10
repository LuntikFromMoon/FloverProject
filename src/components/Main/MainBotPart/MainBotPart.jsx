import styles from './MainBotPart.module.css';
import ForumList from "./ForumItem/ForumItem.jsx";
import {main_forum_pic} from "../../../assets/pictures/main_forum_pic.js";

const MainBotPart = () => {
    return <div className={styles.main__forum}>
        <div className={styles.main__title}>
            <p className={styles.main__text}>Форум</p>
            <a href='#' className={styles.main__news}>Все новости >>></a>
        </div>
        <div className={styles.main__currNews}>
            <ForumList image={main_forum_pic.firstPic} title={'Какие цветы под запретом: что нельзя дарить'} option={'Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...'} />
            <ForumList image={main_forum_pic.secondPic} title={'Как сохранить букет свежим: советы и рекомендации'} option={'Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...'} />
            <ForumList image={main_forum_pic.thirdPic} title={'Цветочный этикет - как правильно дарить цветы'} option={'Осведомленности в сфере новых трендов цветочного дизайна и знакомства с работами...'} />
        </div>
    </div>
};

export default MainBotPart;