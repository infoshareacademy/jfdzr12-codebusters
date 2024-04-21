import { useContext, useEffect, useState } from "react";
import styles from "./ButtonUp.module.css";
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";

export const ButtonUp = () => {
    const { mode } = useContext(ModeContext);
    const [isVisible, setIsVisible] = useState(false);

    const handleUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div onClick={handleUp} className={classNames(
            styles["button-up"],
            { [styles['show']]: isVisible, [styles['hide']]: !isVisible }
        )}>
            {mode === "light" ? (
                <img src="/images/icons/arrows/up-button.png" className={styles["button-up__image"]} alt="up icon" />
            ) : (
                <img src="/images/icons/arrows/up-button-dark.png" className={styles["button-up__image"]} alt="up icon" />
            )}
        </div>
    );
};
