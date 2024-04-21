import styles from "./ButtonUp.module.css";

export const ButtonUp = () => {
    const handleUp = () => {
    };

    return (
        <div onClick={handleUp} className={styles["button-back"]}>
            <img src="/images/icons/arrows/up-button.png" alt="up icon" className={styles["button-back__image"]} />
        </div>
    );
};
