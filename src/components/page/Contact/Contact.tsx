import styles from "./Contact.module.css";
import classnames from "classnames";
import { validateEmail } from "./validationEmail.js";
import { useContext, useRef, useState } from "react";
import { ModeContext } from "@/providers/mode";
import { Page } from "@/components/structure/Page/Page";
import { Headline } from "@/components/structure/Headline/Headline";
import { Button } from "@/components/atomic/Button/Button.js";

export const ContactForm = () => {
    const [emailMessage, setEmailMessage] = useState("");
    const inputEmailEl = useRef(null);
    const { mode } = useContext(ModeContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailValue = inputEmailEl.current.value;

        setEmailMessage(validateEmail(emailValue));
        console.log(emailValue);
    };

    return (
        <Page>
            <Headline text="Contact Us"></Headline>
            <div className={classnames(styles["contact-form__container"], styles[mode])}>
                <div className={classnames(styles["modal"])} id="contact">
                    <form
                        action=""
                        method="get"
                        className={classnames(styles["modal__form"])}
                        onSubmit={handleSubmit}
                    >
                        <label
                            htmlFor="title"
                            className={classnames(styles["form__label"], styles[mode])}
                        >
                            Title
                        </label>
                        <input
                            placeholder=""
                            type="text"
                            id="title"
                            name="title"
                            className={classnames(
                                styles["form__input"],
                                styles["form__input--text"],
                                styles[mode]
                            )}
                            required
                        />
                        <label
                            htmlFor="email"
                            className={classnames(styles["form__label"], styles[mode])}
                        >
                            Email
                        </label>
                        <input
                            ref={inputEmailEl}
                            placeholder=""
                            type="email"
                            id="email"
                            name="email"
                            className={classnames(
                                styles["form__input"],
                                styles["form__input--email"],
                                styles[mode]
                            )}
                            required
                        />
                        <p className={classnames(styles["form__error-message"])}>
                            {emailMessage}
                        </p>
                        <label
                            htmlFor="message"
                            className={classnames(styles["form__label"], styles[mode])}
                        >
                            Message
                        </label>
                        <textarea
                            placeholder=""
                            id="message"
                            className={classnames(
                                styles["form__input"],
                                styles["form__input--textarea"],
                                styles[mode]
                            )}
                            minLength="20"
                            name="message"
                            rows="4"
                            cols="50"
                            required
                        ></textarea>
                        <Button>Send</Button>
                    </form>
                </div>
            </div >
        </Page>
    );
};
