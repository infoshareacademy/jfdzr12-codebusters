import classnames from "classnames";
import styles from "./ConfirmDeleteImageModal.module.css";
import { Modal } from "@/components/atomic/Modal/Modal.js";
import { useMode } from "@/providers/mode";

interface DeleteModalProps {
    setConfirmDeleteImageModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: string;
    handleDeletePhoto: () => void;
    errorMessageDeletePhoto: string | null;
}
export const ConfirmDeleteImageModal = ({ setConfirmDeleteImageModal, handleDeletePhoto, children, errorMessageDeletePhoto }: DeleteModalProps) => {
    const { mode } = useMode();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleDeletePhoto();
        setConfirmDeleteImageModal(false);
    };

    return (
        <Modal onClickSubmit={handleSubmit} onClickCancel={() => { setConfirmDeleteImageModal(false) }}>
            <p className={classnames(
                styles["modal__text"],
                styles[mode]
            )}>
                {children}
            </p>
            {errorMessageDeletePhoto && <div>{errorMessageDeletePhoto}</div>}
        </Modal>
    );
};
