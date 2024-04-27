import { useState, useEffect } from 'react';
import classNames from "classnames";
import styles from "./Headline.module.css";
import { useMode } from "@/providers/mode";
interface HeadlineProps {
    text: string
}

export const Headline = ({ text }: HeadlineProps) => {
    const { mode } = useMode();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsActive(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const textArr = text.split("");
    return (
        <div className={classNames(
            styles["headline"],
            styles[mode],
            { [styles.active]: isActive }
        )} >
            {textArr.map((symbol, index) => {
                return (<div className={classNames(
                    styles["headline__symbol"],
                    styles[mode]
                )} key={index}>
                    {symbol}
                </div>)
            })}
        </div>
    )
}
