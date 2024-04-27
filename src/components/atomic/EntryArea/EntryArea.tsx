import classNames from "classnames";
import styles from "./EntryArea.module.css"
import { useMode } from "@/providers/mode";
interface EntryAreaProps {
    value: string | undefined;
    onChange: (e: any) => void;
}

export const EntryArea = ({ value, onChange }: EntryAreaProps) => {
    const { mode } = useMode();
    return (
        <div className={classNames(
            styles["entry__textarea-container"],
            styles[mode]
        )}>
            <textarea value={value} onChange={onChange}
                className={classNames(
                    styles["entry__textarea"],
                    styles[mode]
                )}
                minLength={1}
                maxLength={2000}
                name="entry"
                rows={14}
                cols={50}
                wrap="off"
                placeholder="Start typing..."
                autoSave=""
                spellCheck
                required>
            </textarea>
        </div>
    )
}