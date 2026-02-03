import styles from './Header.module.css';
import HeaderInfo from "./HeaderInfo/HeaderInfo";

export const Header = () => {
  return ( <div className={styles.header}>
    <HeaderInfo />
  </div>)
};