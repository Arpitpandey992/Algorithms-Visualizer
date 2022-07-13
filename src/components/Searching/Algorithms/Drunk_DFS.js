import {
    getCoor,
    getIndex,
    restoreGrid,
    shuffleArr,
    timer,
} from "../../Utility";
import { start, end } from "../SearchAlgo";
import { BuildPath } from "./BuildPath";

let done = false;

const drunkDFS = async (x, newArr, setArr, row, col, delay) => {
    if (done) return;
    let [i, j] = getCoor(x, col);
    setArr([...newArr]);
    if (x === end) {
        await BuildPath(newArr, setArr, delay);
        done = true;
        return;
    }
    newArr[x].visited = true;
    const d = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
    ];
    shuffleArr(d);
    for (let k = 0; k < 4; k++) {
        let nx = i + d[k][0],
            ny = j + d[k][1];
        let idx = getIndex(nx, ny, col);
        if (
            nx < 0 ||
            nx >= row ||
            ny < 0 ||
            ny >= col ||
            newArr[idx].visited ||
            newArr[idx].type === "wall"
        )
            continue;
        await timer(delay);
        newArr[idx].par = x;
        await drunkDFS(idx, newArr, setArr, row, col, delay);
        if (done) return;
    }
};
export const DrunkDFS = async (arr, setArr, row, col, delay) => {
    let newArr = arr;
    restoreGrid(newArr, row, col);
    setArr([...newArr]);
    done = false;
    await drunkDFS(start, newArr, setArr, row, col, delay);
};
