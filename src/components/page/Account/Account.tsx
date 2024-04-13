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
    const [accountModal, setAccountModal] = useState(false)
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
            console.log("User is empty");
            return;
        }

        const fetchAccountData = async () => {
            try {
                const docRef = doc(db, `accountData/${user.uid}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAccountData(docSnap.data() as AccountData);
                    console.log("ACCOUNT DATA:", accountData)
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
            console.log("SAVED")
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSaveData(formData);
    };

    return (
        <Page>
            <Headline text="account" />
            <div className={classNames(
                styles["account__user-email-text-container"],
                styles[mode]
            )}>
                <div className={classNames(styles["account--button-container--edit"], styles[mode])}>
                    <button onClick={() => { setAccountModal(true) }}>
                        {mode === "light" ? (

                            <img src="/images/icons/home/writing-color.png" className={styles["account--button--edit-icon"]} />
                        ) : (

                            <img src="/images/icons/home/writing-color.png" className={styles["account--button--edit-icon"]} />
                        )}
                    </button>
                </div>
                <p className={classNames(
                    styles["account__user-email-text"],
                    styles[mode]
                )}>Hello, <span className={classNames(
                    styles["account__user-email"],
                    styles[mode]
                )}>{user?.email}</span></p>
            </div>
            <div className={classNames(
                styles["account__user-updated-container"],
                styles[mode]
            )}>
                <p className={classNames(
                    styles["account__user-updated-text"],
                    styles[mode]
                )}>Last authentication:</p>
                <p className={classNames(
                    styles["account__user-updated-text-date"],
                    styles[mode]
                )}>{createdAt?.toLocaleString()}</p>
            </div>
            {accountModal &&
                <div className={classNames(
                    styles["account-modal"],
                    styles[mode]
                )}>
                    <form onSubmit={handleSubmit} className={styles["account-modal__form"]}>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label>
                            Surname:
                            <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                        </label>
                        <label>
                            Username:
                            <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        </label>
                        <label>
                            Gender:
                            <select name="male" value={formData.male.toString()} onChange={handleChange}>
                                <option value="true">Male</option>
                                <option value="false">Female</option>
                            </select>
                        </label>
                        <label>
                            Birth Date:
                            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                        </label>
                        <Button type="submit">Save</Button>
                    </form>
                </div>}
            <Button onClick={() => { navigate("/change-password") }}>Change Password</Button>
            <Button onClick={() => { navigate("/delete-account") }}>Delete Account</Button>
        </Page >
    );
};
