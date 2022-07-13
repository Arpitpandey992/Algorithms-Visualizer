import {
    getCoor,
    getIndex,
    restoreGrid,
    timer,
    findDistance,
    PriorityQueue,
} from "../../Utility";
import { start, end } from "../PathfindingAlgo";
import { BuildPath } from "./BuildPath";

export const A_Star = async (arr, setArr, row, col, delay) => {
    let newArr = arr;
    restoreGrid(newArr, row, col);
    setArr([...newArr]);
    const dx = [0, 1, -1, 0];
    const dy = [1, 0, 0, -1];
    let dis = [];
    for (let i = 0; i < row * col; i++) {
        dis.push(Infinity);
    }
    dis[start] = 0;
    let q = [];
    q.push({
        "idx": newArr[start].val,
        "g": dis[start],
        "h": findDistance(start, end, col),
    });

    while (q.length > 0) {
        let mn = 0;
        for (let i = 1; i < q.length; i++) {
            if (q[i].g + q[i].h > q[mn].g + q[mn].h) continue;
            if (q[i].g + q[i].h < q[mn].g + q[mn].h) {
                mn = i;
                continue;
            }
            if (q[i].h > q[mn].h) continue;
            mn = i;
        }
        let x = q.splice(mn, 1)[0];
        if (x.g !== dis[x.idx]) continue;
        newArr[x.idx].visited = true;
        if (x.idx === end) {
            await BuildPath(arr, setArr, delay);
            return;
        }
        setArr([...newArr]);
        let [i, j] = getCoor(x.idx, col);
        for (let k = 0; k < 4; k++) {
            let nx = i + dx[k],
                ny = j + dy[k];
            let idx = getIndex(nx, ny, col);
            if (
                nx < 0 ||
                nx >= row ||
                ny < 0 ||
                ny >= col ||
                newArr[idx].type === "wall" ||
                dis[idx] <= x.g + 1
            )
                continue;
            dis[idx] = x.g + 1;
            q.push({
                "idx": idx,
                "g": dis[idx],
                "h": findDistance(idx, end, col),
            });
            await timer(delay);
            newArr[idx].par = x.idx;
        }
    }
};
