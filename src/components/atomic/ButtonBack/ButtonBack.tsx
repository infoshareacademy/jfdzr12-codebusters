import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonBack.module.css";

export const ButtonBack = () => {
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
            <img src="/images/icons/arrows/back-button.png" alt="back icon" className={styles["button-back__image"]} />
        </div>
    );
};

export default ButtonBack;
