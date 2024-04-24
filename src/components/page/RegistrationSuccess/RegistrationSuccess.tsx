import { Headline } from "@/components/structure/Headline/Headline";
import { Page } from "@/components/structure/Page/Page";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegistrationSuccess.module.css"
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";

export const RegistrationSuccess = () => {
    const [redirectCount, setRedirectCount] = useState(10);
    const navigate = useNavigate();
    const { mode, } = useContext(ModeContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (redirectCount === 0) {
                navigate("/");
            } else {
                setRedirectCount(redirectCount - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [redirectCount, navigate]);

    return (
        <Page>
            <Headline text="hello!" />
            <div className={styles["registration-success_container"]}>
                <div className={styles["registration-success-container"]}>
                    <p className={classNames(
                        styles["registration-success_paragraph-main"],
                        styles[mode]
                    )}>Registration successful!</p>
                    <p className={classNames(
                        styles["registration-success_paragraph"],
                        styles[mode]
                    )}>You will be redirected to the homepage in {redirectCount} seconds...</p>
                    <p className={classNames(
                        styles["registration-success_paragraph"],
                        styles[mode]
                    )}>Or you can go back <Link className={classNames(
                        styles["registration-success_paragraph-link"],
                        styles[mode]
                    )} to="/contact">home</Link> now.</p>
                </div>
                <div className={styles["registration-success_image-container"]}>
                    <img src="/images/icons/registration-success/hello.jpeg" alt="not found image" className={classNames(
                        styles["not-found_image"],
                        styles[mode]
                    )} />
                </div>
            </div>
        </Page>
    );
};
