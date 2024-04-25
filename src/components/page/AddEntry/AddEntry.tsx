import { Page } from "../../structure/Page/Page";
import styles from "./AddEntry.module.css";
import { useContext, useState, useEffect } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { Paper } from "@/components/structure/Paper/Paper";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
interface EntryProps {
    user: User | null;
}

export const AddEntry = ({ user }: EntryProps) => {
    const { mode } = useContext(ModeContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [entryText, setEntryText] = useState<string>("");
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const imagePreviewRef = ref(storage, "upload-photos/")
    const navigate = useNavigate();

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

    return (
        <Page>
            <div className={classNames(
                styles["entry__area"],
                styles[mode])
            }>
                <Headline text="new entry" />
                <Paper>
                    <form
                        action=""
                        method="get"
                        className={classNames(styles["entry__form"])}
                        onSubmit={handleSubmit}
                    > <div className={classNames(
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
                                onChange={(e) => setEntryText(e.target.value)}>
                            </textarea>
                            
                        </div>
                        <Button type="submit">Add</Button>
                        {errorMessage && <div className={classNames(
                            styles["entry__error-message"],
                            styles[mode])}>{errorMessage}</div>}
                    </form>
                </Paper>
            </div>
            <div className={classNames(
                        styles["image-preview"],
                        styles[mode])}><h3>Preview</h3>{imagePreview.map((url) => {
                        return <img src={url}/>
                    })}</div>
        </Page>
    )
}