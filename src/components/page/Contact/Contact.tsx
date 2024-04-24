import React, { useState, useRef } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { Page } from "@/components/structure/Page/Page";
import { Headline } from "@/components/structure/Headline/Headline";
import { Button } from "@/components/atomic/Button/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
import { useMode } from "@/providers/mode";

export const Contact: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [messageId, setMessageId] = useState<string | null>(null);
    const { mode } = useMode();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        if (!title.trim() || !email.trim() || !message.trim()) {
            setErrorMessage("Inputs cannot be empty");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'contacts'), {
                title,
                email,
                message,
                timestamp: new Date()
            });
            setMessageId(docRef.id);
            setSuccessMessage("Message has been successfully sent");
            formRef.current?.reset();
        } catch (error) {
            console.error("Error sending data: ", error);
            setErrorMessage("Error sending message. Please try again later.");
        }
    };

    const handleReset = () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        setMessageId(null);
    }

    return (
        <Page>
            <ButtonBack />
            <Headline text="Contact Us" />
            <div className={classnames(styles["contact-form__container"], styles[mode])}>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={styles["contact-content__modal-form"]}
                >
                    <label htmlFor="title" className={styles["contact-content__form-label"]}>
                        Title:
                    </label>
                    <input
                        placeholder=""
                        type="text"
                        name="title"
                        className={classnames(
                            styles["contact-content__form-input"],
                            styles["contact-content__form-input--text"],
                            styles[mode]
                        )}
                        minLength={3}
                        required
                        aria-label="Title"
                    />
                    <label htmlFor="email" className={styles["contact-content__form-label"]}>
                        Email:
                    </label>
                    <input
                        placeholder=""
                        type="email"
                        name="email"
                        className={classnames(
                            styles["contact-content__form-input"],
                            styles["contact-content__form-input--email"],
                            styles[mode]
                        )}
                        minLength={3}
                        required
                        aria-label="Email"
                    />
                    <label htmlFor="message" className={styles["contact-content__form-label"]}>
                        Message:
                    </label>
                    <textarea
                        placeholder=""
                        className={classnames(
                            styles["contact-content__form-input"],
                            styles["contact-content__form-input--textarea"],
                            styles[mode]
                        )}
                        name="message"
                        rows={4}
                        cols={50}
                        minLength={1}
                        maxLength={500}
                        required
                        aria-label="Message"
                    ></textarea>
                    {errorMessage && <div className={classnames(
                        styles["contact-form__error-message"],
                        styles[mode]
                    )}>{errorMessage}</div>}
                    {successMessage && <div className={classnames(
                        styles["contact-form__success-message"],
                        styles[mode]
                    )}>{successMessage}</div>}
                    {messageId && <div className={classnames(
                        styles["contact-form__messageid-container"],
                        styles[mode]
                    )}>Message ID: {messageId}</div>}
                    <div className={styles["contact-form__button-container"]}>
                        <ButtonTransparent type="reset" onClick={handleReset}>Reset</ButtonTransparent>
                        <Button type="submit">Send</Button>
                    </div>
                </form>
            </div>
        </Page>
    );
};