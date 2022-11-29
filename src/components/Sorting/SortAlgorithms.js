import { swap, timer } from "../Utility";
import { colors } from "./StyledComponents";

export async function finishAnim(arr, arrSize, setArr, delay) {
    let newArr = arr;
    newArr[0].col = colors.good;
    let flag = true;
    for (let i = 1; i < arrSize; i++) {
        if (newArr[i].val < newArr[i - 1].val) {
            newArr[i].col = colors.bad;
            flag = false;
        } else newArr[i].col = colors.good;
        setArr([...newArr]);
        await timer(delay);
    }
    return flag;
}

export async function bubbleSort(arr, arrSize, setArr, delay) {
    const newArr = arr;
    for (let i = 0; i < arrSize - 1; i++) {
        for (let j = 0; j < arrSize - i - 1; j++) {
            if (newArr[j].val > newArr[j + 1].val) {
                newArr[j + 1].col = colors.selected;
                newArr[j].col = colors.selected;
                setArr([...newArr]);
                let temp = newArr[j].val;
                newArr[j].val = newArr[j + 1].val;
                newArr[j + 1].val = temp;
                await timer(delay);
                newArr[j + 1].col = colors.default;
                newArr[j].col = colors.default;
                setArr([...newArr]);
            }
        }
        newArr[arrSize - 1 - i].col = colors.sorted;
    }
    finishAnim(arr, arrSize, setArr, delay);
}
export async function cocktailShaker(arr, arrSize, setArr, delay) {
    const newArr = arr;
    let start = 0,
        end = arrSize - 1;
    let flag = true;
    while (start <= end && flag) {
        flag = false;
        for (let i = start; i < end; i++) {
            newArr[i + 1].col = colors.selected;
            newArr[i].col = colors.selected;
            setArr([...newArr]);
            await timer(delay);

            if (newArr[i].val > newArr[i + 1].val) {
                flag = true;
                let temp = newArr[i].val;
                newArr[i].val = newArr[i + 1].val;
                newArr[i + 1].val = temp;
            }
            newArr[i + 1].col = colors.default;
            newArr[i].col = colors.default;
            setArr([...newArr]);
        }
        newArr[end].col = colors.sorted;
        setArr([...newArr]);
        end--;
        for (let j = end - 1; j >= start && flag; j--) {
            newArr[j].col = colors.selected;
            newArr[j + 1].col = colors.selected;
            setArr([...newArr]);
            await timer(delay);

            if (newArr[j].val > newArr[j + 1].val) {
                let temp = newArr[j].val;
                newArr[j].val = newArr[j + 1].val;
                newArr[j + 1].val = temp;
            }
            newArr[j + 1].col = colors.default;
            newArr[j].col = colors.default;
            setArr([...newArr]);
        }
        newArr[start].col = colors.sorted;
        start++;
    }
    while (start <= end) {
        newArr[start++].col = colors.sorted;
        setArr([...newArr]);
        await timer(delay);
    }
    finishAnim(arr, arrSize, setArr, delay);
}
export async function insertionSort(arr, arrSize, setArr, delay) {
    const newArr = arr;
    newArr[0].col = colors.sorted;
    for (let i = 1; i < arrSize; i++) {
        let j = i;
        newArr[i].col = colors.sorted;
        while (j > 0 && newArr[j - 1].val > newArr[j].val) {
            let p1 = newArr[j - 1].col,
                p2 = newArr[j].col;
            newArr[j - 1].col = colors.selected;
            newArr[j].col = colors.selected;
            setArr([...newArr]);

            let temp = newArr[j - 1].val;
            newArr[j - 1].val = newArr[j].val;
            newArr[j].val = temp;

            await timer(delay);

            newArr[j - 1].col = p1;
            newArr[j].col = p2;
            setArr([...newArr]);

            j--;
        }
    }
    finishAnim(arr, arrSize, setArr, delay);
}
export async function selectionSort(arr, arrSize, setArr, delay) {
    const newArr = arr;
    for (let i = 0; i < arrSize; i++) {
        let mn = i;
        newArr[i].col = colors.hold;
        for (let j = i + 1; j < arrSize; j++) {
            let p1 = newArr[j].col,
                p2 = newArr[mn].col;
            newArr[j].col = colors.selected;
            newArr[mn].col = colors.minimum;
            setArr([...newArr]);

            await timer(delay);

            newArr[j].col = p1;
            newArr[mn].col = p2;
            setArr([...newArr]);

            if (newArr[j].val < newArr[mn].val) mn = j;
        }
        let temp = newArr[i].val;
        newArr[i].val = newArr[mn].val;
        newArr[mn].val = temp;
        await timer(delay);
        setArr([...newArr]);
        newArr[i].col = colors.sorted;
    }
    finishAnim(arr, arrSize, setArr, delay);
}
export async function mergeSort(arr, arrSize, setArr, delay) {
    await mergeSortHelper(0, arrSize - 1);
    finishAnim(arr, arrSize, setArr, delay);
    async function mergeSortHelper(l, r) {
        if (l >= r) return;
        let mid = Math.floor((l + r) / 2);
        await mergeSortHelper(l, mid);
        await mergeSortHelper(mid + 1, r);
        await merge(l, r);
    }
    async function merge(l, r) {
        let mid = Math.floor((l + r) / 2);
        const newArr = arr;
        let start = l,
            start2 = mid + 1;
        while (start <= mid && start2 <= r) {
            if (newArr[start].val <= newArr[start2].val) {
                start++;
            } else {
                let value = newArr[start2].val;
                let index = start2;
                newArr[start].col = colors.selected;
                newArr[start2].col = colors.selected;
                setArr([...newArr]);
                while (index !== start) {
                    newArr[index].val = newArr[index - 1].val;
                    index--;
                }
                newArr[start].val = value;
                await timer(delay);
                newArr[start].col = colors.default;
                newArr[start2].col = colors.default;
                setArr([...newArr]);

                start++;
                mid++;
                start2++;
            }
        }
    }
}
export async function quickSort(arr, arrSize, setArr, delay) {
    await quickSortHelper(0, arrSize - 1);
    await finishAnim(arr, arrSize, setArr, delay);

    async function quickSortHelper(l, r) {
        if (l > r) return;
        const newArr = arr;
        let randomNumber = Math.floor(Math.random() * (r - l + 1) + l);
        [newArr[r], newArr[randomNumber]] = [newArr[randomNumber], newArr[r]];
        setArr([...newArr]);
        await timer(delay);
        let pivPoint = await partition(l, r, r);
        await quickSortHelper(l, pivPoint - 1);
        await quickSortHelper(pivPoint + 1, r);
    }

    async function partition(l, r, piv) {
        const newArr = arr;
        let i = l,
            j = l;
        newArr[piv].col = colors.hold;
        while (j < r) {
            newArr[j].col = colors.selected;
            if (newArr[j].val <= newArr[piv].val) {
                setArr([...newArr]);
                await timer(delay);
                let temp = newArr[i];
                newArr[i] = newArr[j];
                newArr[j] = temp;

                newArr[i].col = colors.left;

                i++;
            } else newArr[j].col = colors.right;
            j++;
        }
        await timer(delay);
        newArr[piv].col = colors.sorted;
        let temp = newArr[i];
        newArr[i] = newArr[piv];
        newArr[piv] = temp;
        setArr([...newArr]);
        return i;
    }
}

