import { useState } from "react";
import classnames from "classnames";
import styles from "./DeleteModal.module.css";
import { Modal } from "@/components/atomic/Modal/Modal.js";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase-config";
import { User } from "firebase/auth";
import { useMode } from "@/providers/mode";
import { deleteObject, ref } from "firebase/storage";
interface DeleteModalProps {
    user: User | null;
    setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    entry: {
        entry: string;
        timestamp: any;
        id: string;
        updatedTimestamp?: any;
        photo?: string;
    };
    handleDeleteConfirmed: () => void;
}
export const DeleteModal = ({ setIsUserModalOpen, user, entry, handleDeleteConfirmed }: DeleteModalProps) => {
    const { mode } = useMode();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            setErrorMessage("User is empty");
            return;
        }

        const userId = user.uid;

        try {
            await deleteDoc(doc(db, `entries/${userId}/entry`, entry.id));
            handleDeleteConfirmed();

            if (entry.photo) {
                const photoRef = ref(storage, entry.photo);
                await deleteObject(photoRef);
            }

        } catch (error) {
            console.log(error);
            setErrorMessage("Error");
        }
    };


    return (
        <Modal onClickSubmit={handleSubmit} onClickCancel={() => { setIsUserModalOpen(false) }}>

            <p className={classnames(
                styles["delete-modal__text"],
                styles[mode]
            )}>
                Are you sure you want to delete this entry?
            </p>
            {errorMessage && <div>{errorMessage}</div>}
        </Modal>
    );
};
