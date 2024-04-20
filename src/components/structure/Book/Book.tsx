import { PropsWithChildren } from "react";
import styles from "./Book.module.css"

export const Book = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles["book-container"]}>
            <div className={styles["book"]}>
                <div className={styles["back"]} />
                <div className={styles["page"]} >
                    {children}
                </div >
                <div className={styles["front"]} />
            </div>

        </div>
    )
}