import { Page } from "../../structure/Page/Page";
import styles from "./Entry.module.css";
import { useContext, useState } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
interface EntryProps {
    user: User | null;
}

export const Entry = ({ user }: EntryProps) => {
    const { mode } = useContext(ModeContext);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const entry = formData.get('entry') as string;

        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        if (!entry.trim()) {
            setMessage("Entry cannot be empty");
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
        } catch (error) {
            console.log(error);
            setMessage("Error sending entry");
        }
    }

    return (
        <Page>
            <div className={classNames(
                styles["entry__area"],
                styles[mode])
            }>
                <h2 className={classNames(
                    styles["entry__headline"],
                    styles[mode])}>Your new entry </h2>
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
                    >
                    </textarea>
                    {message && <div>{message}</div>}
                    <button>Add</button>
                    {/* <Button>Add</Button> */}
                </form>
            </div>
        </Page>
    )
}