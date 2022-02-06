import * as React from 'react';

import { Label } from '../Label/Label';
import './Preview.scss';
import { getPercent } from './utils/getPercent'

interface ViewPortProps {
    event: React.ChangeEvent<HTMLInputElement> | null;
}

export interface LabelInfo {
    xPosition: number,
    yPosition: number,
    value: string,
    hint: string | null,
    isSave: boolean,
    isHidden: boolean,
}

export enum EVENT {
    DELETE = 'delete',
    SAVE = 'save',
    HIDDEN = 'hidden',
    COPY = 'copy',
}

export const Preview = (props: ViewPortProps) => {
    const { event } = props;
    const [labelInfo, setLabelInfo] = React.useState<LabelInfo[] | null>(null);
    const targetRef = React.useRef<HTMLHeadingElement>(null);

    let file = null;

    React.useEffect(() => {
        setLabelInfo(null)
    }, [event])

    const handlePreviewClick = (e: React.MouseEvent<HTMLElement>) => {
        const updateLabelInfo = labelInfo && [...labelInfo];
        let isStopCreate = false;
        if (updateLabelInfo?.length) {
            updateLabelInfo.forEach(label => {
                if (!label.isSave) {
                    isStopCreate = true;
                    label.hint = 'Save label!'
                }
                if (!label.value.length) {
                    isStopCreate = true;
                    label.hint = 'Empty label!'
                }
            })
            setLabelInfo(updateLabelInfo);
        }
        if (!isStopCreate) {
            const newLabelInfo = {
                xPosition: getPercent(targetRef.current?.offsetWidth, e.nativeEvent.offsetX),
                yPosition: getPercent(targetRef.current?.offsetHeight, e.nativeEvent.offsetY),
                value: '',
                hint: null,
                isSave: false,
                isHidden: false,
            };

            setLabelInfo(list => {
                return list?.length ? [...list, newLabelInfo] : [newLabelInfo]
            })
        }
    }

    const handleInputClick = (index: number, event: EVENT) => {
        let updateLabeInfo = labelInfo && [...labelInfo];
        if (updateLabeInfo?.length) {
            switch (event) {
                case EVENT.DELETE:
                    updateLabeInfo = [...updateLabeInfo.filter((el, id) => id !== index)];
                    break;
                case EVENT.SAVE:
                    updateLabeInfo[index].isSave = true;
                    updateLabeInfo[index].hint = null;
                    break;
                case EVENT.HIDDEN:
                    updateLabeInfo[index].isHidden = !updateLabeInfo[index].isHidden;
                    break;
                case EVENT.COPY:
                    navigator.clipboard.writeText(updateLabeInfo[index].value);
            }
            setLabelInfo(updateLabeInfo);
        }
    }

    const onChangeValue = (value: string, index: number) => {
        const updateLabelInfo = labelInfo && [...labelInfo];
        if (updateLabelInfo) {
            let lengthValue = updateLabelInfo[index].value.length;
            updateLabelInfo[index].value = value;
            updateLabelInfo[index].hint = '';
            updateLabelInfo[index].isSave = false;
            setLabelInfo(updateLabelInfo);
        }
    }

    if (event?.target.files?.length) {
        file = URL.createObjectURL(event?.target.files[0]);
    }

    return (
        <div className='viewport' ref={targetRef}>
            {file &&
                <img className="preview" src={file} onClick={handlePreviewClick} />
            }
            {file && labelInfo && labelInfo.map((coordinate, index) => {
                return (
                    <Label
                        labelInfo={coordinate}
                        key={index}
                        index={index}
                        handleInputClick={handleInputClick}
                        onChangeValue={onChangeValue} />
                )
            })
            }
        </div>
    )
} 