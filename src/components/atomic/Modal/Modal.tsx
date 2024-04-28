import { FormEventHandler } from "react";
import styles from "./Modal.module.css";
import classnames from "classnames";
import { Button } from "../Button/Button";
import { ButtonTransparent } from "../ButtonTransparent/ButtonTransparent";
import { useMode } from "@/providers/mode";

interface ModalTypes {
    children: React.ReactNode;
    onClickSubmit: FormEventHandler<HTMLFormElement>;
    onClickCancel?: () => void;
};

export const Modal = ({ children, onClickSubmit, onClickCancel }: ModalTypes) => {
    const { mode } = useMode();

    return (
        <div className={classnames(styles["background__container"], styles[mode])}>
            <form className={classnames(
                styles["modal__container"],
                styles[mode]
            )} onSubmit={onClickSubmit}>
                {children}
                <div className={classnames(
                    styles["modal__button-container"],
                    styles[mode])}>
                    {onClickCancel && <ButtonTransparent type="reset" onClick={onClickCancel}>Cancel</ButtonTransparent>}
                    <Button type="submit">Confirm</Button></div>
            </form></div>
    )
}