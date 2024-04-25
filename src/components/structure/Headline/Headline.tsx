import classNames from "classnames";
import styles from "./Headline.module.css";
import { useMode } from "@/providers/mode";
interface HeadlineProps {
    text: string
}

export const Headline = ({ text }: HeadlineProps) => {
    const { mode } = useMode();

    const textArr = text.split("");
    return (
        <div className={classNames(
            styles["headline"],
            styles[mode])} >
            {textArr.map((symbol, index) => {
                return (<div className={classNames(
                    styles["headline__symbol"],
                    styles[mode])} key={index}>
                    {symbol}
                </div>)
            })}
        </div>
    )

}