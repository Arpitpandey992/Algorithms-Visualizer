import {
    generateRandom,
    getCoor,
    getIndex,
    restoreGrid,
    timer,
} from "../../Utility";
import { end, start } from "../PathfindingAlgo";
const change = (newArr, i, j, col, type) => {
    let idx = getIndex(i, j, col);
    if (idx === start || idx === end) return;
    newArr[idx].type = type;
};
export const Sidewinder = async (arr, setArr, row, col, delay) => {
    let newArr = arr;
    for (let i = 0; i < row * col; i++) {
        newArr[i].visited = false;
        newArr[i].type = "empty";
    }
    setArr([...newArr]);
    for (let j = 0; j < col; j++) {
        change(newArr, 0, j, col, "wall");
        change(newArr, row - 1, j, col, "wall");
        await timer(delay);
        setArr([...newArr]);
    }
    for (let i = 1; i < row; i++) {
        change(newArr, i, 0, col, "wall");
        change(newArr, i, col - 1, col, "wall");
        await timer(delay);
        setArr([...newArr]);
    }
    setArr([...newArr]);
    for (let i = 1; i + 1 < row; i += 2) {
        let j = 1;
        if (i + 3 !== row) {
            for (let k = j; k < col; k += 2) {
                if (getIndex(i + 1, k, col) !== start)
                    change(newArr, i + 1, k, col, "wall");
                change(newArr, i + 1, k + 1, col, "wall");
                await timer(delay);
                setArr([...newArr]);
            }
        }
        while (j < col) {
            let k = j;
            while (k + 2 < col) {
                let should = generateRandom(2);
                if (should) k += 2;
                else break;
            }
            let cutDown = generateRandom(Math.floor((k - j) / 2) + 1);
            change(newArr, i, k + 1, col, "wall");
            change(newArr, i + 1, j + cutDown * 2, col, "empty");
            await timer(delay * 2);
            setArr([...newArr]);
            j = k + 2;
        }
    }
    setArr([...newArr]);
};
