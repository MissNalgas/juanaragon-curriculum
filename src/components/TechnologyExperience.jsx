import styles from "./TechnologyExperience.module.css";

export default function TechnologyExperience(props) {

    const {logo, exp} = props;

    const getInvExp = () => {
        return 100 - exp;
    }

    return  <div className={styles.container}>
                <div style={{backgroundImage: `url("${logo}")`, clipPath: `polygon(0 ${getInvExp()}%, 100% ${getInvExp()}%, 100% 100%, 0 100%)`}} className={styles.foreground}></div>
                <div style={{backgroundImage: `url("${logo}")`}} className={styles.background}></div>
            </div>
}