import { useState, useContext } from "react";
// import classnames from "classnames";
import styles from "./About.module.css";
import { ModeContext } from "@/providers/mode";
import { Button } from "@/components/atomic/Button/Button";



export const About = () => {
    const { mode, } = useContext(ModeContext);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj możesz dodać kod obsługi wysyłania wiadomości, na przykład wywołując API do wysłania wiadomości e-mail
        setSubmitted(true);
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div className={styles['about-container']}>
            <h1>About Us</h1>
            <h2 className={styles['about-text']}>Welcome to our journaling application!  <b>DIARY-DAZE</b></h2>
            <p className={styles['about-text']}>Our mission is to provide a simple and intuitive platform for you to record your daily thoughts, experiences, and reflections.</p>
            <p className={styles['about-text']}>With our app, you can easily create new journal entries, organize them by date or category, and revisit them whenever you want.</p>
            <p className={styles['about-text']}>Whether you're using journaling as a form of self-expression, personal growth, or simply to keep track of your daily life, we're here to support you on your journey.</p>
            <p className={styles['about-text']}>Thank you for choosing our app to be a part of your daily routine.</p>
            <p className={styles['about-text']}>If you have any questions or feedback, feel free to contact us:</p>

            {!submitted ? (
                <form className={styles['about-form']} onSubmit={handleSubmit}>
                    <textarea
                        className={styles['message-textarea']}
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Enter your message..."
                        rows="4"
                        cols="50"
                    />
                    <br />
                    <Button type="submit">Send Message</Button>
                </form>
            ) : (
                <p className={styles['about-text']}>Thank you for your message! We'll get back to you as soon as possible.</p>
            )}
        </div>
    );
}

