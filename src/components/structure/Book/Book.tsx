import { PropsWithChildren } from "react";
import styles from "./Book.module.css"

export const Book = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className={styles["book"]}>
                <div className={styles["back"]}></div>
                <div className={styles["page6"]}></div >
                <div className={styles["page5"]} ></div >
                <div className={styles["page4"]}></div >
                <div className={styles["page3"]} ></div >
                <div className={styles["page2"]} ></div >
                <div className={styles["page1"]} ></div >
                <div className={styles["front"]} > </div >
            </div >
        </>
    )
}