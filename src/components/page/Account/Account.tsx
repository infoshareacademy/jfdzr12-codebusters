import { Headline } from "@/components/structure/Headline/Headline";
import { Page } from "@/components/structure/Page/Page"
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { User } from "firebase/auth";
import { useContext } from "react";
import styles from "./Account.module.css"

interface AccountProps {
    user: User | null;
}

export const Account = ({ user }: AccountProps) => {
    const { mode } = useContext(ModeContext);
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
        </Page>
    )
}