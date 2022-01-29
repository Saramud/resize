import * as React from 'react';
import './Label.scss';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LabelProps {
    xPosition: number,
    yPosition: number,
    handleDoubleClick: (index: number) => void;
    index: number;
    value: string;
    onChangeValue: (value: string, index: number) => void;
}

export const Label = (props: LabelProps) => {
    const { xPosition, yPosition, handleDoubleClick, onChangeValue, index, value } = props;

    return (
        <div className='label' style={{ top: `${yPosition}%`, left: `${xPosition}%` }}>
            <FontAwesomeIcon 
                className="label_fa"
                color={'#1ab335'}
                icon={faTrashAlt}
                onDoubleClick={() => handleDoubleClick(index)} />
            <input type='text' value={value}    
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e.target.value, index)
                } />
        </div>
    )
} 