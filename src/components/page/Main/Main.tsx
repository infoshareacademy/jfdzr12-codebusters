import { Page } from "../../structure/Page/Page"
import styles from "./Main.module.css"

export const Main = () => {
    return (
        <Page>

            <h1 className={styles["headline-name"]}>Diary Daze</h1>
            <p className={styles["normal-text"]}>keep a private online diary</p>
            <img className={styles["styled-image"]} src="images/main_banner.jpg" />
            <div>
                <p className={styles["strong-text"]}>the safest place for your thoughts</p>
                <p className={styles["normal-text"]}>You want to keep your thoughts in a place where no one can find them? Or capture great ideas so they do not get lost? The online Diary Daze offers you a safe place for your very personal topics.</p>
            </div>
        </Page>)
}