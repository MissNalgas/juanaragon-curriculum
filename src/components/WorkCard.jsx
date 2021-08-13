import styles from "./WorkCard.module.css";

export default function WorkCard(props) {

    const { title, description, locale } = props;

    return  <div className={styles.card}>
                <h4>{title}</h4>
                <p>{description}</p>
                <p>{locale.dec} 2020 - {locale.present}</p>
            </div>
}