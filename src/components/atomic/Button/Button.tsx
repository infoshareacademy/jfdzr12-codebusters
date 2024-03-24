import { useContext } from "react";
import styles from "./Button.module.css";
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
}

export const Button = ({ type = "button", children }: ButtonProps) => {
    const { mode } = useContext(ModeContext);
    return (
        <div className={classNames(
            styles["button-container"],
            styles[mode]
        )}>
            <button className={classNames(
                styles["button"],
                styles[mode]
            )} type={type}>
                {children}
            </button>
        </div>
    );
};
