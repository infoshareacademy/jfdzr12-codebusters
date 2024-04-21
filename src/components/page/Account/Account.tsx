import { Headline } from "@/components/structure/Headline/Headline";
import { Page } from "@/components/structure/Page/Page";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";
import { User, getIdTokenResult } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/atomic/Button/Button";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import styles from "./Account.module.css"
import { ButtonTransparent } from "@/components/atomic/ButtonTransparent/ButtonTransparent";
interface AccountProps {
    user: User | null;
}
interface AccountData {
    name: string;
    surname: string;
    username: string;
    male: boolean;
    birthDate: any;
}

export const Account = ({ user }: AccountProps) => {
    const { mode } = useContext(ModeContext);
    const [readonly, setReadOnly] = useState<boolean>(true)
    const [createdAt, setCreatedAt] = useState<Date | null>(null);
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    const [formData, setFormData] = useState<AccountData>({
        name: "",
        surname: "",
        username: "",
        male: true,
        birthDate: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getIdTokenResult(user).then(idTokenResult => {
                if (idTokenResult && idTokenResult.claims && idTokenResult.claims.auth_time) {
                    const authTime = parseInt(idTokenResult.claims.auth_time);
                    const timestamp = authTime * 1000;
                    setCreatedAt(new Date(timestamp));
                }
            }).catch(error => {
                console.error("Error getting ID token result:", error);
            });
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            console.error("User is empty");
            return;
        }

        const fetchAccountData = async () => {
            try {
                const docRef = doc(db, `accountData/${user.uid}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAccountData(docSnap.data() as AccountData);
                    setFormData(docSnap.data() as AccountData)
                }

            } catch (error) {
                console.error("Error fetching account data:", error);
            }
        };
        fetchAccountData();
    }, [user]);

    const handleSaveData = async (data: AccountData) => {
        try {
            await setDoc(doc(db, `accountData/${user?.uid}`), data);
            setAccountData(data);
            setReadOnly(true)
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSaveData(formData);
    };

    const handleReset = () => {
        setReadOnly(true);
        if (accountData) {
            setFormData(accountData);
        } else {
            setFormData(
                {
                    name: "",
                    surname: "",
                    username: "",
                    male: true,
                    birthDate: ""
                }
            )
        }
    };

    return (
        <Page>
            <Headline text="account" />
            <div className={classNames(
                styles["account__container"],
                styles[mode]
            )}>
                <div className={classNames(styles["account--button-container--edit"], styles[mode])}>
                    <button onClick={() => { setReadOnly(false) }}>
                        <img src="/images/icons/account/user-avatar-color-light.png" className={styles["account--button--edit-icon"]} />
                    </button>
                </div>
                {user && <form onSubmit={handleSubmit}>
                    <div>
                        <div className={classNames(
                            styles["account__form--inputs-container"],
                            styles[mode]
                        )}>
                            <label htmlFor="name" className={classNames(
                                styles["account__form--label"],
                                styles[mode]
                            )}>
                                Email:
                            </label>
                            <div className={classNames(
                                styles["account__form--input-text"],
                                styles[mode]
                            )}>{user.email}</div>
                        </div>
                        <div className={classNames(
                            styles["account__form--inputs-container"],
                            styles[mode]
                        )}>
                            <label htmlFor="name" className={classNames(
                                styles["account__form--label"],
                                styles[mode]
                            )}>
                                Name:
                            </label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly={readonly}
                                className={readonly ?
                                    classNames(
                                        styles["account__form--input-readonly"],
                                        styles[mode]) :
                                    classNames(
                                        styles["account__form--input"],
                                        styles[mode])
                                }
                            />
                        </div>
                        <div className={classNames(
                            styles["account__form--inputs-container"],
                            styles[mode]
                        )}>
                            <label htmlFor="surname" className={classNames(
                                styles["account__form--label"],
                                styles[mode]
                            )}>
                                Surname:
                            </label>
                            <input type="text" name="surname" value={formData.surname} onChange={handleChange} readOnly={readonly}
                                className={readonly ?
                                    classNames(
                                        styles["account__form--input-readonly"],
                                        styles[mode]) :
                                    classNames(
                                        styles["account__form--input"],
                                        styles[mode])
                                }
                            />
                        </div>
                        <div className={classNames(
                            styles["account__form--inputs-container"],
                            styles[mode]
                        )}>
                            <label htmlFor="username" className={classNames(
                                styles["account__form--label"],
                                styles[mode]
                            )}>
                                Username:
                            </label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} readOnly={readonly}
                                className={readonly ?
                                    classNames(
                                        styles["account__form--input-readonly"],
                                        styles[mode]) :
                                    classNames(
                                        styles["account__form--input"],
                                        styles[mode])
                                }
                            />
                        </div>
                        <div className={classNames(
                            styles["account__form--inputs-container"],
                            styles[mode]
                        )}>
                            <label htmlFor="birthDate" className={classNames(
                                styles["account__form--label"],
                                styles[mode]
                            )}>
                                Birth Date:
                            </label>
                            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} readOnly={readonly}
                                className={readonly ?
                                    classNames(
                                        styles["account__form--input-readonly"],
                                        styles[mode]) :
                                    classNames(
                                        styles["account__form--input"],
                                        styles[mode])
                                }
                            />
                        </div>
                        <div className={classNames(
                            styles["account__form--inputs-container"],
                            styles[mode]
                        )}>
                            <label htmlFor="name" className={classNames(
                                styles["account__form--label"],
                                styles[mode]
                            )}>
                                Last authentication:
                            </label>
                            <div className={classNames(
                                styles["account__form--input-text"],
                                styles[mode]
                            )}>{createdAt?.toLocaleString()}</div>
                        </div>
                    </div>
                    {!readonly && <div className={styles["account__buttons--container"]}>
                        <ButtonTransparent type="reset" onClick={handleReset}>Cancel</ButtonTransparent>
                        <Button type="submit">Submit</Button>
                    </div>
                    }
                </form>}
                {readonly && <div className={styles["account__buttons--container"]}>
                    <Button onClick={() => { navigate("/change-password") }}>Change password</Button>
                    <Button onClick={() => { navigate("/delete-account") }}>Delete account</Button>
                </div>}
            </div>
        </Page >
    );
};
