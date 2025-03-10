import styles from "./Option.module.css";

const OptionList = ({classNameList, options, optionClassName}) => {
    return (<div className={styles[classNameList]}>
        {options.map((option, index) => (
            <p key={index} className={styles[optionClassName]}>{option}</p>
        ))}
    </div>)
};

export default OptionList;