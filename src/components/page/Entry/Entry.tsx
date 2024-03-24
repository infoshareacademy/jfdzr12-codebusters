import { Page } from "../../structure/Page/Page"
import styles from "./Entry.module.css"
import { FormEvent, useContext } from "react";
import { ModeContext } from "@/providers/mode";
import classNames from "classnames";

export const Entry = () => {
    const { mode } = useContext(ModeContext);


    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }

    return (
<Page>
<div className={classNames(
            styles["entry__area"],
            styles[mode])
        }>
            <h2 className={classNames(
            styles["entry__headline"],
            styles[mode])}>Your new entry </h2>
            <form
                    action=""
                    method="get"
                    className={classNames(styles["entry__form"])}
                    onSubmit={handleSubmit}
        >
            <textarea
                    placeholder="Write your thoughts here..."
                    id="entry"
                    className={classNames(
            styles["entry__textarea" ],
            styles[mode]
            )}
                    minLength={10}
                    maxLength={500}
                    name="entry"
                    rows={20}
                    cols={70}
                    wrap="off"
                    autoSave=""
                    spellCheck
                    required
        >

        </textarea>
        <input
                    type="submit"
                    value="Add"
                    className={classNames(
            styles["entry__input"],
            styles[mode]
            )}
        />
        </form>
        </div>
</Page>
        )}