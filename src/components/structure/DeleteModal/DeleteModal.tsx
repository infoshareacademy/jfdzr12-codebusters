import { useContext, useState } from "react";
import classnames from "classnames";
import styles from "./LoginModal.module.css";
import { Modal } from "@/components/atomic/Modal/Modal.js";
import { Button } from "@/components/atomic/Button/Button";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "@/providers/mode";
import { doc, deleteDoc } from "firebase/firestore";

interface DeleteModalProps {
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleSubmit = ( { setIsDeleteModalOpen }: DeleteModalProps) => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate();

    const deleteEntry = async () => {
        await deleteDoc(doc(db, "cities", "DC"));
        navigate("/");
        setIsDeleteModalOpen(false);
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