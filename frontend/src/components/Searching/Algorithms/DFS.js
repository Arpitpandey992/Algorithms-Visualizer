import { getCoor, getIndex, restoreGrid, timer } from "../../Utility";
import { start, end, gridLayout } from "../SearchAlgo"
import { BuildPath } from "./BuildPath";

const dx = [0, 1, -1, 0];
const dy = [1, 0, 0, -1];
let done = false;

const dfs = async (x, newArr, setArr, row, col, delay) => {
    if (done) return;
    let [i, j] = getCoor(x, col);
    setArr([...newArr]);
    if (x == end) {
        await BuildPath(newArr, setArr, delay);
        done = true;
        return;
    }
    newArr[x].visited = true;
    for (let k = 0; k < 4; k++) {
        let nx = i + dx[k], ny = j + dy[k];
        let idx = getIndex(nx, ny, col);
        if (nx < 0 || nx >= row || ny < 0 || ny >= col || newArr[idx].visited || newArr[idx].type == 'wall') continue;
        await timer(delay);
        newArr[idx].par = x;
        await dfs(idx, newArr, setArr, row, col, delay);
        if (done) return;
    }
}
export const DFS = async (arr, setArr, row, col, delay) => {
    
    let newArr = arr;
    restoreGrid(newArr, row, col);
    setArr([...newArr]);
    done = false;

    await dfs(start, newArr, setArr, row, col, delay);
}