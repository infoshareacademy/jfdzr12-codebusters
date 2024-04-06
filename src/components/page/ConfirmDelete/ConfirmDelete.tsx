import { Page } from "@/components/structure/Page/Page";
import { Paper } from "@/components/structure/Paper/Paper";
import { useContext } from "react";
import styles from "./ConfirmDelete.module.css"
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";

export const ConfirmDelete = () => {
    const { mode } = useContext(ModeContext);

    return (
        <Page>
            <div className={classNames(
                styles["confirm-delete__container"],
                styles[mode]
            )}>
            <Paper>
            <div className={classNames(
                styles["confirm-delete__container-text"],
                styles[mode]
            )}>
                <h2 className={classNames(
                styles["confirm-delete__text"],
                styles[mode]
            )}>Your account has been deleted</h2>

                </div>
            </Paper>
                </div>
        </Page>
    )
}