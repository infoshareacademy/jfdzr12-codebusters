import classNames from "classnames";
import styles from "./Entry.module.css";
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";
import { useNavigate } from "react-router-dom";

interface EntryTypes {
    entry: {
        entry: string;
        timestamp: any;
        id: string;
    }
}
export const Entry = ({ entry }: EntryTypes) => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate();
    // const handleClickEditEntry = () => {
    //     navigate("/edit-entry")
    // }

    const handleClickDeleteEntry = () => {
        console.log("DELETE ENTRY")

    }

    return (
        <div key={entry.id} className={classNames(styles["home-section_entry"], styles[mode])}>
            <div className={classNames(styles["home-section_entry--icons"], styles[mode])}>
                <div className={classNames(styles["home-section_entry--edit"], styles[mode])}>
                    <button onClick={() => { navigate(`/edit-entry/${entry.id}`) }}>
                        {mode === "light" ? (

                            <img src="/images/icons/home/writing-color.png" className={styles["entry__edit-icon"]} />
                        ) : (

                            <img src="/images/icons/home/writing-color.png" className={styles["entry__edit-icon"]} />
                        )}
                    </button>
                </div>
                <div className={classNames(styles["home-section_entry--delete"], styles[mode])}>
                    <button onClick={handleClickDeleteEntry}>
                        {mode === "light" ? (

                            <img src="/images/icons/home/delete-color.png" className={styles["entry__delete-icon"]} />
                        ) : (

                            <img src="/images/icons/home/delete-color.png" className={styles["entry__delete-icon"]} />
                        )}
                    </button>
                </div >
            </div>
            <div className={classNames(styles["home-section_entry--content"], styles[mode])}>
                <p className={classNames(styles["home-section_entry--text"], styles[mode])}>{entry.entry}</p>
                <p className={classNames(styles["home-section_entry--date"], styles[mode])}>{entry.timestamp.toDate().toString()}</p>
            </div>
        </div>
    )
}