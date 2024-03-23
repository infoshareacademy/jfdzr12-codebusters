import { Page } from "../../structure/Page/Page"
import styles from "./Main.module.css"

export const Main = () => {
    return (
<Page>
        
        <h1 className={styles["main__headline-name"]}>
            <span>D</span>
            <span>i</span>
            <span>a</span>
            <span>r</span>
            <span>y</span>
            <span></span>
            <span>D</span>
            <span>a</span>
            <span>z</span>
            <span>e</span>
            </h1>
        <div className={styles["main__paper-area"]}>
            <p className={styles["main__handwriting"]}>keep a private online diary</p>
            <p className={styles["main__normal-text"]}>You want to keep your thoughts in a place where no one can find them? Or capture great ideas so they do not get lost? The online Diary Daze offers you a safe place for your very personal topics.</p>
            <img className={styles["main__book-image"]} src="Images/open-book.png" />
            <p className={styles["main__strong-text"]}>the safest place for your thoughts</p>
        </div>
        <div className={styles["main__headline-area"]}>
            <img className={styles["main__feather-image"]} src="Images/feather-pen.png" /> 
        </div>
        </Page>
        )}