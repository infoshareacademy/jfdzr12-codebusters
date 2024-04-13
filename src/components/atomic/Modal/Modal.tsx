import { useContext, FormEventHandler } from "react";
import styles from "./Modal.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { Button } from "../Button/Button";

interface ModalTypes {
    children: React.ReactNode;
    onClickSubmit: FormEventHandler<HTMLFormElement>;
    onClickCancel?: () => void;
};

export const Modal = ({ children, onClickSubmit, onClickCancel }: ModalTypes) => {
    const { mode } = useContext(ModeContext);

    return (
        <form className={classnames(
            styles["modal__container"],
            styles[mode]
        )} onSubmit={onClickSubmit}>
            {children}
            {onClickCancel && <Button type="reset" onClick={onClickCancel}>Cancel</Button>}
            <Button type="submit">Submit</Button>
        </form>
    )
}