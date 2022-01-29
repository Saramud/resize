import * as React from 'react'
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Upload.scss';

interface InputProps {
    fileName: string | null;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: () => void;
}

export const Upload = (props: InputProps) => {
    const { fileName, changeHandler, handleClick } = props;
    return (
        <div className="input_wrapper">
            <label className="input_label" style={{ cursor: 'pointer' }} title="Загрузить файл">
                <FontAwesomeIcon size={'3x'}
                    className="input_upload"
                    color={'lightBlue'}
                    icon={faUpload} />
                <input type="file"
                    accept="image/*"
                    name="file"
                    onChange={changeHandler}
                    className="input input__file" />
            </label>

            {fileName ?
                <p className="input_fileName"
                    onClick={() => handleClick()}
                >
                    {fileName}
                    <FontAwesomeIcon size={'lg'}
                        className="input_delete"
                        color={'lightGray'}
                        icon={faTrash} />
                </p>
                : null}
        </div>

    )
} 