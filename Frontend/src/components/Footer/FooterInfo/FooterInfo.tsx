import styles from "./FooterInfo.module.css";
import React from 'react';

interface InfoListProps {
    name: string;
    options: string[]; // или options: Array<string>
}

const InfoList: React.FC<InfoListProps> = ({ name, options }) => {
    return (
        <div className={styles.info}>
            <p className={styles.info__name}>{name}</p>
            {options.map((option, index) => (
                <a href='#' key={index} className={styles.info__text}>
                    {option}
                </a>
            ))}
        </div>)
};

export default InfoList;