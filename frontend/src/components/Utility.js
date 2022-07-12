import { gridLayout } from "./Searching/SearchAlgo";

export const timer = ms => new Promise(res => setTimeout(res, ms));

export const getCoor = (i, col) => {
    let x = Math.floor(i / col);
    let y = i % col;
    return [x, y];
}
export const getIndex = (i, j, col) => {
    return col * i + j;
}
export const shuffleArr = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

export const restoreGrid = (newArr, row, col) => {
    for (let i = 0; i < row * col; i++) {
        newArr[i].visited = false;
        if (newArr[i].type != 'wall')
            newArr[i].type = 'empty';
        newArr[i].par = -1;
    }
}
