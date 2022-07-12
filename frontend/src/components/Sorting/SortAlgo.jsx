import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';
import { bubbleSort, cocktailShaker, insertionSort, selectionSort, mergeSort, quickSort } from './SortAlgorithms';

export const colors = {
    default: 'crimson',
    selected: 'blue',
    minimum: 'lightgreen',
    good: 'green',
    bad: 'red',
    hold: 'purple',
    sorted: '#a5e48c',
    left: '#eea319',
    right: '#cf1773',
}

const Bar = styled.div`
    width: 100%;
    height: ${(props) => props.height * 5}px;
    background-color:${props => props.bg};
    border-radius:10px;
`
const StyledButton = styled.button`
    padding:10px;
    font-size:x-large;

`
const Container = styled.div`
    flex:1;
    display: flex;
    flex-direction:column;
    align-items:stretch;
    padding: 10px;
    gap:10px;
    background-image: linear-gradient(to right, #fff7c7 , #deffff);
    margin:10px;
    border-radius:20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const VisualContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${({ siz }) => siz <= 100 ? 2 : siz <= 300 ? 1 : 0}px;
    flex:1;
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
    useEffect(() => {
        randomize();
    }, [arrSize])

    return (
        <Container>
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
            <div style={{ display: 'flex', gap: '10px', alignSelf: 'center' }}>
                <StyledButton onClick={() => randomize(arr, arrSize, setArr, delay)}>RANDOMIZEEE!</StyledButton>
                <StyledButton onClick={() => bubbleSort(arr, arrSize, setArr, delay)}>Bubble Sort</StyledButton>
                <StyledButton onClick={() => insertionSort(arr, arrSize, setArr, delay)}>Insertion Sort</StyledButton>
                <StyledButton onClick={() => cocktailShaker(arr, arrSize, setArr, delay)}>Cocktail Shaker Sort</StyledButton>
                <StyledButton onClick={() => selectionSort(arr, arrSize, setArr, delay)}>Selection Sort</StyledButton>
                <StyledButton onClick={() => mergeSort(arr, arrSize, setArr, delay)}>Merge Sort</StyledButton>
                <StyledButton onClick={() => quickSort(arr, arrSize, setArr, delay)}>Quick Sort</StyledButton>
            </div>
            <VisualContainer siz={arrSize}>
                {arr.map((item, idx) => <Bar height={item.val} bg={item.col}></Bar>)}
            </VisualContainer>
        </Container>
    )
}
export default SortAlgo;