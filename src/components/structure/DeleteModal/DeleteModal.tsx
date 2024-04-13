import { useContext, useState } from "react";
import classnames from "classnames";
import styles from "./LoginModal.module.css";
import { Modal } from "@/components/atomic/Modal/Modal.js";
import { Button } from "@/components/atomic/Button/Button";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "@/providers/mode";
import { doc, deleteDoc, collection, where, getDocs, query } from "firebase/firestore";
import { db } from "firebase-config";
import { User } from "firebase/auth";

interface DeleteModalProps {
    user: User | null;
}
interface EntriesData {
    id: string;
    entry: string;
    timestamp: any;
    updatedTimestamp?: any
}

export const deleteEntry = ( { setIsDeleteModalOpen }: DeleteModalProps) => {
    const { mode } = useContext(ModeContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchEntry = async () => {
        try {
            const q = query(collection(db, `entries/${user.uid}/entry`), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            const fetchedEntries = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as EntriesData[];

        } catch (error) {
            console.error("Error fetching entries:", error);
            return [];
        }
    

    fetchEntry();
}, [user, entryId];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = user.uid;
            
try {
            deleteDoc(doc(db, `entries/${userId}/entry`, entryId)),
            navigate("/");
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error");
        }
    };


    return (
        <Modal>
                <>
                    <p className={classnames(
                        styles["delete-modal__text"],
                        styles[mode]
                    )}>
                    Are you sure you want to delete this entry?
                    </p>
                <Button type="button" onClick={deleteEntry} handleSubmit={handleSubmit}>Delete</Button>
                </>
        </Modal>
    );
};