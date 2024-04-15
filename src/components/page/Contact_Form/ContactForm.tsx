import styles from "./ContactForm.module.css";
import classnames from "classnames";
import { validateEmail } from "./validationEmail.js";
import { useContext, useRef, useState } from "react";
import { ModeContext } from "@/providers/mode";
import { Button } from "@/components/ui/button.js";

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
        <div
            className={classnames(styles["contact-form__container"], styles[mode])}
        >
            <h1 className={classnames(styles["modal__header"], styles[mode])}>
                Contact us
            </h1>
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
                    <Button
                        type="submit"
                        value="Send"
                        className={classnames(
                            styles["form__input"],
                            styles["form__input--submit"],
                            styles[mode]
                        )}
                    />
                </form>
            </div>
        </div >
    );
};
