import { useContext } from "react";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase-config.js";
import { ModeContext } from "@/providers/mode.js";
import { AuthForm } from "../AuthForm/AuthForm.js";

import styles from "./LoginModal.module.css";


interface LoginModalProps {
    setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginModal = ({ setIsLoginModalOpen }: LoginModalProps) => {
    const { mode } = useContext(ModeContext);
    const navigate = useNavigate();

    const handleSubmit = ({ login, password }: { login: string; password: string }) => {
        signInWithEmailAndPassword(auth, login, password)
            .then((response) => {
                console.log(response);
                navigate("/");
                setIsLoginModalOpen(false);

            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    };

    return (
        <div className={classnames(
            styles["login-modal__container"],
            styles[mode]
        )}>
            <div className={classnames(styles["login__form"], styles[mode])}>
                <AuthForm submitText="Login" handleSubmit={handleSubmit}></AuthForm>
                <div className="login-form__register-container">
                    <p className={classnames(
                        styles["login-form__register-text"],
                        styles[mode]
                    )}>Don't have account yet? <Link to="/register" className={classnames(
                        styles["login-form__register-link"],
                        styles[mode]
                    )} onClick={() => { setIsLoginModalOpen(false) }}>
                            Register
                        </Link></p>
                </div>
            </div>
        </div>

    );
};
