import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ModeContext } from "@/providers/mode";
import classnames from "classnames";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { UserModal } from "../UserModal/UserModal";
import { LoginModal } from "../LoginModal/LoginModal";
import { User } from "firebase/auth";
const WINDOW_MOBILE_WITH = 992;

interface HeaderProps {
    user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
    const { mode, toggleMode } = useContext(ModeContext);
    const location = useLocation();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleAccountModal = (): void => {
        setIsUserModalOpen((prevState) => !prevState);
    };

    const toggleLoginModal = (): void => {
        setIsLoginModalOpen((prevState) => !prevState);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsLoginModalOpen(false);
                setIsUserModalOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapePress);

        return () => {
            document.removeEventListener('keydown', handleEscapePress);
        };
    }, []);

    const closeModals = () => {
        setIsUserModalOpen(false);
        setIsLoginModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutsideModals = (event: MouseEvent) => {
            if (event.target && !(event.target as HTMLElement).closest("#header__account-container") &&
                !(event.target as HTMLElement).closest("#header-nav__list-item-login") &&
                !(event.target as HTMLElement).closest("#modal-header__container")) {
                closeModals();
            }
        };

        document.body.addEventListener("click", handleClickOutsideModals);

        return () => {
            document.body.removeEventListener("click", handleClickOutsideModals);
        };
    }, []);

    return (
        <>
            <header className={styles["header"]}>
                <div className={classnames(
                    styles["header__container"],
                    styles[mode]
                )} id="header__container">
                    <div className={styles["header-nav__container"]}>
                        <nav className={styles["header-nav"]}>
                            <ul className={styles["header-nav__list"]}>
                                <li>
                                    <Link
                                        className={classnames(
                                            styles["header-nav__list-item-link"],
                                            styles[mode])}
                                        to="/"
                                    >
                                        <div className={classnames(
                                            styles["header-nav__list-item"],
                                            styles[mode],
                                            { [styles.active]: location.pathname === '/' }
                                        )}>Home</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={classnames(
                                            styles["header-nav__list-item-link"],
                                            styles[mode])}
                                        to="/about"
                                    >
                                        <div className={classnames(
                                            styles["header-nav__list-item"],
                                            styles[mode],
                                            { [styles.active]: location.pathname === '/about' }
                                        )}>About</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={classnames(
                                            styles["header-nav__list-item-link"],
                                            styles[mode])}
                                        to="/contact"
                                    >
                                        <div className={classnames(
                                            styles["header-nav__list-item"],
                                            styles[mode],
                                            { [styles.active]: location.pathname === '/contact' }
                                        )}>Contact</div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles["header__logo"]}>
                        <Link className={styles["header__logo-link"]} to="/">
                            <div className={styles["header__logo-link-container"]}>
                                {windowWidth <= WINDOW_MOBILE_WITH ? (
                                    <img src="/images/icons/dairy/logo-mob.png" alt="diary-daze logo" className={classnames(
                                        styles["header__logo-img"],
                                        styles[mode]
                                    )} />
                                ) : (
                                    mode === "light" ? (
                                        <img src="/images/icons/dairy/logo-web.png" alt="diary-daze logo" className={classnames(
                                            styles["header__logo-img"],
                                            styles[mode]
                                        )} />
                                    ) : (
                                        <img src="/images/icons/dairy/logo-web-dark.png" alt="diary-daze logo" className={classnames(
                                            styles["header__logo-img"],
                                            styles[mode]
                                        )} />
                                    )
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className={styles["header__icons-container"]}>
                        {!user && <>
                            <div
                                className={classnames(
                                    styles["header-nav__list-item-login"],
                                    styles[mode]
                                )}
                                onClick={toggleLoginModal}
                                id="header-nav__list-item-login"
                            >
                                <div className={classnames(
                                    styles["header-nav__list-login"],
                                )}>Login</div>
                            </div>
                        </>}
                        {user && <div className={styles["header__account-container"]} onClick={toggleAccountModal} id="header__account-container"
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
                                    <img src="/images/icons/mode/night-light.png" className={styles["header-mode__icon"]} />
                                </button>
                            ) : (
                                <button
                                    onClick={toggleMode} className={styles["header-mode__button"]}
                                >
                                    <img src="/images/icons/mode/sun-dark.png" className={styles["header-mode__icon"]} />
                                </button>
                            )}
                        </div>
                    </div>
                    {isUserModalOpen && <UserModal user={user} setIsUserModalOpen={setIsUserModalOpen}></UserModal>}
                    {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen}></LoginModal>}
                </div>
            </header >
        </>
    );
};
