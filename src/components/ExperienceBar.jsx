import styles from "./ExperienceBar.module.css";

export default function ExperienceBar(props) {

    const { percentage } = props;

    return  <div className={styles.container}>
                <div style={{width: `${percentage}%`}} className={styles.bar}></div>
            </div>
}