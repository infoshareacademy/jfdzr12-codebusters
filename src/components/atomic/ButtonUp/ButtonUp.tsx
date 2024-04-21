import { useEffect, useState } from "react";
import styles from "./ButtonUp.module.css";
import classNames from "classnames";

export const ButtonUp = () => {

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
            <img src="/images/icons/arrows/up-button.png" alt="up icon" className={styles["button-up__image"]} />
        </div>
    );
};
