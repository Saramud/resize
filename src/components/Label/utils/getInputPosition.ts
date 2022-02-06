export interface Position {
    top: number,
    left: number,
}

type GetInputPosition = (x: number, y: number) => Position;

export const getInputPosition: GetInputPosition = (x: number, y: number) => {
    let top = 0;
    let left = 0;
    const limit = 70;
    if (y > limit) {
        top = -45;
        if(x > limit) {
            top = -45;
            left = -165;
        }
    }
    else if (x > limit) {
        left = -170;
    }
    return {
        top: top,
        left: left,
    }
}