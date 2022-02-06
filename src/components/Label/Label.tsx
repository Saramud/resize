import * as React from 'react';
import './Label.scss';
import { faTrashAlt, faSave, faPlusCircle, faMinusCircle, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LabelInfo, EVENT } from '../Preview/Preview';
import { getInputPosition } from './utils/getInputPosition';

interface LabelProps {
    labelInfo: LabelInfo;
    handleInputClick: (index: number, event: EVENT) => void;
    index: number;
    onChangeValue: (value: string, index: number) => void;
}

export const Label = (props: LabelProps) => {

    const { labelInfo, handleInputClick, onChangeValue, index } = props;
    
    const inputPositions = getInputPosition(labelInfo.xPosition, labelInfo.yPosition);
    return (
        <div className={labelInfo.hint ? 'label labelValidation' : 'label'} style={{ top: `${labelInfo.yPosition}%`, left: `${labelInfo.xPosition}%` }}>
            <div className='point'>
                <FontAwesomeIcon
                    icon={labelInfo.isHidden ? faPlusCircle : faMinusCircle}
                    onClick={() => handleInputClick(index, EVENT.HIDDEN)}
                />
            </div>
            {!labelInfo.isHidden &&
                <div className='inputWrapper' style={{ top: `${inputPositions.top}px`, left: `${inputPositions.left}%` }}>
                    <div>
                        <input type='text' value={labelInfo.value}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(e.target.value, index)
                            } />
                        <FontAwesomeIcon
                                className="label_fa fa_copy"
                                icon={faCopy}
                                onClick={() => handleInputClick(index, EVENT.COPY)} />
                        {labelInfo.isSave || !labelInfo.value?
                            <FontAwesomeIcon
                                className="label_fa"
                                color={'#1ab335'}
                                icon={faTrashAlt}
                                onClick={() => handleInputClick(index, EVENT.DELETE)} /> :

                            <FontAwesomeIcon
                                className="label_fa"
                                color={'#1ab335'}
                                icon={faSave}
                                onClick={() => handleInputClick(index, EVENT.SAVE)} />}
                    </div>
                    {labelInfo.hint && <p className='hint'>{labelInfo.hint}</p>}
                </div>}
        </div>
    )
} 