import * as React from 'react';

import { Label } from '../Label/Label';
import './Preview.scss';
import { getPercent } from './utils/getPercent'

interface ViewPortProps {
    event: React.ChangeEvent<HTMLInputElement> | null;
}

export interface Coordinate {
    xPosition: number,
    yPosition: number,
    value: string,
    hint: string | null,
    isSave: boolean,
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
        const updateCoordinates = coordinates && [...coordinates];
        const length = updateCoordinates?.length;
        if (length && updateCoordinates[length - 1].isSave === false) {
            return setCoordinate(list => {
                if (list?.length) {
                    list[length - 1].hint = 'Сохраните метку!';
                    return [...list]
                }
                return list;
            });
        }
        const newCoordinates = {
            xPosition: getPercent(targetRef.current?.offsetWidth, e.nativeEvent.offsetX),
            yPosition: getPercent(targetRef.current?.offsetHeight, e.nativeEvent.offsetY),
            value: '',
            hint: null,
            isSave: false,
        };

        setCoordinate(list => {
            return list?.length ? [...list, newCoordinates] : [newCoordinates]
        })
    }

    const handleTrashClick = (index: number) => {
        setCoordinate(list => {
            return list?.length ? [...list.filter((el, id) => id !== index)] : list;
        });
    }

    const handleSaveClick = (index: number) => {
        setCoordinate(list => {
            if (list?.length) {
                list[index].isSave = true;
                list[index].hint = null;
                return [...list]
            }
            return list;
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
                    <Label
                        labelInfo={coordinate}
                        key={index}
                        index={index}
                        handleTrashClick={handleTrashClick}
                        handleSaveClick={handleSaveClick}
                        onChangeValue={onChangeValue} />
                )
            })
            }
        </div>
    )
} 