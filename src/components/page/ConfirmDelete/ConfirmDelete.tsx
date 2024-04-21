import { Page } from "@/components/structure/Page/Page";
import { useContext } from "react";
import styles from "./ConfirmDelete.module.css"
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";
import { Headline } from "@/components/structure/Headline/Headline";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";

export const ConfirmDelete = () => {
    const { mode } = useContext(ModeContext);

    return (
        <Page>
            <ButtonBack />
            <Headline text="Bye bye!"></Headline>
            <div className={classNames(
                styles["confirm-delete__container"],
                styles[mode]
            )}>

                <div className={classNames(
                    styles["confirm-delete__container-text"],
                    styles[mode]
                )}>
                    <div className={classNames(
                        styles["confirm-delete__text-container"],
                        styles[mode]
                    )}></div>
                    <p className={classNames(
                        styles["confirm-delete__text"],
                        styles[mode]
                    )}>Your account has been successfully deleted</p>
                    <p className={classNames(
                        styles["confirm-delete__text"],
                        styles[mode]
                    )}>We will miss you!</p>
                </div>
                <div className={classNames(
                    styles["confirm-delete__container-img"],
                    styles[mode]
                )}>
                    {mode === "light" ? (
                        <img className={styles["byeLight"]} src="images/icons/delete/sad-dog.avif" />) :
                        (<img className={styles["byeNight"]} src="images/icons/delete/sad-dog.avif" />)}
                </div>

            </div>
        </Page>
    )
}