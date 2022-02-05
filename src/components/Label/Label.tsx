import * as React from 'react';
import './Label.scss';
import { faTrashAlt, faSave, faCircle,  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Coordinate } from '../Preview/Preview';

interface LabelProps {
    labelInfo: Coordinate;
    handleTrashClick: (index: number) => void;
    handleSaveClick: (index: number) => void;
    index: number;
    onChangeValue: (value: string, index: number) => void;
}

export const Label = (props: LabelProps) => {
    const { labelInfo, handleTrashClick, handleSaveClick, onChangeValue, index } = props;
    return (
        <div className={labelInfo.hint ? 'label labelValidation' : 'label'} style={{ top: `${labelInfo.yPosition}%`, left: `${labelInfo.xPosition}%` }}>
            <div className='inputWrapper'>
            <FontAwesomeIcon
                        color={'#1ab335'}
                        icon={faCircle}
                        style={{transform:'rotate(150deg)'}}/>
                {/* <input type='text' value={labelInfo.value}
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e.target.value, index)
                    } />
                {labelInfo.isSave ?
                    <FontAwesomeIcon
                        className="label_fa"
                        color={'#1ab335'}
                        icon={faTrashAlt}
                        onClick={() => handleTrashClick(index)} /> :

                    <FontAwesomeIcon
                        className="label_fa"
                        color={'#1ab335'}
                        icon={faSave}
                        onClick={() => handleSaveClick(index)} />} */}
            </div>
            {labelInfo.hint && <p className='hint'>{labelInfo.hint}</p>}
        </div>
    )
} 