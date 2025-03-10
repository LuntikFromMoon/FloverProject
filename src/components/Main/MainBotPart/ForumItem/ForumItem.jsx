import styles from './ForumItem.module.css';

const ForumList = ({image, title, option}) => {
    return (<div className={styles.forumItemf}>
        <img src={image} alt='flower img' className={styles.forumImg}/>
    <div className={styles.forumItem}>
        <p className={styles.forumTitle}>{title}</p>
            <a href='#' className={styles.forumText}>{option}</a>
    </div>
    </div>)
};

export default ForumList;