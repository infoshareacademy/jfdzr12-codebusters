import { useContext, useState, FormEvent } from "react";
import styles from "./AuthForm.module.css";
import { ModeContext } from "@/providers/mode";
import classnames from "classnames";
import { Button } from "@/components/atomic/Button/Button";
interface AuthFormProps {
    submitText: string;
    isPasswordHidden?: boolean;
    handleSubmit: (data: { login: string; password: string }) => void;
    error?: boolean;
    message?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
    submitText,
    isPasswordHidden = false,
    handleSubmit,
    error,
    message,
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
            <div className={classnames(
                styles["auth-form__input-container"],
                styles[mode]
            )}>
                <label htmlFor="email" className={classnames(
                    styles["auth-form__label"],
                    styles[mode]
                )}>Login:</label>
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className={classnames(
                        styles["auth-form__input"],
                        styles[mode]
                    )}
                />

            </div>
            {!isPasswordHidden && (
                <div className={classnames(
                    styles["auth-form__input-container"],
                    styles[mode]
                )}>
                    <label htmlFor="password" className={classnames(
                        styles["auth-form__label"],
                        styles[mode]
                    )}>Password:</label>

                    <input
                        required
                        minLength={6}
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={classnames(
                            styles["auth-form__input"],
                            styles[mode]
                        )}
                    />
                </div>
            )}
            <Button type="submit">
                {submitText}
            </Button>
            {error && <div className={classnames(
                styles["auth-form__error-message"],
                styles[mode]
            )}>{message}</div>}
        </form>
    );
};