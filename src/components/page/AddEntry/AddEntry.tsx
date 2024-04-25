import { Page } from "../../structure/Page/Page";
import styles from "./AddEntry.module.css";
import { useState, useEffect } from "react";
import classNames from "classnames";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { EntryArea } from "@/components/atomic/EntryArea/EntryArea";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
import { useMode } from "@/providers/mode";
interface EntryProps {
    user: User | null;
}

export const AddEntry = ({ user }: EntryProps) => {
    const { mode } = useMode();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string>("");
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const imagePreviewRef = ref(storage, "upload-photos/")
    const navigate = useNavigate();

    const uploadImage = () => {
            if (imageUpload == null) return;
            const imageRef = ref(storage, `upload-photos/${imageUpload.name}`)
            uploadBytes(imageRef, imageUpload). then((snaphsot) => {
                getDownloadURL(snaphsot.ref).then((url) => {
                setImagePreview((prev) => [...prev, url])
                })
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
                    onSubmit={handleSubmit}> <div className={classNames(
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
                        <ButtonTransparent type="reset" onClick={handleReset}>Clear</ButtonTransparent>
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </div>
            <div className={classNames(
                        styles["image-preview"],
                        styles[mode])}><h3>Preview</h3>{imagePreview.map((url) => {
                        return <img src={url} key={url}/>
                    })}</div>
        </Page>
    )
}