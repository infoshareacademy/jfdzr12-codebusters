import { Page } from "../../structure/Page/Page"
import { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Home.module.css";
import { User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atomic/Button/Button";
import { Headline } from "@/components/structure/Headline/Headline";
import { Entry } from "@/components/structure/Entry/Entry";
import { CustomSelect } from "@/components/structure/CustomSelect/CustomSelect";
import { useMode } from "@/providers/mode";
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
    const { mode, } = useMode();
    const navigate = useNavigate();

    const [entries, setEntries] = useState<EntriesData[]>([])
    const [sortBy, setSortBy] = useState<'asc' | 'desc'>('desc');

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

                const sortedEntries = fetchedEntries.sort((x, y) => {
                    if (sortBy === 'asc') {
                        return x.timestamp - y.timestamp;
                    } else {
                        return y.timestamp - x.timestamp;
                    }
                });

                setEntries(sortedEntries);

            } catch (error) {
                console.error("Error fetching entries:", error);
                return [];
            }
        };

        fetchEntries();
    }, [sortBy]);

    const updateEntries = (deletedEntryId: string) => {
        setEntries(entries.filter(entry => entry.id !== deletedEntryId));
    };

    return (
        <Page>
            <Headline text="Your diary" />
            <div className={classnames(styles["home"], styles[mode])}>
                <div className={classnames(styles["home__content"], styles[mode])}>
                    <div className={classnames(styles["home__button--new-entry"], styles[mode])}>
                        <Button onClick={() => { navigate("/add-entry") }}>Add entry</Button>
                        {entries.length > 0 && <CustomSelect setSortBy={setSortBy}></CustomSelect>}
                    </div>
                    <div className={classnames(styles["home-section"], styles[mode])}>
                        <div className={classnames(styles["home-section_entries"], styles[mode])}>
                            {entries.map((entry) => (
                                <Entry entry={entry} key={entry.id} user={user} updateEntries={updateEntries}></Entry>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Page >
    )
}