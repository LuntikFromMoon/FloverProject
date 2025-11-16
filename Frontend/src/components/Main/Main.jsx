import styles from "./Main.module.css";
import MainTopPart from './MainTopPart/MainTopPart.jsx';
import MainBotPart from "./MainBotPart/MainBotPart.jsx";
import MainMiddlePart from "./MainMiddlePart/MainMiddlePart.jsx";

export const Main = () => {
    return ( <div className={styles.main}>
        <MainTopPart/>
        <MainMiddlePart/>
        <MainBotPart/>
    </div>)
};