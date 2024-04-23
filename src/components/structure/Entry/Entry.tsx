import classNames from "classnames";
import styles from "./Entry.module.css";
import { useContext, useState } from "react";
import { ModeContext } from "@/providers/mode";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../DeleteModal/DeleteModal"
import { User } from "firebase/auth";
interface EntryTypes {
    entry: {
        entry: string;
        timestamp: any;
        id: string;
        updatedTimestamp?: any;
    };
    user: User | null;
    updateEntries: (deletedEntryId: string) => void;
}

export const Entry = ({ entry, user, updateEntries }: EntryTypes) => {
    const { mode } = useContext(ModeContext);
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
                </div >
            </div>
            <div className={classNames(styles["home-section_entry--content"], styles[mode])}>
                <p className={classNames(styles["home-section_entry--text"], styles[mode])}>{entry.entry}</p>
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
            {isUserModalOpen && <DeleteModal user={user} setIsUserModalOpen={setIsUserModalOpen} id={entry.id} handleDeleteConfirmed={handleDeleteConfirmed} ></DeleteModal>}
        </div>
    )
}