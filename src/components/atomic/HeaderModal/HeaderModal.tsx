import { PropsWithChildren } from "react";
import styles from "./HeaderModal.module.css";
import classnames from "classnames";
import { useMode } from "@/providers/mode";

export const HeaderModal = ({ children }: PropsWithChildren) => {
    const { mode } = useMode();

    return (
        <div className={classnames(
            styles["modal-header__container"],
            styles[mode]
        )} id="modal-header__container">
            {children}
        </div>
    )
}