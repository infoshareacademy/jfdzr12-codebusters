import { PropsWithChildren } from "react"
import styles from "./Paper.module.css"
import classNames from "classnames";
import { useMode } from "@/providers/mode";

export const Paper = ({ children }: PropsWithChildren) => {
  const { mode } = useMode();
  return (
    <div className={classNames(
      styles["paper-container"],
      styles[mode])}>
      {children}
    </div>)
} 