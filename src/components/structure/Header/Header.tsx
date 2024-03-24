import { ModeContext } from "@/providers/mode";
import { useContext, useState } from "react";
import classnames from "classnames";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { UserModal } from "../UserModal/UserModal";
import { LoginModal } from "../LoginModal/LoginModal";
import { User } from "firebase/auth";

interface HeaderProps {
    user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
    const { mode, toggleMode } = useContext(ModeContext);
    const location = useLocation();

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const toggleAccountModal = (): void => {
        setIsUserModalOpen((prevState) => (prevState === false ? true : false));
    };

    const toggleLoginModal = (): void => {
        setIsLoginModalOpen((prevState) => (prevState === false ? true : false));
    };

    return (
        <>
            <header className={styles["header"]}>
                <div className={classnames(
                    styles["header__container"],
                    styles[mode]
                )}>
                    <div className={styles["header__logo"]}>
                        <Link className={styles["header__logo-link"]} to="/">
                            <div className={styles["header__logo-link-container"]}>
                                {mode === "light" ? (
                                    <img src="/images/icons/dairy/diary-light.png" alt="diary-daze logo" className={classnames(
                                        styles["header__logo-img"],
                                        styles[mode])} />
                                ) : (
                                    <img src="/images/icons/dairy/diary-dark.png" alt="diary-daze logo" className={classnames(
                                        styles["header__logo-img"],
                                        styles[mode]
                                    )} />
                                )}
                                <div className={classnames(
                                    styles["header__logo-link-paragraph-container"],
                                    styles[mode])}>
                                    <p className={classnames(
                                        styles["header__logo-link-paragraph"],
                                        styles[mode])}>diary daze</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles["header-nav__container"]}>
                        <nav className={styles["header-nav"]}>
                            <ul className={styles["header-nav__list"]}>
                                <li>
                                    <Link
                                        className={classnames(
                                            styles["header-nav__list-item-link"],
                                            styles["header-nav__list-item-link--home"],
                                            styles[mode])}
                                        to="/"
                                    >
                                        <div className={classnames(
                                            styles["header-nav__list-item"],
                                            { [styles.active]: location.pathname === '/' }
                                        )}>Home</div>
                                    </Link>
                                </li>
                                {!user && <li>
                                    <div
                                        className={classnames(
                                            styles["header-nav__list-item-link"],
                                            styles[mode]
                                        )}
                                        onClick={toggleLoginModal}
                                    >
                                        <div className={classnames(
                                            styles["header-nav__list-item"],
                                        )}>Login</div>
                                    </div>
                                </li>}

                            </ul>
                        </nav>
                    </div>
                    <div className={styles["header__icons-container"]}>
                        {user && <div className={styles["header__account-container"]} onClick={toggleAccountModal}
                        >
                            {mode === "light" ? (
                                <div

                                    className={styles["header__account-button"]}
                                >
                                    <img src="/images/icons/user/user-light.png" className={styles["header__user-icon"]} />
                                </div>
                            ) : (
                                <div
                                    className={styles["header__account-button"]}
                                >
                                    <img src="/images/icons/user/user-dark.png" className={styles["header__user-icon"]} />
                                </div>
                            )}
                        </div>}

                        <div className={styles["header-mode__container"]}>
                            {mode === "light" ? (
                                <button

                                    onClick={toggleMode} className={styles["header-mode__button"]}
                                >
                                    <img src="/images/icons/mode/day-mode-light.png" className={styles["header-mode__icon"]} />
                                </button>
                            ) : (
                                <button
                                    onClick={toggleMode} className={styles["header-mode__button"]}
                                >
                                    <img src="/images/icons/mode/night-mode-dark.png" className={styles["header-mode__icon"]} />
                                </button>
                            )}
                        </div>
                    </div>
                    {isUserModalOpen && <UserModal user={user} setIsUserModalOpen={setIsUserModalOpen}></UserModal>}
                    {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen}></LoginModal>}
                </div>
            </header >
        </>)
}