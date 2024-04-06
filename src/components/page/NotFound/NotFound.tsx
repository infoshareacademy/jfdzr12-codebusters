import { Page } from "../../structure/Page/Page";
import styles from "./NotFound.module.css";
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { Headline } from "@/components/structure/Headline/Headline";

export const NotFound = () => {
    const { mode } = useContext(ModeContext);
    return (
        <Page>
            <Headline text="not found" />
            <div className={styles["not-found_container"]}>
                <div className={styles["not-found_paragraph-container"]}>
                    <p className={classNames(
                        styles["not-found_paragraph"],
                        styles[mode]
                    )}>Oops!</p>
                </div>

                <div className={styles["not-found_image-container"]}>
                    {mode === "light" ? (
                        <img src="/images/icons/not-found/404-light.png" alt="not found image" className={classNames(
                            styles["not-found_image"],
                            styles[mode])} />
                    ) : (
                        <img src="/images/icons/not-found/404-dark.png" alt="not found image" className={classNames(
                            styles["not-found_image"],
                            styles[mode]
                        )} />
                    )}
                </div>
            </div>

        </Page>
    )
}