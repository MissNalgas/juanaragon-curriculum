import styles from "./Menu.module.css";

import { useState } from "react";

export default function Menu(props) {

    const [languageOpen, setLanguageOpen] = useState(false);
    const [secretOpen, setSecretOpen] = useState(false);
    const {currentLocale, locale, setKey, secretKey} = props;
    const [input, setInput] = useState("");

    const toggleLanguage = (e) => {
        setLanguageOpen(!languageOpen);
    }

    const getButtonLabels = () => {
        switch (currentLocale.locale) {
            case "es":
                return ["en", "ru"]
            case "ru":
                return ["es", "en"]
            default:
                return ["ru", "es"]
        }
    }

    const setLocale = (loc) => {
        document.cookie = `locale=${loc};path=/;SameSite=Strict`;
        window.location.reload();
    }

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleSecret = (e) => {
        e.preventDefault();
        setKey(input);
        setSecretOpen(false);
    }

    return  <div className={styles.container}>
                <a href={`/pdf?key=${secretKey}`} className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="CloudDownload"><path d="M12 22v-9m0 9l-2.5-2m2.5 2l2.5-2"/><path d="M5.034 9.117A4.002 4.002 0 0 0 6 17h1"/><path d="M15.83 7.138a5.5 5.5 0 0 0-10.796 1.98S5.187 10 5.5 10.5"/><path d="M17 17a5 5 0 1 0-1.17-9.862L14.5 7.5"/></svg>
                </a>
                <div className={styles.secretContainer}>
                    <button onClick={() => setSecretOpen(!secretOpen)} className={styles.button}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="LockOff"><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M6 10V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v1"/></svg>
                    </button>
                    <div className={secretOpen ? `${styles.secretForm} ${styles.secretFormOpen}` : styles.secretForm}>
                        <form className={styles.form} onSubmit={handleSecret}>
                            <input placeholder={locale.secretKey} className={styles.input} onChange={handleInput}/>
                            <button className={styles.sendButton}>{locale.send}</button>
                        </form>
                    </div>
                </div>
                <div className={styles.languageContainer}>
                    <button onClick={toggleLanguage} className={styles.button}>
                        <div className={styles.textButton}>{currentLocale.locale}</div>
                    </button>
                    <ul className={languageOpen ? `${styles.languageButtons} ${styles.languageButtonsOpen}` : styles.languageButtons}>
                        <li><button onClick={() => setLocale(getButtonLabels()[0])} className={styles.button}><div className={styles.textButton}>{getButtonLabels()[0]}</div></button></li>
                        <li><button onClick={() => setLocale(getButtonLabels()[1])} className={styles.button}><div className={styles.textButton}>{getButtonLabels()[1]}</div></button></li>
                    </ul>
                </div>
            </div>
}