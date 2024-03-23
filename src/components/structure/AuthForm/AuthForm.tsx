import { useContext, useState, FormEvent } from "react";
import styles from "./AuthForm.module.css";
import { ModeContext } from "@/providers/mode";
import classnames from "classnames";

interface AuthFormProps {
    submitText: string;
    isPasswordHidden?: boolean;
    handleSubmit: (data: { login: string; password: string }) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
    submitText,
    isPasswordHidden = false,
    handleSubmit,
}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { mode } = useContext(ModeContext);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit({ login, password });
    };

    return (
        <form
            onSubmit={onSubmit}
            className={`${styles["modal__form"]} ${styles[mode]}`}
        >
            <div>
                <label htmlFor="email">Login</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>
            {!isPasswordHidden && (
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            )}
            <div className={classnames(
                styles["auth-form__submit-button-container"],
                styles[mode]
            )}>
                <button className={classnames(
                    styles["auth-form__submit-button"],
                    styles[mode]
                )} type="submit">{submitText}
                </button>
            </div>

        </form>
    );
};
