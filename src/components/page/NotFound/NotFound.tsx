import { Page } from "../../structure/Page/Page";
import styles from "./NotFound.module.css";
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { Headline } from "@/components/structure/Headline/Headline";
import { Link } from "react-router-dom";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";

export const NotFound = () => {
    const { mode } = useContext(ModeContext);
    return (
        <Page>
            <ButtonBack />
            <Headline text="not found" />
            <div className={styles["not-found_container"]}>
                <div className={styles["not-found_paragraph-container"]}>
                    <p className={classNames(
                        styles["not-found_paragraph-main"],
                        styles[mode]
                    )}>Oops!</p>
                    <p className={classNames(
                        styles["not-found_paragraph"],
                        styles[mode]
                    )}>Page not found</p>
                    <p className={classNames(
                        styles["not-found_paragraph"],
                        styles[mode]
                    )}>If something went wrong, <Link className={classNames(
                        styles["not-found_paragraph-link"],
                        styles[mode]
                    )} to="/contact">contact us</Link></p>
                </div>
                <div className={styles["not-found_image-container"]}>
                    <img src="/images/icons/not-found/magnifying-glass.jpeg" alt="not found image" className={classNames(
                        styles["not-found_image"],
                        styles[mode]
                    )} />
                </div>
            </div>
        </Page>
    )
}