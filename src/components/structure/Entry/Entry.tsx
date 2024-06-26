import classNames from "classnames";
import styles from "./Entry.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../DeleteModal/DeleteModal"
import { User } from "firebase/auth";
import { useMode } from "@/providers/mode";

interface EntryTypes {
    entry: {
        entry: string;
        timestamp: any;
        id: string;
        updatedTimestamp?: any;
        photo?: string;
    };
    user: User | null;
    updateEntries: (deletedEntryId: string) => void;
}

export const Entry = ({ entry, user, updateEntries }: EntryTypes) => {
    const { mode } = useMode();
    const navigate = useNavigate();
    const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

    const handleClickDeleteEntry = () => {
        setIsUserModalOpen((prevState) => !prevState);
    }

    const handleDeleteConfirmed = async () => {
        await updateEntries(entry.id);
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
                </div>
            </div>
            <div className={classNames(styles["home-section_entry--content"], styles[mode])}>
                <div className={classNames(styles["home-section_entry--content-data"], styles[mode])}>
                    <div className={classNames(styles["home-section_entry--text-container"], styles[mode])}>
                        <div className={classNames(styles["home-section_entry--text"], styles[mode])}>{entry.entry}</div>
                    </div>
                    <div className={styles["home-section__entry-photo--container"]}>
                        {entry.photo && (
                            <img src={entry.photo} alt="Entry Photo" className={styles["entry-photo"]} />)}
                    </div>

                </div>
                {entry.updatedTimestamp && (<div className={classNames(styles["home-section_entry--date-container"], styles[mode])}>
                    <p className={classNames(styles["home-section_entry--date-updated"], styles[mode])}>Updated:</p>
                    <p className={classNames(styles["home-section_entry--date"], styles[mode])}>{entry.updatedTimestamp.toDate().toString()}</p>
                </div>)
                }
                <div className={classNames(styles["home-section_entry--date-container"], styles[mode])}>
                    <p className={classNames(styles["home-section_entry--date-updated"], styles[mode])}>Added:</p>
                    <p className={classNames(styles["home-section_entry--date"], styles[mode])}>{entry.timestamp.toDate().toString()}</p>
                </div>
            </div>
            {isUserModalOpen && <DeleteModal user={user} setIsUserModalOpen={setIsUserModalOpen} entry={entry} handleDeleteConfirmed={handleDeleteConfirmed} ></DeleteModal>}
        </div>
    )
}
