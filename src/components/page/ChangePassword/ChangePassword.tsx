import { useState } from 'react';
import { auth } from '../../../../firebase-config';
import { Page } from '@/components/structure/Page/Page';
import { Headline } from '@/components/structure/Headline/Headline';
import { User, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { Button } from '@/components/atomic/Button/Button';
import styles from './ChangePassword.module.css';
import classNames from 'classnames';
import { ButtonTransparent } from '@/components/atomic/ButtonTransparent/ButtonTransparent';
import { ButtonBack } from '@/components/atomic/ButtonBack/ButtonBack';
import { useMode } from '@/providers/mode';

interface ChangePasswordProps {
    user: User | null;
}

export const ChangePassword = ({ user }: ChangePasswordProps) => {
    const { mode } = useMode();
    const email = user?.email;
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChangePassword = async () => {
        if (!email || !currentPassword || !newPassword || !confirmPassword) {
            setError('Please, fill all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords are different');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, currentPassword);
            await updatePassword(userCredential.user, newPassword);
            setError(null);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setSuccessMessage('Password changed successfully');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 4000);
        } catch (error) {
            if (typeof error === 'string') {
                setError(error);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError(null);
    }

    return (
        <Page>
            <ButtonBack />
            <Headline text="Change password" />
            <div className={classNames(
                styles["change-password__input-container"],
                styles[mode]
            )}>
                <label
                    className={classNames(
                        styles["change-password__label"],
                        styles[mode]
                    )} htmlFor="old-password">Current password:</label>
                <input
                    className={classNames(
                        styles["change-password__input"],
                        styles[mode]
                    )}
                    name="old-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div
                className={classNames(
                    styles["change-password__input-container"],
                    styles[mode]
                )}>
                <label className={classNames(
                    styles["change-password__label"],
                    styles[mode]
                )} htmlFor="new-password">New password:</label>
                <input
                    className={classNames(
                        styles["change-password__input"],
                        styles[mode]
                    )}
                    name="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div
                className={classNames(
                    styles["change-password__input-container"],
                    styles[mode]
                )}>
                <label className={classNames(
                    styles["change-password__label"],
                    styles[mode]
                )} htmlFor="new-password-repeat">Submit new password:</label>
                <input
                    className={classNames(
                        styles["change-password__input"],
                        styles[mode]
                    )}
                    name="new-password-repeat"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className={classNames(
                styles["change-password__buttons-container"],
                styles[mode]
            )}>
                <ButtonTransparent type="reset" onClick={handleCancel}>Clear</ButtonTransparent>
                <Button onClick={handleChangePassword}>Submit</Button></div>
            {error && <p
                className={classNames(
                    styles["change-password__error-message"],
                    styles[mode]
                )}>{error}</p>}
            {successMessage && <p
                className={classNames(
                    styles["change-password__success-message"],
                    styles[mode]
                )}>{successMessage}</p>}
        </Page>
    );
};
