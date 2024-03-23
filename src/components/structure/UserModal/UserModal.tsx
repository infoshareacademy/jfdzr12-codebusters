import React, { useContext } from "react";
import styles from "./UserModal.module.css";
import classnames from "classnames";
import { ModeContext } from "../../../providers/mode";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase-config";

interface UserModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserModal = ({ setIsModalOpen }: UserModalProps) => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate();

    const handlerLogOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                navigate("/login");
            })
            .catch(error => {
                console.error("Sign out failed:", error.message);
            });
    }

    return (
        <div className={classnames(
            styles["user-modal__container"],
            styles[mode]
        )}>
            <div className={classnames(
                styles["user-modal__list-container"],
                styles[mode]
            )}>
                <ul className={styles["user-modal__list"]} onClick={() => setIsModalOpen(false)}>
                    <li className={classnames(
                        styles["user-modal__list-option"],
                        styles[mode]
                    )} onClick={handlerLogOut}>Log out</li>
                </ul>
            </div>
        </div>
    )
}