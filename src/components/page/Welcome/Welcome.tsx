import { Page } from "../../structure/Page/Page"
import styles from "./Welcome.module.css"
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { Headline } from "@/components/structure/Headline/Headline";

export const Welcome = () => {
    const { mode } = useContext(ModeContext);
    return (
        <Page>
            <Headline text="diary daze" />
            <div className={classNames(
                styles["main__paper-area"],
                styles[mode])
            }>
                <p className={classNames(
                    styles["main__handwriting"],
                    styles[mode])}>keep a private online diary</p>
                <p className={classNames(
                    styles["main__normal-text"],
                    styles[mode])}>You want to keep your thoughts in a place where no one can find them? Or capture great ideas so they do not get lost? The online Diary Daze offers you a safe place for your very personal topics.</p>
                {mode === "light" ? (
                    <img className={styles["main__book-image"]} src="images/main/open-book.png" />) : (<img className={styles["main__book-image"]} src="images/main/open-lightbook.png" />)}
                <p className={classNames(styles["main__strong-text"],
                    styles[mode])}>the safest place for your thoughts</p>
            </div>
            {/* <div className={styles["main__headline-area"]}>
                {mode === "light" ? (<img className={styles["main__feather-image"]}
                    src="images/main/feather-pen.png" />) : (<img className={styles["main__feather-image"]}
                        src="images/main/feather-lightpen.png" />)}
            </div> */}
        </Page>
    )
}