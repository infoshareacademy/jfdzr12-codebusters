import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonBack.module.css";
import { ModeContext } from "@/providers/mode";

export const ButtonBack = () => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate();

    const handleBack = () => {
        const previousPage = document.referrer;
        if (previousPage && previousPage.includes(window.location.origin)) {
            window.history.back();
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        const handleScrollToTop = () => {
            window.scrollTo(0, 0);
        };
        window.addEventListener("popstate", handleScrollToTop);
        return () => {
            window.removeEventListener("popstate", handleScrollToTop);
        };
    }, []);

    return (
        <div onClick={handleBack} className={styles["button-back"]}>
            <img src="/images/icons/arrows/back-button.png" className={styles["button-back__image"]} />

            {mode === "light" ? (
                <img src="/images/icons/arrows/back-button.png" className={styles["button-back__image"]} alt="back icon" />
            ) : (

                <img src="/images/icons/arrows/back-button-dark.png" className={styles["button-back__image"]} alt="back icon" />
            )}
        </div>
    );
};

export default ButtonBack;
