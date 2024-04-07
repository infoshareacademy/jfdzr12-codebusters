import classNames from "classnames";
import styles from "./Entry.module.css";
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";

interface EntryTypes {
    entry: {
        entry: string;
        timestamp: any;
        id: string;
    }
}
export const Entry = ({ entry }: EntryTypes) => {
    const { mode } = useContext(ModeContext);

    return (
        <div key={entry.id} className={classNames(styles["home-section_entry"], styles[mode])}>
            <div className={classNames(styles["home-section_entry--icons"], styles[mode])}>
                <div className={classNames(styles["home-section_entry--icon"], styles[mode])}>

                </div>
                <div className={classNames(styles["home-section_entry--icon"], styles[mode])}>

                </div >
            </div>
            <div className={classNames(styles["home-section_entry--content"], styles[mode])}>
                <p className={classNames(styles["home-section_entry--text"], styles[mode])}>{entry.entry}</p>
                <p className={classNames(styles["home-section_entry--date"], styles[mode])}>{entry.timestamp.toDate().toString()}</p>
            </div>
        </div>
    )
}