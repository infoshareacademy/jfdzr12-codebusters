import { Page } from "../../structure/Page/Page";
import styles from "./EditEntry.module.css";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { Paper } from "@/components/structure/Paper/Paper";
import { useParams } from "react-router-dom";
import { update } from "firebase/database";
import { setDoc } from "firebase/firestore";

interface EditEntryProps {
    user: User | null;
}

interface EntriesData {
    id: string;
    entry: string;
    timestamp: any;
}

export const EditEntry = ({ user }: EditEntryProps) => {
    const { mode } = useContext(ModeContext);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string | undefined>("");
    const { entryId }: any = useParams();
    console.log(entryId);

    const [entry, setEntry] = useState<string | null | undefined>(null);

    if (!user) {
        console.error('User is not authenticated');
        return <div>User is not authenticated</div>;
    }

    useEffect(() => {
        if (!user) {
            console.log("User is empty");
            return;
        }

        const fetchEntry = async () => {
            try {
                const q = query(collection(db, `entries/${user.uid}/entry`), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                const fetchedEntries = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })) as EntriesData[];

                const entry = fetchedEntries.find((entry) => entry.id === entryId);
                console.log("Fetched entry:", entry);
                setEntry(entry?.entry);
                setEntryText(entry?.entry)

            } catch (error) {
                console.error("Error fetching entries:", error);
                return [];
            }
        };

        fetchEntry();
    }, [user, entryId]);

    console.log("ENTRY", entry);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const updatedEntry = formData.get('entry') as string;

        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        if (!updatedEntry.trim()) {
            setErrorMessage("Entry cannot be empty");
            return;
        }

        const userId = user.uid;

        try {
            const entryRef = doc(db, `entries/${userId}/entry`, entry[0].id);

            await updateDoс(entryRef, {
                entry: updatedEntry,
                timestamp: new Date() // You may want to update the timestamp as well
            });

            setMessage("Entry updated successfully");
            setEntryText(updatedEntry);
        } catch (error) {
            console.error("Error updating entry:", error);
            setErrorMessage("Error updating entry");
        }
    };


    return (
        <Page>
            <div className={classNames(
                styles["entry__area"],
                styles[mode])
            }>
                <Headline text="edit entry" />
                <Paper>
                    <form
                        action=""
                        method="get"
                        className={classNames(styles["entry__form"])}
                        onSubmit={handleSubmit}
                    >
                        <div className={classNames(
                            styles["entry__container"],
                            styles[mode])}>
                            <textarea
                                placeholder="Write your thoughts here..."
                                id="entry"
                                className={classNames(
                                    styles["entry__textarea"],
                                    styles[mode]
                                )}
                                minLength={10}
                                maxLength={500}
                                name="entry"
                                rows={18}
                                cols={50}
                                wrap="off"
                                autoSave=""
                                spellCheck
                                required
                                value={entryText}
                                onChange={(e) => setEntryText(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Add</Button>

                    </form>
                    {message && <div className={classNames(
                        styles["entry__message"],
                        styles[mode])}>{message}</div>}
                    {errorMessage && <div className={classNames(
                        styles["entry__error-message"],
                        styles[mode])}>{errorMessage}</div>}
                </Paper>
            </div>
        </Page>
    );
};
