import { User, deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { Page } from "@/components/structure/Page/Page";
import { Headline } from "@/components/structure/Headline/Headline";
import { useContext, useState } from "react";
import { ModeContext } from "@/providers/mode";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from './DeleteAccount.module.css';
import { Button } from "@/components/atomic/Button/Button";

interface DeleteAccountProps {
    user: User | null;
}

export const DeleteAccount = ({ user }: DeleteAccountProps) => {
const { mode } = useContext(ModeContext);
const navigate = useNavigate();
const [confirmPassword, setConfirmPassword] = useState<string>('');
const [error, setError] = useState<string | null>(null);

const handleDeleteAccount = async () => {
    
    if (!user) {
        console.error('User is not authenticated');
        return;
    }

    if (!confirmPassword) {
        setError('Please, confirm your password');
        return;
    }
    
    try {
        await deleteUser(user);
        setConfirmPassword('');
        navigate("/confirm-delete")
        

} catch (error) {
            console.error(error); 
            setError("Account hasn't been deleted")
        }
};

return (
    <Page>
    <Headline text="Delete account" />
    <div className={classNames(
                styles["delete-account__container"],
                styles[mode]
            )}>
                <label
                    className={classNames(
                        styles["delete-account__label"],
                        styles[mode]
                    )} htmlFor="confirm-password">Confirm password:</label>
                <input
                    className={classNames(
                        styles["delete-account__input"],
                        styles[mode]
                    )}
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className={classNames(
                        styles["delete-account__buttons"],
                        styles[mode]
                    )}><Button onClick={handleDeleteAccount}>Confirm</Button>
            {error && <p
                className={classNames(
                    styles["delete-account__error-message"],
                    styles[mode]
                )}>{error}</p>}
            <Button onClick={() => { navigate("/") }}>Cancel</Button></div>
    </Page>
);
                };