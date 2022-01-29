

type GetPercent = (parentParam: number|undefined, labelCoordinate: number) => number;

export const getPercent: GetPercent = (parentParam, labelCoordinate) => {
    let result = 0;
    if (parentParam) {
        result = (labelCoordinate / (parentParam / 100));
    }
    return result;
}