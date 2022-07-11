import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';

const colors = {
    default: 'crimson',
    selected: 'blue',
    minimum: 'lightgreen',
    good: 'green',
    bad: 'red',
    hold:'purple',
}

const Button = styled.div`
    width: 100%;
    height: ${(props) => props.height * 5}px;
    background-color:${props => props.bg};
    border-radius:10px;
`
const Div = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    padding: 10px;
    gap:10px;
`
function SortAlgo() {

    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(25);
    const [delay, setDelay] = useState(5.00);
    const randomize = () => {
        let cur = []
        for (let i = 0; i < arrSize; i++) {
            cur.push({ val: Math.floor(Math.random() * 100 + 1), col: colors.default });
        }
        setArr(cur);
    }
    const timer = ms => new Promise(res => setTimeout(res, ms))

    const finishAnim = async () => {
        let newArr = arr;
        newArr[0].col = colors.good;
        for (let i = 1; i < arrSize; i++) {
            if (newArr[i] < newArr[i - 1])
                newArr[i].col = colors.bad;
            else
                newArr[i].col = colors.good;
            setArr([...newArr]);
            await timer(delay);
        }
    }

    async function bubbleSort() {
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
                    await timer(1);
                    newArr[j + 1].col = colors.default;
                    newArr[j].col = colors.default;
                    setArr([...newArr]);
                }
            }
        }
        finishAnim();
    }
    async function cocktailShaker() {
        const newArr = arr;
        let start = 0, end = arrSize - 1, flag = true;
        while (flag) {
            flag = false;
            for (let i = start; i < end; i++) {
                newArr[i + 1].col = colors.selected;
                newArr[i].col = colors.selected;
                setArr([...newArr]);

                if (newArr[i].val > newArr[i + 1].val) {
                    let temp = newArr[i].val;
                    newArr[i].val = newArr[i + 1].val;
                    newArr[i + 1].val = temp;
                    await timer(delay);
                    flag = true;
                }
                newArr[i + 1].col = colors.default;
                newArr[i].col = colors.default;
                setArr([...newArr]);
            }
            if (!flag)
                break;
            flag = false;
            end--;
            for (let j = end - 1; j >= start; j--) {
                newArr[j].col = colors.selected;
                newArr[j + 1].col = colors.selected;
                setArr([...newArr]);

                if (newArr[j].val > newArr[j + 1].val) {
                    let temp = newArr[j].val;
                    newArr[j].val = newArr[j + 1].val;
                    newArr[j + 1].val = temp;
                    await timer(delay);
                    flag = true;
                }
                newArr[j + 1].col = colors.default;
                newArr[j].col = colors.default;
                setArr([...newArr]);
            }
        }
        finishAnim();

    }
    async function insertionSort() {
        const newArr = arr;
        for (let i = 1; i < arrSize; i++) {
            let j = i;
            while (j > 0 && newArr[j - 1].val > newArr[j].val) {
                newArr[j - 1].col = colors.selected;
                newArr[j].col = colors.selected;
                setArr([...newArr]);

                let temp = newArr[j - 1].val;
                newArr[j - 1].val = newArr[j].val;
                newArr[j].val = temp;

                await timer(delay);

                newArr[j - 1].col = colors.default;
                newArr[j].col = colors.default;
                setArr([...newArr]);

                j--;
            }
        }
        finishAnim();

    }
    async function selectionSort() {
        const newArr = arr;
        for (let i = 0; i < arrSize; i++) {
            let mn = i;
            newArr[i].col = colors.hold;
            for (let j = i + 1; j < arrSize; j++) {
                let p1 = newArr[j].col, p2 = newArr[mn].col;
                newArr[j].col = colors.selected;
                newArr[mn].col = colors.minimum;
                setArr([...newArr]);

                await timer(delay);
                
                newArr[j].col = p1;
                newArr[mn].col = p2;
                setArr([...newArr]);
                
                if (newArr[j].val < newArr[mn].val)
                mn = j;
            }
            let temp = newArr[i].val;
            newArr[i].val = newArr[mn].val;
            newArr[mn].val = temp;
            await timer(delay);
            setArr([...newArr]);
            newArr[i].col = colors.default;
        }
        finishAnim();

    }
    async function mergeSort() {
        await mergeSortHelper(0, arrSize - 1);
        finishAnim();
    }
    async function mergeSortHelper(l, r) {
        if (l >= r) return;
        let mid = Math.floor((l + r) / 2);
        await mergeSortHelper(l, mid);
        await mergeSortHelper(mid + 1, r);
        const newArr = arr;
        const sortedArr = [];
        let i = l, j = mid + 1;
        while (i <= mid || j <= r) {
            while (i <= mid && j <= r) {
                newArr[i].col = colors.selected;
                newArr[j].col = colors.selected;
                setArr([...newArr]);
                await timer(delay);
                newArr[i].col = colors.default;
                newArr[j].col = colors.default;
                setArr([...newArr]);

                if (newArr[i].val <= newArr[j].val)
                    sortedArr.push(newArr[i++]);
                else
                    sortedArr.push(newArr[j++]);

            }
            while (i <= mid)
                sortedArr.push(newArr[i++]);
            while (j <= r)
                sortedArr.push(newArr[j++]);
        }
        i = l; j = 0;
        while (i <= r) {
            newArr[i].col = colors.minimum;
            setArr([...newArr]);
            await timer(delay);
            newArr[i].col = colors.default;

            newArr[i] = sortedArr[j];
            i++; j++;
            setArr([...newArr]);
        }
    }

    useEffect(() => {
        randomize();
    }, [arrSize])

    return (
        <Div>
            <div style={{ display: 'flex', width: '100%', padding: '10px', gap: '10px' }}>
                <div>Array Size</div>
                <ReactSlider
                    className="horizontal-slider"
                    marks
                    markClassName="example-mark"
                    min={1}
                    max={1000}
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    value={arrSize}
                    onChange={((val) => setArrSize(val))}
                />
                <div>Delay in ms</div>
                <ReactSlider
                    className="horizontal-slider"
                    marks
                    markClassName="example-mark"
                    min={1}
                    max={100}
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    value={delay}
                    onChange={((val) => setDelay(val))}
                />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => randomize()}>RANDOMIZEEE!</button>
                <button onClick={() => bubbleSort()}>Bubble Sort</button>
                <button onClick={() => insertionSort()}>Insertion Sort</button>
                <button onClick={() => cocktailShaker()}>Cocktail Shaker Sort</button>
                <button onClick={() => selectionSort()}>Selection Sort</button>
                <button onClick={() => mergeSort()}>Merge Sort</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', width: '95vw', height: '500px' }}>
                {arr.map((item, idx) => <Button height={item.val} bg={item.col}></Button>)}
            </div>
        </Div>
    )
}
export default SortAlgo;