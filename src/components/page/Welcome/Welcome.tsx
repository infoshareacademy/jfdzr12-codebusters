import styles from "./Welcome.module.css"
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { Headline } from "@/components/structure/Headline/Headline";
import { Button } from "@/components/atomic/Button/Button";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate();

    return (
        <div className={classNames(
            styles["welcome__main--container"],
            styles[mode])}>
            <div className={classNames(
                styles["welcome__headline--container"],
                styles[mode])}>
                <div className={classNames(
                    styles["welcome__headline"],
                    styles[mode])}>
                    <Headline text="diary·daze" />
                </div>
                <div className={classNames(
                    styles["welcome__headline--paragraph"],
                    styles[mode])}>Write history of your life</div>
                <div className={classNames(
                    styles["welcome__headline--button"],
                    styles[mode])}>
                    <Button onClick={() => { navigate("/register") }}>Register</Button>
                </div>
            </div>
        </div>
    )
}