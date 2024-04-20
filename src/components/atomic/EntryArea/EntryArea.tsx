import classNames from "classnames";
import styles from "./EntryArea.module.css"
import { useContext } from "react";
import { ModeContext } from "@/providers/mode";

interface EntryAreaProps {
    value: string;
    onChange: (e: any) => void;
    children?: React.ReactNode;
}

export const EntryArea = ({ children, value, onChange }: EntryAreaProps) => {
    const { mode } = useContext(ModeContext);
    return (
        <div>
            <textarea value={value} onChange={onChange}
                className={classNames(
                    styles["entry__textarea"],
                    styles[mode]
                )}
                minLength={10}
                maxLength={500}
                name="entry"
                rows={14}
                cols={50}
                wrap="off"
                autoSave=""
                spellCheck
                required>
                {children}
            </textarea>
        </div>
    )

}