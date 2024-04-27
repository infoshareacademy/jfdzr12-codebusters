import { Page } from "../../structure/Page/Page"
import { useState } from "react";
import classnames from "classnames";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Headline } from "@/components/structure/Headline/Headline";
import { auth } from "../../../../firebase-config.js";
import { AuthForm } from "../../structure/AuthForm/AuthForm.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import ButtonBack from "@/components/atomic/ButtonBack/ButtonBack.js";
import { useMode } from "@/providers/mode.js";

export const Login = () => {
    const { mode, } = useMode();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = ({ login, password }: { login: string; password: string }) => {
        signInWithEmailAndPassword(auth, login, password)
            .then((response) => {
                console.log(response);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing in:", error);
                setError(true);
                setMessage("The email or password provided is incorrect");
            });
    };

    return (
        <Page>
            <ButtonBack />
            <Headline text="Login" />
            <div className={classnames(styles["login__form"], styles[mode])}>
                <AuthForm submitText="Login" handleSubmit={handleSubmit} error={error} message={message}></AuthForm>

                <div className="login__register-container">
                    <p className={classnames(
                        styles["login__register-text"],
                        styles[mode]
                    )}>Don't have account yet? <Link to="/register" className={classnames(
                        styles["login__login-link"],
                        styles[mode]
                    )}>
                            Register
                        </Link>
                    </p>
                </div>
                <div className="login__reset-password-container">
                    <p className={classnames(
                        styles["login__reset-password-text"],
                        styles[mode]
                    )}>
                        <Link to="/reset-password" className={classnames(
                            styles["login__reset-password-link"],
                            styles[mode]
                        )}>
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </div>
        </Page >
    )
}