import { Page } from "../../structure/Page/Page"
import { useContext } from "react";
import classnames from "classnames";
import styles from "./home.module.css";
import { ModeContext } from "@/providers/mode";
import { User } from "firebase/auth";
import loupe from '/images/icons/Welcome/loupe.png'
import feather from '/images/main/feather-pen.png'

interface EntryProps {
    user: User | null;
}

export const Home = ({ user }: EntryProps) => {
    const { mode, } = useContext(ModeContext);

    if (!user) {
        console.error('User is not authenticated');
        return;
    }


    return (
        <Page>
            <div className={classnames(styles["home"], styles[mode])}>
                <div className={classnames(styles["home-header"], styles[mode])}>
                    <p><img src={feather} alt="feather" /></p>
                    <h1>Your (user) diary</h1>
                    <p>Here you can see your entries and add new ones</p>
                </div>
                <div className={classnames(styles["home-section"], styles[mode])}>
                    <div className={classnames(styles["home-section_entries"], styles[mode])}>
                    </div>
                </div>
                <div className={classnames(styles["home-panel"], styles[mode])}>
                    <div className={classnames(styles["home-panel_search-container"], styles[mode])}>
                        <div className={classnames(styles["home-panel_search"], styles[mode])}>
                            <p><img src={loupe} alt="loupe" /></p>
                            <h2>Search your entries</h2>
                            <textarea></textarea>
                        </div>
                    </div>
                    <div className={classnames(styles["home-panel_calendar"], styles[mode])}>
                    </div>
                </div>
            </div>

        </Page>
    )
}