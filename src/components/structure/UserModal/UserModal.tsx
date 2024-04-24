import React from "react";
import styles from "./UserModal.module.css";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import { User, signOut } from "firebase/auth";
import { auth } from "../../../../firebase-config";
import { HeaderModal } from "@/components/atomic/HeaderModal/HeaderModal";
import { useMode } from "@/providers/mode";

interface UserModalProps {
    setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
}

export const UserModal = ({ setIsUserModalOpen, user }: UserModalProps) => {
    const { mode } = useMode();
    const navigate = useNavigate();

    const handlerLogOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                navigate("/");
            })
            .catch(error => {
                console.error("Sign out failed:", error.message);
            });
    }

    return (
        <HeaderModal>
            <div className={classnames(
                styles["user-modal__list-container"],
                styles[mode]
            )}>
                <ul className={styles["user-modal__list"]} onClick={() => setIsUserModalOpen(false)}>
                    {user && <li className={classnames(
                        styles["user-modal__list-option"],
                        styles[mode]
                    )} onClick={() => { navigate("/account") }}>Account
                    </li>}
                    {user && <li className={classnames(
                        styles["user-modal__list-option"],
                        styles[mode]
                    )} onClick={handlerLogOut}>Log out
                    </li>}
                </ul>
            </div>
        </HeaderModal>
    )
}