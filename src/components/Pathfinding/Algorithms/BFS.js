import { getCoor, getIndex, restoreGrid, timer } from "../../Utility";
import { start, end } from "../PathfindingAlgo";
import { BuildPath } from "./BuildPath";

export const BFS = async (arr, setArr, row, col, delay) => {
    let newArr = arr;
    restoreGrid(newArr, row, col);
    setArr([...newArr]);
    const dx = [0, 1, -1, 0];
    const dy = [1, 0, 0, -1];
    let q = [start];
    while (q.length > 0) {
        setArr([...newArr]);
        let x = q.shift();

        let [i, j] = getCoor(x, col);
        for (let k = 0; k < 4; k++) {
            let nx = i + dx[k],
                ny = j + dy[k];
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
            newArr[idx].visited = true;
            q.push(idx);
            newArr[idx].par = x;
            if (idx === end) {
                await BuildPath(arr, setArr, delay * 10);
                return;
            }
        }
    }
};
