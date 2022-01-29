import * as React from 'react';

import { Label } from '../Label/Label';
import './Preview.scss';
import { getPercent } from './utils/getPercent'

interface ViewPortProps {
    event: React.ChangeEvent<HTMLInputElement> | null;
}

interface Coordinate {
    xPosition: number,
    yPosition: number,
    value: string,
}

export const Preview = (props: ViewPortProps) => {
    const { event } = props;
    const [coordinates, setCoordinate] = React.useState<Coordinate[] | null>(null);
    const targetRef = React.useRef<HTMLHeadingElement>(null);
    
    let file = null;

    React.useEffect(() => {
        setCoordinate(null)
    }, [event])

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const newCoordinates = {
            xPosition: getPercent(targetRef.current?.offsetWidth, e.nativeEvent.offsetX),
            yPosition: getPercent(targetRef.current?.offsetHeight, e.nativeEvent.offsetY),
            value: '',
        };
        setCoordinate(list => {
            return list?.length ? [...list, newCoordinates] : [newCoordinates]
        })
    }


    const handleDoubleClick = (index: number) => {
        setCoordinate(list => {
            return list?.length ? [...list.filter((el, id) => id !== index)] : list;
        });
    }

    const onChangeValue = (value: string, index: number) => {
        const updateCoordinates = coordinates && [...coordinates];
        if (updateCoordinates) {
            updateCoordinates[index].value = value;
            setCoordinate(updateCoordinates);
        }
    }

    if (event?.target.files?.length) {
        file = URL.createObjectURL(event?.target.files[0]);
    }

    return (
        <div className='viewport' ref={targetRef}>
            {file &&
                <img className="preview" src={file} onClick={handleClick} />
            }
            {file && coordinates && coordinates.map((coordinate, index) => {
                return (
                    <Label xPosition={coordinate.xPosition}
                        yPosition={coordinate.yPosition}
                        value={coordinate.value}
                        key={index}
                        index={index}
                        handleDoubleClick={handleDoubleClick}
                        onChangeValue={onChangeValue} />
                )
            })
            }
        </div>
    )
} 