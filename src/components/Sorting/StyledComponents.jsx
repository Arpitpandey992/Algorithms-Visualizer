import styled from "styled-components";

export const colors = {
    default: "#a52c44",
    selected: "skyblue",
    minimum: "#22c7b9",
    good: "green",
    bad: "red",
    hold: "purple",
    sorted: "#a5e48c",
    left: "#eea319",
    right: "#cf1773",
};

export const Bar = styled.div`
    width: 100%;
    height: ${(props) => props.height * 5}px;
    background-color: ${(props) => props.bg};
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 100px 3px 8px;
`;
export const StyledButton = styled.button`
    padding: 3px 10px;
    font-size: medium;
    box-shadow: rgba(0, 0, 0, 0.24) 3px 3px 8px;
    border-radius: 10px;
    border: outset;
    background-color: #dff0f9;
    -webkit-transition: background 300ms;
    transition: background 300ms;
    &:hover {
        background-color: #ffa7a7;
    }
    &:active {
        background-color: #92fe96;
        box-shadow: none;
        transform: translateX(2px) translateY(2px);
    }
`;
export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 10px;
    background-image: linear-gradient(to right, #fff7c7, #deffff);
    gap: 10px;
    margin: 10px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
export const VisualContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: ${({ siz }) => (siz <= 100 ? 2 : siz <= 300 ? 1 : 0)}px;
    flex: 1;
    border-radius: 15px;
    overflow: hidden;
`;
export const TopBar = styled.div`
    display: flex;
    /* padding: 10px; */
    gap: 10px;
    height: 40px;
    align-self: "center";
    justify-content: center;
`;
export const CounterBox = styled.div`
    width: 80px;
    background-color: #f8f8f8;
    border-radius: 10px;
    border: outset 1px grey;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.24) 3px 3px 8px;
    pointer-events: none;
`;
