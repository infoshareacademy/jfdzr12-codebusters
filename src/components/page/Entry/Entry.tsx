import { Page } from "../../structure/Page/Page";
import styles from "./Entry.module.css";
import { useContext, useState } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
interface EntryProps {
    user: User | null;
}

export const Entry = ({ user }: EntryProps) => {
    const { mode } = useContext(ModeContext);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const entry = formData.get('entry') as string;

        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        if (!entry.trim()) {
            setErrorMessage("Entry cannot be empty");
            return;
        }

        const userId = user.uid;

        try {
            await addDoc(collection(db, `entries/${userId}/entry`), {
                entry,
                email: user.email,
                timestamp: new Date()
            });
            setMessage("Entry sent successfully");
            setEntryText("");
        } catch (error) {
            console.log(error);
            setErrorMessage("Error sending entry");
        }
    }

    return (
        <Page>
            <div className={classNames(
                styles["entry__area"],
                styles[mode])
            }>
                <Headline text="new entry" />
                <form
                    action=""
                    method="get"
                    className={classNames(styles["entry__form"])}
                    onSubmit={handleSubmit}
                >
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
                        rows={20}
                        cols={70}
                        wrap="off"
                        autoSave=""
                        spellCheck
                        required
                        value={entryText}
                        onChange={(e) => setEntryText(e.target.value)}
                    >
                    </textarea>
                    {message && <div className={classNames(
                        styles["entry__message"],
                        styles[mode])}>{message}</div>}
                    {errorMessage && <div className={classNames(
                        styles["entry__error-message"],
                        styles[mode])}>{errorMessage}</div>}
                    <Button type="submit">Add</Button>
                </form>
            </div>
        </Page>
    )
}