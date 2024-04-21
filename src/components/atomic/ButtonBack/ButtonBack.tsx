import styles from "./ButtonBack.module.css";

export const ButtonBack = () => {
    const handleBack = () => {
        const previousPage = document.referrer;
        if (previousPage && previousPage.includes(window.location.origin)) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div onClick={handleBack} className={styles["button-back"]}>
            <img src="/images/icons/arrows/left.png" alt="back icon" className={styles["button-back__image"]} />
        </div>
    );
};
