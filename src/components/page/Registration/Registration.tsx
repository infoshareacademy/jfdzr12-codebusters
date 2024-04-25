import { Page } from "../../structure/Page/Page"
import { useState } from "react";
import classnames from "classnames";
import styles from "./Registration.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Headline } from "@/components/structure/Headline/Headline";
import { auth } from "../../../../firebase-config.js";
import { AuthForm } from "../../structure/AuthForm/AuthForm.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ButtonBack from "@/components/atomic/ButtonBack/ButtonBack.js";
import { useMode } from "@/providers/mode.js";

export const Registration = () => {
    const { mode, } = useMode();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = ({ login, password }: { login: string; password: string }) => {
        createUserWithEmailAndPassword(auth, login, password)
            .then((response) => {
                console.log(response);
                navigate("/registration-success");
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
            <Headline text="Registration" />
            <div className={classnames(styles["registration__form"], styles[mode])}>
                <AuthForm submitText="Register" handleSubmit={handleSubmit} error={error} message={message}></AuthForm>
                <div className="registration__register-container">
                    <p className={classnames(
                        styles["registration__register-text"],
                        styles[mode]
                    )}>Already have account? <Link to="/login" className={classnames(
                        styles["registration__login-link"],
                        styles[mode]
                    )}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </Page >
    )
}