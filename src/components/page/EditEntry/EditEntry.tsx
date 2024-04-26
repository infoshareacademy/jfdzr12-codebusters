import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { collection, doc, getDocs, updateDoc, where, query } from "firebase/firestore";
import { db, storage } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { EntryArea } from "@/components/atomic/EntryArea/EntryArea";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
import { useMode } from "@/providers/mode";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Page } from "@/components/structure/Page/Page";
import styles from "./EditEntry.module.css";
import { UploadPhoto } from "@/components/structure/UploadPhoto/UploadPhoto";
interface EditEntryProps {
    user: User | null;
}
interface EntriesData {
    id: string;
    entry: string;
    timestamp: any;
    updatedTimestamp?: any;
    photo?: string;
}

export const EditEntry = ({ user }: EditEntryProps) => {
    const { mode } = useMode();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string | undefined>("");
    const [originalEntryText, setOriginalEntryText] = useState<string | undefined>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
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
                setPhotoUrl(entry?.photo || null);

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
            if (photoUrl) {
                const oldPhotoRef = ref(storage, photoUrl);
                await deleteObject(oldPhotoRef);
            }

            let newPhotoUrl: string | null = null;
            if (photo) {
                const photoRef = ref(storage, `photos/${userId}/${entryId}_photo`);
                await uploadBytes(photoRef, photo);
                newPhotoUrl = await getDownloadURL(photoRef);
            }

            await updateDoc(doc(db, `entries/${userId}/entry`, entryId), {
                entry: entryText,
                updatedTimestamp: new Date(),
                photo: newPhotoUrl || null
            });

            navigate("/");
        } catch (error) {
            console.log(error);
            setErrorMessage("Error editing entry");
        }
    };

    const handleReset = () => {
        setEntryText(originalEntryText);
        setErrorMessage(null);
    }

    const handleDeletePhoto = async () => {
        if (!photoUrl) {
            console.error('No photo to delete');
            return;
        }

        try {
            const photoRef = ref(storage, photoUrl);
            await deleteObject(photoRef);
            setPhotoUrl(null);

            const userId = user.uid;
            await updateDoc(doc(db, `entries/${userId}/entry`, entryId), {
                photo: null
            });
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
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
                <Headline text="edit entry" />
                <form
                    action=""
                    method="get"
                    className={classNames(styles["entry__form"])}
                    onSubmit={handleSubmit}
                >
                    <UploadPhoto onChange={handlePhotoChange} />
                    <EntryArea value={entryText} onChange={(e) => setEntryText(e.target.value)} />
                    {photoUrl && <div className={classNames(
                        styles["entry-edit__photo-container"],
                        styles[mode])}>
                        <img src={photoUrl} alt="entry photo" className={classNames(
                            styles["entry-edit__photo"],
                            styles[mode])} />
                        <div className={classNames(
                            styles["entry-edit__button-container--delete-photo"],
                            styles[mode])}>
                            <button type="button" onClick={handleDeletePhoto} className={classNames(
                                styles["entry-edit__button--delete-photo"],
                                styles[mode])}>X</button>
                        </div>
                    </div>}
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
    );
};
