import React from "react";
import {Page} from "../../structure/Page/Page"
import styles from "./Main.module.css"

export const Main = () => {
    return (
<Page>
        
        <h1 className={styles["headline-name"]}>
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
            <div className={styles["two-columns"]}>
            <img className={styles["styled-image"]} src="Images/feather-pen.png" />
            <p className={styles["handwriting-text"]}>keep a private online diary</p> </div>
        <div>
            <p className={styles["strong-text"]}>the safest place for your thoughts</p>
            <p className={styles["normal-text"]}>You want to keep your thoughts in a place where no one can find them? Or capture great ideas so they do not get lost? The online Diary Daze offers you a safe place for your very personal topics.</p>
        </div>
        </Page>)
        }