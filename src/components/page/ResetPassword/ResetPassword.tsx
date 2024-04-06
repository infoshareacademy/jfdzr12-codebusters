import { useContext, useState } from 'react';
import { auth } from '../../../../firebase-config';
import { Page } from '@/components/structure/Page/Page';
import { Headline } from '@/components/structure/Headline/Headline';
import { User } from 'firebase/auth';
import { Button } from '@/components/atomic/Button/Button';
import styles from './ResetPassword.module.css';
import { ModeContext } from '@/providers/mode';
import classNames from 'classnames';

interface ResetPasswordProps {
    user: User | null;
}

export const ResetPassword = ({ user }: ResetPasswordProps) => {
    const { mode } = useContext(ModeContext);
    const email = user?.email;

    return (
        <Page>
            <Headline text="Reset password" />
        </Page>
    );
};
