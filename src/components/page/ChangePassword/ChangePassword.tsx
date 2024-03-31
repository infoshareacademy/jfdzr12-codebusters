import { useState } from 'react';
import { auth } from '../../../../firebase-config';
import { Page } from '@/components/structure/Page/Page';
import { Headline } from '@/components/structure/Headline/Headline';
import { User, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { Button } from '@/components/atomic/Button/Button';

interface ChangePasswordProps {
    user: User | null;
}

export const ChangePassword = ({ user }: ChangePasswordProps) => {
    const email = user?.email;
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

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
            alert('Password changed');
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

    return (
        <Page>
            <Headline text="Change password" />
            <div>
                <label>Current password</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label>New password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Submit new password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <Button onClick={handleChangePassword}>Submit</Button>
            {error && <p>{error}</p>}
        </Page>
    );
};
