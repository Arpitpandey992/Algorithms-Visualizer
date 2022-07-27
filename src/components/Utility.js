export const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export const getCoor = (i, col) => {
    let x = Math.floor(i / col);
    let y = i % col;
    return [x, y];
};
export const getIndex = (i, j, col) => {
    return col * i + j;
};

export const findDistance = (i1, i2, col) => {
    let [x1, y1] = getCoor(i1, col);
    let [x2, y2] = getCoor(i2, col);
    // return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
    return Math.abs(y2 - y1) + Math.abs(x2 - x1);
};

export const shuffleArr = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
};

export const restoreGrid = (newArr, row, col) => {
    for (let i = 0; i < row * col; i++) {
        newArr[i].visited = false;
        if (newArr[i].type !== "wall") newArr[i].type = "empty";
        newArr[i].par = -1;
    }
};

export const generateRandom = (max) => {
    let rand = Math.random();
    rand = Math.floor(rand * max);
    return rand;
};

export const swap = (x, y) => {
    let temp = x;
    x = y;
    y = temp;
}
