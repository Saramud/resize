import * as React from 'react';
import { Upload } from '../Upload/Upload';
import { Preview } from '../Preview/Preview';
import './Main.scss';

interface File {
    fileName: string,
    event: React.ChangeEvent<HTMLInputElement> | null
}

export const Main = () => {
    const [file, setFile] = React.useState<File | null>(null);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && setFile({
            fileName: e.target.files[0].name,
            event: e,
        });
    }

    const handleClick = () => {
        setFile(null);
    }

    return (
        <div className='main'>
            <Upload fileName={file?.fileName || null}  changeHandler={changeHandler} handleClick={handleClick} />
            <Preview event={file?.event || null}/>
        </div>
    )
} 