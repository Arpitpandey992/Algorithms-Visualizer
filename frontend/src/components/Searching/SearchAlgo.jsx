import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactSlider from 'react-slider';
import { BFS } from './Algorithms/BFS';
import Slider from '../Slider';
import { CounterBox, TopBar } from '../Sorting/SortAlgo';
import { DFS } from './Algorithms/DFS';
import { DrunkDFS } from './Algorithms/Drunk_DFS';

export const colors = {
    empty: 'white',
    wall: 'grey',
    visited: 'lightblue',
    start: 'crimson',
    end: 'teal',
    path: 'palevioletred'
}

const StyledButton = styled.button`
    padding:0px 10px;
    font-size:large;
`
const Container = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding: 10px;
    gap:10px;
    /* background-image: linear-gradient(to right, #fff7c7 , #deffff); */
    margin:10px;
    border-radius:20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    `

const VisualContainer = styled.div`
    display: grid;
    /* grid-template-rows:repeat(${props => props.row},1fr); */
    grid-template-columns:repeat(${props => props.col},1fr);
    /* grid-gap:2px; */
    flex:1;
    border:1px solid;
`
const GridBox = styled.div`
    background-color:${props => props.bg};
    border:1px solid;
    /* border-radius:10px; */    
    `
export let start, end;
function SearchAlgo() {
    const [arr, setArr] = useState([]);
    const [row, setRow] = useState(20);
    const [col, setCol] = useState(40);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [delay, setDelay] = useState(5.00);

    const randomize = (restore = false) => {
        let newArr = [];
        for (let i = 0; i < row * col; i++) {
            newArr.push({
                val: i,
                visited: false,
                type: 'empty', //type = Empty, wall, Path
                par: -1,
            });
        }
        setArr(newArr);
        if (!restore) {
            let strt = Math.floor(Math.random() * (row * col));
            let ed = Math.floor(Math.random() * (row * col));
            start = strt;
            end = ed;
        }
    }

    const changeType = (i, type) => {
        if (i == start || i == end) return;
        let newArr = [...arr];
        newArr[i].type = type;
        if (type === 'wall')
            newArr[i].visited = false;
        setArr([...newArr]);
    }
    const getColor = (item) => {
        if (start === item.val)
            return colors.start;
        if (end === item.val)
            return colors.end;
        if (['wall', 'path'].includes(item.type))
            return colors[item.type];
        if (item.visited)
            return colors['visited']
        return colors[item.type];
    }

    const handleMouseDown = (i) => {
        setIsMousePressed(true);
        if (arr[i].type !== 'empty' && arr[i].type !== 'wall') return;
        let type = (arr[i].type === 'empty' ? 'wall' : 'empty');
        changeType(i, type);
    }
    const handleMouseEnter = (i) => {
        if (!isMousePressed) return;
        if (arr[i].type !== 'empty' && arr[i].type !== 'wall') return;
        let type = (arr[i].type === 'empty' ? 'wall' : 'empty');
        changeType(i, type);
    }
    const handleMouseUp = (i) => {
        setIsMousePressed(false);
    }

    useEffect(() => {
        randomize();
    }, [row, col]);

    return (
        <Container>
            <TopBar style={{ padding: '0px 10px' }}>
                <CounterBox style={{ width: '200px' }}>Row</CounterBox>
                <CounterBox>{row}</CounterBox>

                <div style={{ width: '800px' }}><Slider
                    min={5}
                    max={100}
                    value={row}
                    onChange={((val) => setRow(val))}
                /></div>
                <CounterBox style={{ width: '200px' }}>Column</CounterBox>
                <CounterBox>{col}</CounterBox>

                <div style={{ width: '800px' }}><Slider
                    min={5}
                    max={100}
                    value={col}
                    onChange={((val) => setCol(val))}
                /></div>
                <CounterBox style={{ width: '200px' }}>Delay</CounterBox>
                <CounterBox style={{ flexGrow: '1' }}>{delay}</CounterBox>
                <div style={{ width: '800px' }}><Slider
                    min={0}
                    max={100}
                    step={5}
                    value={delay}
                    onChange={((val) => setDelay(val))}
                /></div>
            </TopBar>
            <TopBar style={{ padding: '0px 10px' }}>
                <StyledButton onClick={() => randomize()}>RANDOMIZEEE!</StyledButton>
                <StyledButton onClick={() => randomize(true)}>Restore</StyledButton>
                <StyledButton onClick={() => BFS(arr, setArr, row, col, delay)}>BFS</StyledButton>
                <StyledButton onClick={() => DFS(arr, setArr, row, col, delay, randomize)}>DFS</StyledButton>
                <StyledButton onClick={() => DrunkDFS(arr, setArr, row, col, delay)}>Drunk DFS</StyledButton>
            </TopBar>
            <VisualContainer row={row} col={col}>
                {arr.map((item, i) => (
                    <GridBox
                        draggable='false'
                        bg={getColor(item)}
                        onMouseDown={() => handleMouseDown(i)}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseUp={() => handleMouseUp(i)}
                    ></GridBox>
                ))}
            </VisualContainer>
        </Container >
    )
}
export default SearchAlgo;