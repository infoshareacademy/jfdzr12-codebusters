import { useContext } from "react";
import classnames from "classnames";
import styles from "./Footer.module.css";
import { ModeContext } from "@/providers/mode";



export const Footer = () => {
    const { mode, } = useContext(ModeContext);

    return (
        <div className={classnames(styles["footer__container"], styles[mode])}>
            <p className={classnames(styles["footer__text"], styles[mode])}>
                Copyright &copy; 2024{" "}
                <span className={styles["footer__text-company"]}>Diary-Daze</span>
            </p>
        </div>
    );
};
