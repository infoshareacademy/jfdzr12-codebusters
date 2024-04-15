import { useContext } from "react";
import styles from "./ButtonTransparent.module.css";
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";

interface ButtonTransparentProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => void;
}

export const ButtonTransparent = ({ type = "submit", children, disabled, onClick }: ButtonTransparentProps) => {
    const { mode } = useContext(ModeContext);
    return (
        <div className={classNames(
            styles["button-container"],
            styles[mode],
            { [styles.disabled]: disabled }
        )}>
            <button onClick={onClick} className={classNames(
                styles["button"],
                styles[mode]
            )} type={type}>
                {children}
            </button>
        </div>
    );
};
