import styles from "./ExperienceCircle.module.css";

export default function ExperienceCircle(props) {

    const { exp, logo } = props;

    const getOffset = () => {
        return ((100-exp)*313.652) / 100;
    }

    return  <div className={styles.container}>
                <svg viewBox="0 0 110 110" width="100" xmlns="http://www.w3.org/2000/svg">
                    <circle className={styles.circle1} strokeLinecap="round" strokeWidth="10" cx="55" cy="55" r="50" fill="transparent" stroke="#d3d3d3"/>
                    <circle className={styles.circle2} style={{strokeDashoffset: getOffset()}} transform="rotate(275 55 55)" strokeLinecap="round" strokeWidth="10" cx="55" cy="55" r="50" fill="transparent" stroke="#6fff8e"/>
                </svg>
                <div style={{backgroundImage: `url("${logo}")`}} className={styles.image}></div>
            </div>
}