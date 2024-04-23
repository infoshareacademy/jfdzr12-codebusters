import { Page } from "../../structure/Page/Page";
import styles from "./AddEntry.module.css";
import { useContext, useState } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { useNavigate } from "react-router-dom";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { EntryArea } from "@/components/atomic/EntryArea/EntryArea";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
interface EntryProps {
    user: User | null;
}

export const AddEntry = ({ user }: EntryProps) => {
    const { mode } = useContext(ModeContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string>("");
    const navigate = useNavigate();

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
            setEntryText("");
            navigate("/")
        } catch (error) {
            console.log(error);
            setErrorMessage("Error sending entry");
        }
    }

    const handleReset = () => {
        setEntryText("");
        setErrorMessage(null);
    }

    return (
        <Page>
            <ButtonBack />
            <div className={classNames(
                styles["entry__area"],
                styles[mode])
            }>
                <Headline text="new entry" />
                <form className={classNames(styles["entry__form"])}
                    onSubmit={handleSubmit}>

                    <EntryArea value={entryText} onChange={(e) => setEntryText(e.target.value)}>
                    </EntryArea>
                    {errorMessage && <div className={classNames(
                        styles["entry__error-message"],
                        styles[mode])}>{errorMessage}
                    </div>}
                    <div className={classNames(
                        styles["entry__buttons-container"],
                        styles[mode])
                    }>
                        <ButtonTransparent type="reset" onClick={handleReset}>Reset</ButtonTransparent>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </div>
        </Page>
    )
}