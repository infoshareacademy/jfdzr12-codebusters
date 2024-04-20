import { Page } from "../../structure/Page/Page";
import styles from "./EditEntry.module.css";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { EntryArea } from "@/components/atomic/EntryArea/EntryArea";

interface EditEntryProps {
    user: User | null;
}

interface EntriesData {
    id: string;
    entry: string;
    timestamp: any;
    updatedTimestamp?: any
}

export const EditEntry = ({ user }: EditEntryProps) => {
    const { mode } = useContext(ModeContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string | undefined>("");
    const [originalEntryText, setOriginalEntryText] = useState<string | undefined>("");
    const { entryId }: any = useParams();
    const navigate = useNavigate();

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
                setEntryText(entry?.entry);
                setOriginalEntryText(entry?.entry);

            } catch (error) {
                console.error("Error fetching entries:", error);
                return [];
            }
        };

        fetchEntry();
    }, [user, entryId]);

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
            await updateDoc(doc(db, `entries/${userId}/entry`, entryId), {
                entry: entryText,
                updatedTimestamp: new Date()
            });
            navigate("/")
        } catch (error) {
            console.log(error);
            setErrorMessage("Error editing entry");
        }
    };

    const handleReset = () => {
        setEntryText(originalEntryText);
    }

    return (
        <Page>
            <div className={classNames(
                styles["entry__area"],
                styles[mode])
            }>
                <Headline text="edit entry" />
                <form
                    action=""
                    method="get"
                    className={classNames(styles["entry__form"])}
                    onSubmit={handleSubmit}
                >
                    <EntryArea value={entryText} onChange={(e) => setEntryText(e.target.value)} />
                    <div className={classNames(
                        styles["entry__buttons-container"],
                        styles[mode])
                    }>
                        <ButtonTransparent type="reset" onClick={handleReset}>Reset</ButtonTransparent>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
                {errorMessage && <div className={classNames(
                    styles["entry__error-message"],
                    styles[mode])}>{errorMessage}</div>}
            </div>
        </Page>
    );
};
