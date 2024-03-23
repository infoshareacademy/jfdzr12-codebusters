import { PropsWithChildren } from "react"
import styles from "./Page.module.css"

export const Page = ({children}:PropsWithChildren) => {
  return(  
  <div className={styles["page-container"]}>
    {children}
    </div>)
} 