import styles from "./Main.module.css";
import MainTopPart from './MainTopPart/MainTopPart.jsx';
import MainBotPart from "./MainBotPart/MainBotPart.jsx";

export const Main = () => {
    return ( <div className={styles.main}>
        <MainTopPart/>
        <MainBotPart/>
    </div>)
};