export async function heapSort(arr, arrSize, setArr, delay) {
    const newArr = arr;
    let n = arrSize;
    await heapify();
    await sort();
    await finishAnim(arr, arrSize, setArr, delay);

    async function siftDown(i) {
        if (i >= n) return;
        let lef = 2 * i + 1 < n ? newArr[2 * i + 1].val : -1;
        let rig = 2 * i + 2 < n ? newArr[2 * i + 2].val : -1;
        if (newArr[i].val >= Math.max(lef, rig)) return;
        let p1 = newArr[i].col;
        newArr[i].col = colors.hold;
        if (lef >= rig) {
            let p2 = newArr[2 * i + 1].col;

            let temp = newArr[2 * i + 1];
            newArr[2 * i + 1] = newArr[i];
            newArr[i] = temp;

            newArr[i].col = colors.left;

            await timer(delay);
            setArr([...newArr]);

            await siftDown(2 * i + 1);
            newArr[i].col = p1;
            newArr[2 * i + 1].col = p2;
            return;
        }
        let p2 = newArr[2 * i + 2].col;

        let temp = newArr[2 * i + 2];
        newArr[2 * i + 2] = newArr[i];
        newArr[i] = temp;

        newArr[i].col = colors.left;

        await timer(delay);
        setArr([...newArr]);

        await siftDown(2 * i + 2);
        newArr[i].col = p1;
        newArr[2 * i + 2].col = p2;
    }

    async function heapify() {
        for (let i = n - 1; i >= 0; i--) {
            await siftDown(i);
        }
    }

    async function sort() {
        while (n > 0) {
            n--;
            let temp = newArr[0];
            newArr[0] = newArr[n];
            newArr[n] = temp;
            newArr[n].col = colors.sorted;
            setArr([...newArr]);
            await timer(delay);
            await siftDown(0);
        }
        console.log("done");
    }
}

export async function bogoSort(arr, arrSize, setArr, delay) {
    while (!(await isSorted())) {
        await randomize();
    }
    await finishAnim(arr, arrSize, setArr, delay);

    async function isSorted() {
        let newArr = [...arr];
        let prevCol = newArr[0].col;
        newArr[0].col = colors.sorted;
        let flag = true;
        for (let i = 1; i < arrSize; i++) {
            if (newArr[i].val < newArr[i - 1].val) {
                newArr[i].col = colors.notSorted;
                flag = false;
            } else newArr[i].col = colors.sorted;
            setArr([...newArr]);
            await timer(delay);
        }
        for (let i = 0; i < arrSize; i++) {
            newArr[i].col = prevCol;
        }
        setArr([...newArr]);
        return flag;
    }

    async function randomize() {
        let newArr = [...arr];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        arr = [...newArr];
        setArr(newArr);
        await timer(delay);
    }
}
