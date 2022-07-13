import { timer } from "../../Utility";
import { start, end } from "../SearchAlgo";

export const BuildPath = async (arr, setArr, delay) => {
    let newArr = arr;
    let cur = end;
    while (cur !== start) {
        newArr[cur].type = "path";
        cur = newArr[cur].par;
        await timer(delay);
        setArr([...newArr]);
    }
};
