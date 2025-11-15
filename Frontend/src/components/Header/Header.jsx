import styles from './Header.module.css';
import HeaderInfo from "./HeaderInfo/HeaderInfo.jsx";
import {Subheader} from "./Subheader/Subheader.jsx";

export const Header = () => {
  return ( <div className={styles.header}>
    <HeaderInfo />
    <Subheader/>
  </div>)
};