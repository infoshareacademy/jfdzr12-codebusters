import React, { useContext, useState } from "react";
import styles from "./Contact.module.css";
import classnames from "classnames";
import { ModeContext } from "@/providers/mode";
import { Page } from "@/components/structure/Page/Page";
import { Headline } from "@/components/structure/Headline/Headline";
import { Button } from "@/components/atomic/Button/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config";

export const Contact: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
    const { mode } = useContext(ModeContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        if (!title.trim() || !email.trim() || !message.trim()) {
            setMessage("Inputs cannot be empty");
            return;
        }

        // Update this line to correct the collection path
        try {
            await addDoc(collection(db, 'contacts'), {
                title,
                email,
                message,
                timestamp: new Date()
            });
            setMessage("Message sent successfully");
        } catch (error) {
            console.error("Error sending data: ", error);
            setMessage("Error sending message. Please try again later.");
        }
    };

    return (
        <Page>
            <Headline text="Contact Us" />
            <div className={classnames(styles["contact-form__container"], styles[mode])}>
                <div className={classnames(styles["modal"])} id="contact">
                    <form
                        onSubmit={handleSubmit}
                        id="contact-content__form"
                        className={styles["contact-content__modal-form"]}
                    >
                        <label htmlFor="title" className={styles["contact-content__form-label"]}>
                            Title
                        </label>
                        <input
                            placeholder=""
                            type="text"
                            id="title"
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
                            Email
                        </label>
                        <input
                            placeholder=""
                            type="email"
                            id="email"
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
                            Message
                        </label>
                        <textarea
                            placeholder=""
                            id="message"
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
                        {message && <div>{message}</div>}
                        <Button>Send</Button>
                    </form>
                </div>
            </div>
        </Page>
    );
};
