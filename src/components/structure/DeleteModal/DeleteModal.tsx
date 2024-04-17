import { useContext, useState } from "react";
import classnames from "classnames";
import styles from "./DeleteModal.module.css";
import { Modal } from "@/components/atomic/Modal/Modal.js";
import { ModeContext } from "@/providers/mode";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { User } from "firebase/auth";

interface DeleteModalProps {
    user: User | null;
    setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    handleDeleteConfirmed: () => void;
}
export const DeleteModal = ({ setIsUserModalOpen, user, id, handleDeleteConfirmed }: DeleteModalProps) => {
    const { mode } = useContext(ModeContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            setErrorMessage("User is empty");
            return;
        }

        const userId = user.uid;

        try {
            await deleteDoc(doc(db, `entries/${userId}/entry`, id));
            handleDeleteConfirmed();
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
