import { Page } from "../../structure/Page/Page";
import styles from "./AddEntry.module.css";
import { useState } from "react";
import classNames from "classnames";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { useNavigate } from "react-router-dom";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { EntryArea } from "@/components/atomic/EntryArea/EntryArea";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
import { useMode } from "@/providers/mode";
import { DocumentReference, DocumentData } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface EntryProps {
    user: User | null;
}

export const AddEntry = ({ user }: EntryProps) => {
    const { mode } = useMode();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        if (!entryText.trim()) {
            setErrorMessage("Entry cannot be empty");
            return;
        }

        const userId = user.uid;

        try {
            const docRef: DocumentReference<DocumentData> = await addDoc(collection(db, `entries/${userId}/entry`), {
                entry: entryText,
                email: user.email,
                timestamp: new Date()
            });

            let photoUrl: string | undefined = undefined;
            if (photo) {
                const photoRef = ref(storage, `photos/${userId}/${docRef.id}_photo`);
                await uploadBytes(photoRef, photo);

                photoUrl = await getDownloadURL(photoRef);

                await updateDoc(docRef, { photo: photoUrl });
            }

            setEntryText("");
            setPhoto(null);
            navigate("/")
        } catch (error) {
            console.log(error);
            setErrorMessage("Error sending entry");
        }
    }

    const handleReset = () => {
        setEntryText("");
        setErrorMessage(null);
        setPhoto(null);
    }

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    return (
        <Page>
            <ButtonBack />
            <div className={classNames(
                styles["entry__area"],
                styles[mode])
            }>
                <Headline text="new entry" />
                <form className={classNames(styles["entry__form"])} onSubmit={handleSubmit}>
                    <EntryArea value={entryText} onChange={(e) => setEntryText(e.target.value)} />
                    <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} />
                    {errorMessage && <div className={classNames(
                        styles["entry__error-message"],
                        styles[mode])}>{errorMessage}
                    </div>}
                    <div className={classNames(
                        styles["entry__buttons-container"],
                        styles[mode])
                    }>
                        <ButtonTransparent type="reset" onClick={handleReset}>Clear</ButtonTransparent>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </div>
        </Page>
    )
}
