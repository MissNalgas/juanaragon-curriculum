import styles from "./App.module.css";
import jsLogo from "./javascript_logo.svg";
import tsLogo from "./typescript_logo.svg";
import cppLogo from "./C++_Logo.svg";
import javaLogo from "./java.svg";
import kotlinLogo from "./Kotlin_logo.svg";
import pythonLogo from "./Python-logo-notext.svg";
import csharpLogo from "./csharp_logo.svg";

import WorkCard from "./components/WorkCard";
import ExperienceBar from "./components/ExperienceBar";
import ExperienceCircle from "./components/ExperienceCircle";
import Menu from "./components/Menu";
import Toast from "./components/Toast";

import { useState, useEffect } from "react";
import { getCatalog, getSecret, getLocale } from "./services/api";
import url from "url";

import meImage from "./images/me.jpg";


function App() {

  const [locale, setLocale] = useState({});
  const [secret, setSecret] = useState({});
  const [isPdf, setIsPdf] = useState(false);
  const [currentLocale, setCurrentLocale] = useState({locale: "en"});
  const [key, setKey] = useState("");
  const [toast, setToast] = useState({show: false, content: ""});

  useEffect(() => {

    getCatalog().then((catalog) => {
      setLocale(catalog);
    })

    getLocale().then((loc) => {
      setCurrentLocale(loc)
    })

    const queryObject = url.parse(window.location.href, true).query;
    if (queryObject.pdf === "true") {
      setIsPdf(true);
    }

    if ("key" in queryObject) {
      setKey(queryObject.key);
    }

  }, [])

  const showToast = (c) => {
    setToast({show: true, content: c});
    setTimeout(() => {
      setToast((s) => ({show: false, content: s.content}));
    }, 4000);
  }


  useEffect(() => {
    if (key === "" || !("invalidKey" in locale)) return;
    getSecret(key).then((data) => {
      setSecret(data);
    }).catch((err) => {
      setSecret({});
      showToast(locale.invalidKey);
    })
  }, [key, locale])

  

  return  <div>
            <Toast show={toast.show} content={toast.content}/>
            { !isPdf && <Menu setKey={setKey}  secretKey={key} locale={locale} currentLocale={currentLocale}/>}
            <div className={styles.mainContainer}>
              <div className={styles.photo}>
                <div className={styles.myPictureContainer}>
                  <div style={{backgroundImage: `url(${meImage})`}} className={styles.myPicture}></div>
                </div>
              </div>
              <div className={styles.contact}>
                <h2>Juan Aragon</h2>
                <h4>{locale.developer}</h4>
                <ul>
                  <li><a target="_blank" rel="noreferrer" href="mailto:me@juanaragon.co">me@juanaragon.co</a></li>
                  <li>{secret.address}</li>
                  <li>{secret.phone}</li>
                  <li>{secret.dob}</li>
                  <li>{locale.colombian}</li>
                  <li><a target="_blank" rel="noreferrer" href="https://juanaragon.co/">juanaragon.co</a></li>
                </ul>
              </div>
              <div className={styles.languages}>
                <h3>{locale.languages}</h3>
                <ul>
                  <li>Español<div style={{padding: "3px 10px"}}><ExperienceBar percentage={100}/></div></li>
                  <li>English <div style={{padding: "3px 10px"}}><ExperienceBar percentage={99}/></div></li>
                  <li>Русский <div style={{padding: "3px 10px"}}><ExperienceBar percentage={90}/></div></li>
                  <li>Fraçais <div style={{padding: "3px 10px"}}><ExperienceBar percentage={40}/></div></li>
                </ul>
              </div>
              <div className={styles.other}>
                <ul>
                  <li>{locale.fourYears}.</li>
                  <li>{locale.russianAdvanced}.</li>
                  <li>{locale.motivated}.</li>
                  <li>{locale.alwaysLooking}.</li>
                  <li>{locale.experiencedSpeaking}.</li>
                  <li>{locale.workingInEnvironments}.</li>
                </ul>
              </div>
              <div className={styles.work}>
                <h3 className={styles.centerText}>{locale.workExperience}</h3>
                <WorkCard locale={locale} title={locale.contentModerator} description={locale.contentModeratorFor}/>
              </div>
              <div className={styles.extras}>
                <h3 className={styles.centerText}>{locale.extras}</h3>
                <ul>
                  <li>{locale.experienceUsing}.</li>
                  <li>{locale.experienceWithThe}.</li>
                  <li>{locale.experienceUsingSSH}.</li>
                  <li>{locale.experienceUsingTheRTMP}.</li>
                  <li>{locale.experienceDeploying}.</li>
                </ul>
              </div>
              <div className={styles.lifeline}>
                 
              </div>
              {isPdf && <div className={styles.pageSeparator}></div>}
              <div className={styles.pLanguages}>
                <h3 className={styles.centerText}>{locale.programmingLanguages}</h3>
                <ul className={styles.squareGrid}>
                  <li><ExperienceCircle logo={jsLogo} exp={99}/></li>
                  <li><ExperienceCircle logo={tsLogo} exp={99}/></li>
                  <li><ExperienceCircle logo={cppLogo} exp={75}/></li>
                  <li><ExperienceCircle logo={javaLogo} exp={80}/></li>
                  <li><ExperienceCircle logo={kotlinLogo} exp={80}/></li>
                  <li><ExperienceCircle logo={pythonLogo} exp={80}/></li>
                  <li><ExperienceCircle logo={csharpLogo} exp={30}/></li>
                </ul>
              </div>
              <div className={styles.dbases}>
                <h3 className={styles.centerText}>{locale.databases}</h3>
                <ul className={styles.squareGrid}>
                  <li><ExperienceCircle logo="data:image/png;base64,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" exp={80}/></li>
                  <li><ExperienceCircle logo="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/1200px-SQLite370.svg.png" exp={85}/></li>
                  <li><ExperienceCircle logo="https://tecnoticias.net/wp-content/uploads/2021/02/mongodb-atlas-google-cloud-partnership-nosql-databases-integrations-2.jpg" exp={40}/></li>
                  <li><ExperienceCircle logo="http://3.bp.blogspot.com/-Ix85v0VprM8/Uv5MYLeNESI/AAAAAAAAJMo/6byKJmT4tx0/s1600/redis318x260_1.png" exp={40}/></li>
                </ul>
              </div>
              <div className={styles.backend}>
                <h3 className={styles.centerText}>{locale.backend}</h3>
                <ul className={styles.squareGrid}>
                  <li><ExperienceCircle logo="https://www.linux.com/wp-content/uploads/2020/10/nodejs-logo-png-transparent-svg-vector-freebie-supply-nodejs-png-800_600.png" exp={95}/></li>
                  <li><ExperienceCircle logo="https://1000marcas.net/wp-content/uploads/2021/06/Django-Logo.png" exp={75}/></li>
                  <li><ExperienceCircle logo="https://www.programandoamedianoche.com/wp-content/uploads/2008/09/asp.net_.logo_.png" exp={35}/></li>
                </ul>
                <ul className={styles.squareGrid}>
                  <li><ExperienceCircle logo="https://1000marcas.net/wp-content/uploads/2021/06/Nginx-Symbol.jpg" exp={95}/></li>
                  <li><ExperienceCircle logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Apache_Feather_Logo.svg/1200px-Apache_Feather_Logo.svg.png" exp={35}/></li>
                </ul>
              </div>
              <div className={styles.frontend}>
                <h3 className={styles.centerText}>{locale.frontend}</h3>
                <ul className={styles.squareGrid}>
                  <li><ExperienceCircle logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/512px-Angular_full_color_logo.svg.png" exp={99}/></li>
                  <li><ExperienceCircle logo="data:image/png;base64,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" exp={99}/></li>
                </ul>
              </div>

            </div>
          </div>
}

export default App;
