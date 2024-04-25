import { useState } from "react";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase-config.js";
import { AuthForm } from "../AuthForm/AuthForm.js";
import styles from "./LoginModal.module.css";
import { HeaderModal } from "@/components/atomic/HeaderModal/HeaderModal.js";
import { useMode } from "@/providers/mode.js";
interface LoginModalProps {
    setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginModal = ({ setIsLoginModalOpen }: LoginModalProps) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { mode } = useMode();

    const handleSubmit = ({ login, password }: { login: string; password: string }) => {
        signInWithEmailAndPassword(auth, login, password)
            .then((response) => {
                console.log(response);
                navigate("/");
                setIsLoginModalOpen(false);
            })
            .catch((error) => {
                console.error("Error signing in:", error);
                setError(true);
                setMessage("The email or password provided is incorrect");
            });
    };

    return (
        <HeaderModal>
            <div className={classnames(styles["login__form"], styles[mode])}>
                <AuthForm submitText="Login" handleSubmit={handleSubmit} error={error} message={message}></AuthForm>
                <div className="login-form__reset-password-container">
                    <p className={classnames(
                        styles["login-form__reset-password-text"],
                        styles[mode]
                    )}>
                        <Link to="/reset-password" className={classnames(
                            styles["login-form__reset-password-link"],
                            styles[mode]
                        )} onClick={() => { setIsLoginModalOpen(false) }}>
                            Forgot password?
                        </Link>
                    </p>
                </div>
                <div className="login-form__register-container">
                    <p className={classnames(
                        styles["login-form__register-text"],
                        styles[mode]
                    )}>Don't have account yet?  <Link to="/register" className={classnames(
                        styles["login-form__register-link"],
                        styles[mode]
                    )} onClick={() => { setIsLoginModalOpen(false) }}>
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </HeaderModal>
    );
};