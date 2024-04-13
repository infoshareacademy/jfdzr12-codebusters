import { Page } from "../../structure/Page/Page"
import { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Home.module.css";
import { ModeContext } from "@/providers/mode";
import { User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { Entry } from "@/components/structure/Entry/Entry";
interface EntryProps {
    user: User | null;
}
interface EntriesData {
    id: string;
    entry: string;
    timestamp: any;
    updatedTimestamp?: any
}

export const Home = ({ user }: EntryProps) => {
    const { mode, } = useContext(ModeContext);
    const navigate = useNavigate();

    const [entries, setEntries] = useState<EntriesData[]>([])

    if (!user) {
        console.error('User is not authenticated');
        return <div>User is not authenticated</div>;
    }

    useEffect(() => {
        if (!user) {
            console.log("User is empty");
            return;
        }

        const fetchEntries = async () => {
            try {
                const q = query(collection(db, `entries/${user.uid}/entry`), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                const fetchedEntries = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })) as EntriesData[];
                setEntries(fetchedEntries)

            } catch (error) {
                console.error("Error fetching entries:", error);
                return [];
            }
        };

        fetchEntries();
    }, [user, entries]);

    return (
        <Page>
            <Headline text="Your diary" />
            <div className={classnames(styles["home"], styles[mode])}>
                <div className={classnames(styles["home__content"], styles[mode])}>
                    <Button onClick={() => { navigate("/add-entry") }}>New entry</Button>
                    <div className={classnames(styles["home-section"], styles[mode])}>
                        <div className={classnames(styles["home-section_entries"], styles[mode])}>
                            {entries.map((entry) => (
                                <Entry entry={entry} key={entry.id} user={user}></Entry>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Page >
    )
}