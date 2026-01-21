import styles from './MainTopPart.module.css';
import { main_pictures } from "../../../assets/pictures/main_pictures.js";
import { main_map_pic } from "../../../assets/pictures/main_map_pic.jsx";

const MainTopPart = () => {
    return <div>
        <div className={styles.main__top}>
            <div className={styles.main__leftPic}>
                <img src={main_pictures.mainPicFirst} alt="main_left_pic"/>
            </div>
            <div className={styles.main__rightPart}>
                <img src={main_pictures.mainPicSecond} alt="main_left_pic"/>
                <img src={main_pictures.mainPicThird} alt="main_left_pic"/>
                <img src={main_pictures.mainPicFourth} alt="main_left_pic"/>
                <img src={main_pictures.mainPicFifth} alt="main_left_pic"/>
            </div>
        </div>
        <div className={styles.main__map}>
            <a href='#'><img src={main_map_pic.photo} alt='photo'/></a>
            <a href='#'><img src={main_map_pic.video} alt='video'/></a>
            <a href='#'><img src={main_map_pic.present} alt='present'/></a>
        </div>
    </div>
};

export default MainTopPart;