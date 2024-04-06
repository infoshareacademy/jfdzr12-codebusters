import { Page } from "../../structure/Page/Page"
import { useContext } from "react";
import classnames from "classnames";
import styles from "./home.module.css";
import { ModeContext } from "@/providers/mode";
import { User } from "firebase/auth";

interface EntryProps {
    user: User | null;
}

export const Home = ({ user }: EntryProps) => {
    const { mode, } = useContext(ModeContext);


    return (
        <Page>
            <div className={classnames(styles["home"], styles[mode])}>
                <div className={classnames(styles["home-header"], styles[mode])}>
                    <h1>Your diary</h1>
                </div>
                <div className={classnames(styles["home-section"], styles[mode])}>
                    <div className={classnames(styles["home-section_entries"], styles[mode])}>
                    </div>
                </div>
                <div className={classnames(styles["home-panel"], styles[mode])}>
                    <div className={classnames(styles["home-panel_search"], styles[mode])}>
                    </div>
                    <div className={classnames(styles["home-panel_calendar"], styles[mode])}>
                    </div>
                </div>
            </div>

        </Page>
    )
}