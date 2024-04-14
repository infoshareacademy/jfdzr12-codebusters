import { PropsWithChildren, useContext } from "react";
import styles from "./HeaderModal.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";

export const HeaderModal = ({ children }: PropsWithChildren) => {
    const { mode } = useContext(ModeContext);

    return (
        <div className={classnames(
            styles["modal-header__container"],
            styles[mode]
        )}>
            {children}
        </div>
    )
}