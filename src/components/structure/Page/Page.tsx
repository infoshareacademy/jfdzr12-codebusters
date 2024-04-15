import { PropsWithChildren } from "react"
import styles from "./Page.module.css"
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";

export const Page = ({ children }: PropsWithChildren) => {
  const { mode } = useContext(ModeContext);
  return (
    <main className={classNames(
      styles["page-container"],
      styles[mode])}>
      {children}
    </main>)
} 