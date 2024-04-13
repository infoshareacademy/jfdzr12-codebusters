import { useContext, useState } from "react";
import classnames from "classnames";
import styles from "./DeleteModal.module.css";
import { Modal } from "@/components/atomic/Modal/Modal.js";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "@/providers/mode";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { User } from "firebase/auth";

interface DeleteModalProps {
    user: User | null;
    setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
}

export const DeleteModal = ({ setIsUserModalOpen, user, id }: DeleteModalProps) => {
    const { mode } = useContext(ModeContext);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            return <div>User is empty</div>
        }

        const userId = user.uid;

        try {
            deleteDoc(doc(db, `entries/${userId}/entry`, id)),
                setIsUserModalOpen(false);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error");
        }
    };


    return (
        <Modal onClickSubmit={handleSubmit}>

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