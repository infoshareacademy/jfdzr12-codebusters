import { Page } from "../../structure/Page/Page"
import { useContext, useState } from "react";
import classnames from "classnames";
import styles from "./Login.module.css";
import { ModeContext } from "@/providers/mode";
import { Link, useNavigate } from "react-router-dom";
import { Headline } from "@/components/structure/Headline/Headline";
import { auth } from "../../../../firebase-config.js";
import { AuthForm } from "../../structure/AuthForm/AuthForm.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
    const { mode, } = useContext(ModeContext);
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
            </div>
        </Page >
    )
}