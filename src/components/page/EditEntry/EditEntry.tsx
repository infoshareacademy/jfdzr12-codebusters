import { Page } from "../../structure/Page/Page";
import styles from "./EditEntry.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { EntryArea } from "@/components/atomic/EntryArea/EntryArea";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
import { useMode } from "@/providers/mode";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { Paper } from "@/components/structure/Paper/Paper";
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
    const { mode } = useMode();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string | undefined>("");
    const [originalEntryText, setOriginalEntryText] = useState<string | undefined>("");
    const { entryId }: any = useParams();
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const imagePreviewRef = ref(storage, "upload-photos/")
    const navigate = useNavigate();

    if (!user) {
        console.error('User is not authenticated');
        return <div>User is not authenticated</div>;
    }

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `upload-photos/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload). then(() => {
            alert('Image uploaded')
        })
}
useEffect(() => {
    listAll(imagePreviewRef).then((response) => {
        response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImagePreview((prev) => [...prev, url])
            });
        });
    });
}, []);

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
        setErrorMessage(null);
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
                    <EntryArea value={entryText} onChange={(e) => setEntryText(e.target.value)} />
                    <div className={classNames(
                        styles["form-controls"],
                        styles[mode])}>
    <span className={classNames(
                        styles["controls-button"],
                        styles[mode])} title="bold" data-button-type="addStrong"><strong>b</strong></span>
    <span className={classNames(
                        styles["controls-button"],
                        styles[mode])} title="italic" data-button-type="addEmphasis"><strong><em>i</em></strong></span>
    <label htmlFor="photoUpload" title="choose photo"><input type="file" accept="image/jpeg" id="photoUpload" onChange={(e) => {setImageUpload(e.target.files![0])}}/>{(mode === "light" ? (
                                        <img src="/images/icons/upload/image-light.png" alt="upload photo" className={classNames(
                                            styles["controls-image"],
                                            styles[mode]
                                        )} />
                                    ) : (
                                        <img src="/images/icons/upload/image-dark.png" alt="upload photo" className={classNames(
                                            styles["controls-image"],
                                            styles[mode]
                                        )} />
                                    )
                                )}
                                </label>
    <button onClick={uploadImage} title="upload">{(mode === "light" ? (
                                        <img src="/images/icons/upload/upload-light.png" alt="upload photo" className={classNames(
                                            styles["controls-image"],
                                            styles[mode]
                                        )} />
                                    ) : (
                                        <img src="/images/icons/upload/upload-dark.png" alt="upload photo" className={classNames(
                                            styles["controls-image"],
                                            styles[mode]
                                        )} />
                                    )
                                )}</button></div>
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
            <div className={classNames(
                        styles["image-preview"],
                        styles[mode])}><h3>Preview</h3>{imagePreview.map((url) => {
                        return <img src={url}/>
                    })}</div>
        </Page>
    );
};
