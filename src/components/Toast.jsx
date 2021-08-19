import styles from "./Toast.module.css";

export default function Toast({content, show}) {
    return  <>{show && <div className={styles.container}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff" strokeWidth="2"><path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm-.5 5a1 1 0 1 0 0 2h.5a1 1 0 1 0 0-2h-.5zM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2z"/></svg>
                <div className={styles.content}>{content}</div>
            </div>}</>
}