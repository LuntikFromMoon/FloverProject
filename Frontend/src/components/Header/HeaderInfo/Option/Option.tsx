import styles from "./Option.module.css";

interface OptionListProps {
    classNameList: string;
    options: string[];
    optionClassName: string;
}

const OptionList = ({classNameList, options, optionClassName}: OptionListProps) => {
    return (<div className={styles[classNameList]}>
        {options.map((option, index) => (
            <p key={index} className={styles[optionClassName]}>{option}</p>
        ))}
    </div>)
};

export default OptionList;