import { useContext } from "react";
import classnames from "classnames";
import styles from "./About.module.css";
import { ModeContext } from "@/providers/mode";




export const About = () => {
    const { mode, } = useContext(ModeContext);


    return (
        <div className={classnames(styles["about-container"], styles[mode])}>
            <h1>About Us</h1>
            <h2 className={classnames(styles["about-text"], styles[mode])}>Welcome to our journaling application!  <b>DIARY-DAZE</b></h2>
            <p className={classnames(styles["about-text"], styles[mode])}>Our mission is to provide a simple and intuitive platform for you to record your daily thoughts, experiences, and reflections.</p>
            <p className={classnames(styles["about-text"], styles[mode])}>With our app, you can easily create new journal entries, organize them by date or category, and revisit them whenever you want.</p>
            <p className={classnames(styles["about-text"], styles[mode])}>Whether you're using journaling as a form of self-expression, personal growth, or simply to keep track of your daily life, we're here to support you on your journey.</p>
            <p className={classnames(styles["about-text"], styles[mode])}>Thank you for choosing our app to be a part of your daily routine.</p>
            <p className={classnames(styles["about-text"], styles[mode])}>If you have any questions or feedback, feel free to contact us!</p>


        </div>
    );
}

