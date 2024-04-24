import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import styles from "./CustomSelect.module.css"
import classNames from "classnames";
import { ModeContext } from "@/providers/mode";

interface CustomSelectTypes {
    setSortBy: Dispatch<SetStateAction<"desc" | "asc">>;
}
export const CustomSelect = ({ setSortBy }: CustomSelectTypes) => {
    const { mode } = useContext(ModeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("newest to oldest");
    const options = [
        { value: "desc", label: "newest to oldest" },
        { value: "asc", label: "oldest to newest" }
    ];

    const handleOptionClick = (value: string, label: string) => {
        setSelectedOption(label);
        setSortBy(value as "desc" | "asc");
        setIsOpen(false);
        console.log("Selected value:", value);
    };

    useEffect(() => {
        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapePress);

        return () => {
            document.removeEventListener('keydown', handleEscapePress);
        };
    }, []);


    useEffect(() => {
        const handleClickOutsideSelect = (event: MouseEvent) => {
            if (event.target && !(event.target as HTMLElement).closest("#header__account-container") &&
                !(event.target as HTMLElement).closest("#custom-select")) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener("click", handleClickOutsideSelect);

        return () => {
            document.body.removeEventListener("click", handleClickOutsideSelect);
        };
    }, []);

    return (
        <div className={styles["custom-select-container"]}>
            <div className={styles["custom-select"]} id="custom-select">
                <div className={classNames(styles["custom-select--text"], styles[mode])}
                >
                    Sort by:
                </div>
                <div>
                    <div
                        className={classNames(styles["select-selected"], styles[mode])}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {selectedOption}
                    </div>
                    {isOpen && (
                        <div className={classNames(styles["select-items"], styles[mode])}>
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    className={classNames(styles["select-item"], styles[mode])}
                                    onClick={() => handleOptionClick(option.value, option.label)}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};