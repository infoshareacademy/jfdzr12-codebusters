import { useContext } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => void;
}

export const Button = ({ type = "submit", children, disabled, onClick }: ButtonProps) => {
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
