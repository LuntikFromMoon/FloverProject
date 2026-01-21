import styles from "./Main.module.css";
import MainTopPart from './MainTopPart/MainTopPart';
import MainBotPart from "./MainBotPart/MainBotPart";
import MainMiddlePart from "./MainMiddlePart/MainMiddlePart.js";

export const Main = () => {
    return ( <div className={styles.main}>
        <MainTopPart/>
        <MainMiddlePart/>
        <MainBotPart/>
    </div>)
};