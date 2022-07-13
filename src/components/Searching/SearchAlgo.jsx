import { useEffect, useState } from "react";
import { BFS } from "./Algorithms/BFS";
import Slider from "../Slider";
import { CounterBox, StyledButton, TopBar } from "../Sorting/StyledComponents";
import { DFS } from "./Algorithms/DFS";
import { DrunkDFS } from "./Algorithms/Drunk_DFS";
import {
    colors,
    Container,
    GridBox,
    VisualContainer,
} from "./StyledComponents";

export let start, end;
function SearchAlgo() {
    const [arr, setArr] = useState([]);
    const [row, setRow] = useState(20);
    const [col, setCol] = useState(40);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [delay, setDelay] = useState(5.0);

    const randomize = (restore = false) => {
        let newArr = [];
        for (let i = 0; i < row * col; i++) {
            newArr.push({
                val: i,
                visited: false,
                type: "empty", //type = Empty, wall, Path
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
    };

    const changeType = (i, type) => {
        if (i === start || i === end) return;
        let newArr = [...arr];
        newArr[i].type = type;
        if (type === "wall") newArr[i].visited = false;
        setArr([...newArr]);
    };
    const getColor = (item) => {
        if (start === item.val) return colors.start;
        if (end === item.val) return colors.end;
        if (["wall", "path"].includes(item.type)) return colors[item.type];
        if (item.visited) return colors["visited"];
        return colors[item.type];
    };

    const handleMouseDown = (i) => {
        setIsMousePressed(true);
        if (arr[i].type !== "empty" && arr[i].type !== "wall") return;
        let type = arr[i].type === "empty" ? "wall" : "empty";
        changeType(i, type);
    };
    const handleMouseEnter = (i) => {
        if (!isMousePressed) return;
        if (arr[i].type !== "empty" && arr[i].type !== "wall") return;
        let type = arr[i].type === "empty" ? "wall" : "empty";
        changeType(i, type);
    };
    const handleMouseUp = (i) => {
        setIsMousePressed(false);
    };

    useEffect(() => {
        randomize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row, col]);

    return (
        <Container>
            <TopBar style={{ padding: "0px 10px" }}>
                <CounterBox style={{ width: "200px" }}>Row</CounterBox>
                <CounterBox>{row}</CounterBox>

                <div style={{ width: "800px" }}>
                    <Slider
                        min={5}
                        max={100}
                        value={row}
                        onChange={(val) => setRow(val)}
                    />
                </div>
                <CounterBox style={{ width: "200px" }}>Column</CounterBox>
                <CounterBox>{col}</CounterBox>

                <div style={{ width: "800px" }}>
                    <Slider
                        min={5}
                        max={100}
                        value={col}
                        onChange={(val) => setCol(val)}
                    />
                </div>
                <CounterBox style={{ width: "200px" }}>Delay</CounterBox>
                <CounterBox style={{ flexGrow: "1" }}>{delay}</CounterBox>
                <div style={{ width: "800px" }}>
                    <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={delay}
                        onChange={(val) => setDelay(val)}
                    />
                </div>
            </TopBar>
            <TopBar style={{ padding: "0px 10px" }}>
                <StyledButton onClick={() => randomize()}>
                    RANDOMIZE!
                </StyledButton>
                <StyledButton onClick={() => BFS(arr, setArr, row, col, delay)}>
                    BFS
                </StyledButton>
                <StyledButton
                    onClick={() => DFS(arr, setArr, row, col, delay, randomize)}
                >
                    DFS
                </StyledButton>
                <StyledButton
                    onClick={() => DrunkDFS(arr, setArr, row, col, delay)}
                >
                    Drunk DFS
                </StyledButton>
            </TopBar>
            <VisualContainer
                row={row}
                col={col}
                rowGap={Math.floor((1080 * 0.05) / row)}
                colGap={Math.floor((1920 * 0.05) / col)}
            >
                {arr.map((item, i) => (
                    <GridBox
                        draggable="false"
                        TLR={item.val === 0 ? 15 : 3}
                        TRR={item.val === col - 1 ? 15 : 3}
                        BLR={item.val === (row - 1) * col ? 15 : 3}
                        BRR={item.val === row * col - 1 ? 15 : 3}
                        bg={getColor(item)}
                        onMouseDown={() => handleMouseDown(i)}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseUp={() => handleMouseUp(i)}
                    ></GridBox>
                ))}
            </VisualContainer>
        </Container>
    );
}
export default SearchAlgo;
