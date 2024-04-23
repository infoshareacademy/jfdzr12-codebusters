import { User, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { Page } from "@/components/structure/Page/Page";
import { Headline } from "@/components/structure/Headline/Headline";
import { useContext, useState } from "react";
import { ModeContext } from "@/providers/mode";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from './DeleteAccount.module.css';
import { Button } from "@/components/atomic/Button/Button";
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
import { ButtonBack } from "@/components/atomic/ButtonBack/ButtonBack";
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
            const email = user.email || '';

            const credential = EmailAuthProvider.credential(email, confirmPassword);
            await reauthenticateWithCredential(user, credential);
            await deleteUser(user);
            setConfirmPassword('');
            navigate("/confirm-delete");
        } catch (error) {
            console.error(error);
            setError("Failed to delete account: Incorrect password");
            setConfirmPassword("");
        }
    };

    const handleCancel = () => {
        setConfirmPassword("");
        setError(null);
    }

    return (
        <Page>
            <ButtonBack />
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
            {error && <p
                className={classNames(
                    styles["delete-account__error-message"],
                    styles[mode]
                )}>{error}</p>}
            <div className={classNames(
                styles["delete-account__buttons"],
                styles[mode]
            )}>
                <ButtonTransparent onClick={handleCancel}>Cancel</ButtonTransparent>
                <Button onClick={handleDeleteAccount}>Confirm</Button>
            </div>
        </Page>
    );
};
