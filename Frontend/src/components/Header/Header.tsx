import styles from './Header.module.css';
import HeaderInfo from "./HeaderInfo/HeaderInfo";
import {Subheader} from "./Subheader/Subheader";

export const Header = () => {
  return ( <div className={styles.header}>
    <HeaderInfo />
    <Subheader/>
  </div>)
};