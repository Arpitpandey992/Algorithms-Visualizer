import { useEffect, useState } from "react";
import {
    bubbleSort,
    cocktailShaker,
    insertionSort,
    selectionSort,
    mergeSort,
    quickSort,
} from "./SortAlgorithms";
import Slider from "../Slider";
import {
    CounterBox,
    StyledButton,
    TopBar,
    Container,
    colors,
    Bar,
    VisualContainer,
} from "./StyledComponents";

function SortAlgo() {
    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(25);
    const [delay, setDelay] = useState(5.0);

    const randomize = () => {
        let cur = [];
        for (let i = 0; i < arrSize; i++) {
            cur.push({
                val: Math.floor(Math.random() * 100 + 1),
                col: colors.default,
            });
        }
        setArr(cur);
    };
    useEffect(() => {
        randomize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrSize]);

    return (
        <Container>
            <TopBar>
                <CounterBox style={{ width: "200px" }}>Array Size</CounterBox>
                <CounterBox>{arrSize}</CounterBox>
                <Slider
                    min={1}
                    max={1000}
                    value={arrSize}
                    onChange={(val) => setArrSize(val)}
                />
                <CounterBox style={{ width: "200px" }}>Delay</CounterBox>
                <CounterBox>{delay}</CounterBox>
                <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={delay}
                    onChange={(val) => setDelay(val)}
                />
            </TopBar>
            <TopBar>
                <StyledButton
                    onClick={() => randomize(arr, arrSize, setArr, delay)}
                >
                    RANDOMIZE!
                </StyledButton>
                <StyledButton
                    onClick={() => bubbleSort(arr, arrSize, setArr, delay)}
                >
                    Bubble Sort
                </StyledButton>
                <StyledButton
                    onClick={() => insertionSort(arr, arrSize, setArr, delay)}
                >
                    Insertion Sort
                </StyledButton>
                <StyledButton
                    onClick={() => cocktailShaker(arr, arrSize, setArr, delay)}
                >
                    Cocktail Shaker Sort
                </StyledButton>
                <StyledButton
                    onClick={() => selectionSort(arr, arrSize, setArr, delay)}
                >
                    Selection Sort
                </StyledButton>
                <StyledButton
                    onClick={() => mergeSort(arr, arrSize, setArr, delay)}
                >
                    Merge Sort
                </StyledButton>
                <StyledButton
                    onClick={() => quickSort(arr, arrSize, setArr, delay)}
                >
                    Quick Sort
                </StyledButton>
            </TopBar>
            <VisualContainer siz={arrSize}>
                {arr.map((item, idx) => (
                    <Bar height={item.val} bg={item.col}></Bar>
                ))}
            </VisualContainer>
        </Container>
    );
}
export default SortAlgo;
