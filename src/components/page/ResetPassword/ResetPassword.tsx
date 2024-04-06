import { FormEvent, useContext, useState } from 'react';
import { Page } from '@/components/structure/Page/Page';
import { Headline } from '@/components/structure/Headline/Headline';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Button } from '@/components/atomic/Button/Button';
import styles from './ResetPassword.module.css';
import { ModeContext } from '@/providers/mode';
import classNames from 'classnames';

export const ResetPassword = () => {
    const { mode } = useContext(ModeContext);

    const [email, setEmail] = useState("");
    const auth = getAuth();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            sendPasswordResetEmail(auth, email);
            setSuccessMessage("Reset email sended");
            setEmail("");
        } catch (error) {
            setErrorMessage("Reset email not sended");
            console.log("Firebase error:", error)
        };
    }

    return (
        <Page>
            <Headline text="Reset password" />
            <div className={styles["reset-password__container"]}>
                <form className={styles["reset-password__form"]} onSubmit={handleResetPassword}>
                    <label htmlFor='email'>Your email:</label>
                    <input type="email" name="email" required onChange={(e) => { setEmail(e.target.value) }} value={email}></input>
                    <Button type="submit">Reset</Button>
                </form>
                {successMessage && <div>{successMessage}</div>}
                {errorMessage && <div>{errorMessage}</div>}
            </div>

        </Page>
    );
};