import { useState } from 'react';
import styled from 'styled-components'


const Button = styled.div`
    width: 10px;
    height: ${(props) => props.height * 5}px;
    background-color:crimson;
    border-radius:10px;
`
const Div = styled.div`
    display: flex;
    align-items:flex-end;
    gap: 1px;
    padding: 10px;
`
function SortAlgo() {

    const [arr, setArr] = useState([]);
    const [delay, setDelay] = useState(1.0);
    const randomize = () => {
        let cur = []
        for (let i = 0; i < 100; i++){
            cur.push(Math.floor(Math.random() * 100));
        }
        setArr(cur);
    }
    // const [arr, setArr] = useState([7, 4, 3, 4, 8, 5, 7, 6, 2, 5, 3, 4, 1]);
    const arrI = (index, value) => {
        setArr(arr.map((item, idx) => idx === index ? value : item));
        // console.log(arr);
    }
    const timer = ms => new Promise(res => setTimeout(res, ms))


    async function bubbleSort() {
        const newArr = arr;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (newArr[j] > newArr[j + 1]) {
                    let temp = newArr[j];
                    newArr[j] = newArr[j + 1];
                    newArr[j + 1] = temp;
                    setArr([...newArr]);
                    await timer(delay);
                }
            }
        }
    }
    async function cocktailShaker() {
        const newArr = arr;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i; j < arr.length - i - 1; j++) {
                if (newArr[j] > newArr[j + 1]) {
                    let temp = newArr[j];
                    newArr[j] = newArr[j + 1];
                    newArr[j + 1] = temp;
                    setArr([...newArr]);
                    await timer(delay);
                }
            }
            for (let j = arr.length - i - 2; j > i; j--) {
                if (newArr[j] < newArr[j - 1]) {
                    let temp = newArr[j];
                    newArr[j] = newArr[j - 1];
                    newArr[j - 1] = temp;
                    setArr([...newArr]);
                    await timer(delay);
                }
            }
        }
    }
    async function insertionSort() {
        const newArr = arr;
        for (let i = 1; i < arr.length; i++) {
            let j = i;
            while (j > 0 && newArr[j - 1] > newArr[j]) {
                let temp = newArr[j-1];
                newArr[j-1] = newArr[j];
                newArr[j] = temp;
                setArr([...newArr]);
                await timer(1);
                j--;
            }
        }
    }
    return (
        <Div>
            {arr.map((item, idx) => <Button height={item}></Button>)}
            <button onClick={()=>randomize()}>RANDOMIZEEE!</button>
            <button onClick={()=>bubbleSort()}>Bubble Sort</button>
            <button onClick={()=>insertionSort()}>Insertion Sort</button>
            <button onClick={()=>cocktailShaker()}>COCK!</button>
        </Div>
    )
}
export default SortAlgo;