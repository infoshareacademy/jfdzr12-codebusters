import { PropsWithChildren } from "react"
import styles from "./Page.module.css"
import classNames from "classnames";
import { ButtonUp } from "@/components/atomic/ButtonUp/ButtonUp";
import { useMode } from "@/providers/mode";

export const Page = ({ children }: PropsWithChildren) => {
  const { mode } = useMode();
  return (
    <main className={classNames(
      styles["page-container"],
      styles[mode])}>
      {children}
      <ButtonUp />
    </main>)
} 