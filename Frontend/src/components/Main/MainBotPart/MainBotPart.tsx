import styles from './MainBotPart.module.css';
import ForumList from "./ForumItem/ForumItem";
import {main_forum_pic} from "../../../assets/pictures/main_forum_pic.js";

const MainBotPart = () => {
    return <div className={styles.main__forum}>
        <div className={styles.main__title}>
            <p className={styles.main__text}>Маленькие советы</p>
        </div>
        <div className={styles.main__currNews}>
            <ForumList image={main_forum_pic.firstPic} title={'Воду в вазе нужно менять как минимум раз в два дня,'} option={'а лучше — ежедневно, при этом стоит ополаскивать как вазу, так и стебли цветов.'} />
            <ForumList image={main_forum_pic.secondPic} title={'Цветы любят прохладу.'} option={'Чтобы букет дольше оставался свежим, на ночь можно ставить вазу в холодильник, а днём добавлять в неё кубики льда. '} />
            <ForumList image={main_forum_pic.thirdPic} title={'Освещение имеет значение.'} option={'Даже самое неприхотливое растение не сможет расти без света. Нужно узнать, любит ли цветок прямое или рассеянное освещение, и поставить его в подходящее место.'} />
        </div>
    </div>
};

export default MainBotPart;