import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { Page } from "@/components/structure/Page/Page"
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { User } from "firebase/auth";
import { useContext } from "react";
import styles from "./ChangePassword.module.css"

interface AccountProps {
    user: User | null;
}

export const ChangePassword = ({ user }: AccountProps) => {
    const { mode } = useContext(ModeContext);
    const handleSubmit = () => {
        console.log("submit")
    }

    return (
        <Page>
            <Headline text="change password" />
            <form onSubmit={handleSubmit} className={classNames(
                styles["change-password__form"],
                styles[mode]
            )}>
                <label> Current password
                </label>
                <input>
                </input>

                <label> New password
                </label>
                <input>
                </input>

                <Button>Submit</Button>
            </form>
        </Page>
    )
}
