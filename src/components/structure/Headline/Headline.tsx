import classNames from "classnames";
import styles from "./Headline.module.css";
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";

interface HeadlineProps {
    text: string
}

export const Headline = ({ text }: HeadlineProps) => {
    const { mode } = useContext(ModeContext);

    const textArr = text.split("");
    return (
        <h1 className={classNames(
            styles["headline"],
            styles[mode])} >
            {textArr.map((symbol, index) => {
                return (<span key={index}>
                    {symbol}
                </span>)
            })}
        </h1>
    )

}