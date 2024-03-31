import { Headline } from "@/components/structure/Headline/Headline";
import { Page } from "@/components/structure/Page/Page"
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { User, getIdTokenResult } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import styles from "./Account.module.css"
import { Button } from "@/components/atomic/Button/Button";
import { useNavigate } from "react-router-dom";

interface AccountProps {
    user: User | null;
}

export const Account = ({ user }: AccountProps) => {
    const { mode } = useContext(ModeContext);
    const [createdAt, setCreatedAt] = useState<Date | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getIdTokenResult(user).then(idTokenResult => {
                if (idTokenResult && idTokenResult.claims && idTokenResult.claims.auth_time) {
                    const authTime = parseInt(idTokenResult.claims.auth_time); // Преобразование в число
                    const timestamp = authTime * 1000; // Преобразование в миллисекунды
                    setCreatedAt(new Date(timestamp));
                }
            }).catch(error => {
                console.error("Error getting ID token result:", error);
            });
        }
    }, [user]);

    return (
        <Page>
            <Headline text="account" />
            <p className={classNames(
                styles["account__user-email-text"],
                styles[mode]
            )}>Hello, <span className={classNames(
                styles["account__user-email"],
                styles[mode]
            )}>{user?.email}</span></p>
            <p>Account created:</p>
            <p>{createdAt?.toLocaleString()}</p>
            <Button onClick={() => { navigate("/change-password") }}>Change Password</Button>
        </Page>
    )
}
