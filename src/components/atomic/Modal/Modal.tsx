import { useContext } from "react";
import styles from "./Modal.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { Button } from "../Button/Button";

interface ModalTypes {
    children: React.ReactNode;
    onClickSubmit: () => void;
    onClickCancel?: () => void;
};

export const Modal = ({ children, onClickSubmit, onClickCancel } : ModalTypes) => {
    const { mode } = useContext(ModeContext);

    return (
        <div className={classnames(
            styles["modal__container"],
            styles[mode]
        )}>
            {children}
            <Button type="reset" onClick={onClickCancel}>Cancel</Button>
            <Button type="button" onClick={onClickSubmit}>Submit</Button>
        </div>
    )
}