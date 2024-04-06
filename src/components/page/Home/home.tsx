import { Page } from "../../structure/Page/Page"
import { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Home.module.css";
import { ModeContext } from "@/providers/mode";
import { User } from "firebase/auth";
import loupe from '/images/icons/Welcome/loupe.png'
import feather from '/images/main/feather-pen.png'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase-config";


interface EntryProps {
    user: User | null;
}
interface EntriesData {
    id: string;
    entry: string;
    timestamp: any;
}
export const Home = ({ user }: EntryProps) => {
    const { mode, } = useContext(ModeContext);

    const [entries, setEntries] = useState<EntriesData[]>([])

    if (!user) {
        console.error('User is not authenticated');
        return;
    }

    useEffect(() => {
        if (!user) {
            console.log("User is empty");
            return;
        }

        const myEntries = async () => {
            try {
                const q = query(collection(db, `entries/${user.uid}/entry`), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                const fetchedEntries = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })) as EntriesData[];
                console.log("Fetched Entries:", fetchedEntries);
                setEntries(fetchedEntries)

            } catch (error) {
                console.error("Error fetching entries:", error);
                return [];
            }
        };

    }, [user]);

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
                        {entries.map((entry, id) => (
                            <div key={id} >
                                <p>{entry.entry}</p>
                            </div>
                        ))}
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
        </Page >
    )
}