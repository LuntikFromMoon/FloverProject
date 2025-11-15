import styles from "./FooterInfo.module.css";

const InfoList = ({name, options}) => {
    return (<div className={styles.info}>
        <p className={styles.info__name}>{name}</p>
        {options.map((option, index) => (
            <a href='#' key={index} className={styles.info__text}>{option}</a>
        ))}
    </div>)
};

export default InfoList;