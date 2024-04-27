import { useMode } from "@/providers/mode";
import styles from "./UploadPhoto.module.css";
import classNames from "classnames";
import { useState } from "react";

interface UploadPhotoTypes {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    photo?: string | null;
}

export const UploadPhoto = ({ onChange, photo }: UploadPhotoTypes) => {
    const { mode } = useMode();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file || null);
    };

    return (
        <div className={classNames(
            styles["upload-image--container"],
            styles[mode]
        )}>

            <input
                type="file"
                name="photo"
                accept="image/*"
                id="fileInput"
                onChange={(e) => {
                    onChange(e);
                    handleFileChange(e);
                }}
                className={classNames(
                    styles["upload-image--input"],
                    styles[mode]
                )}
            />
            <label htmlFor="fileInput" className={classNames(
                styles["upload-image--label"],
                styles[mode]
            )}>
                <div className={classNames(
                    styles["upload-image--image-container"],
                    styles[mode]
                )}>
                    <img alt="upload image icon" src="/images/icons/upload/photo-upload.png" className={classNames(
                        styles["upload-image--image"],
                        styles[mode]
                    )}></img>
                    {selectedFile ? selectedFile.name : (photo ? 'Change image file' : 'Choose image file')}

                </div>
            </label>
        </div>
    );
};
