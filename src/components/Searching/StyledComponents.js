import styled from "styled-components";

export const colors = {
    empty: "white",
    wall: "grey",
    visited: "lightblue",
    start: "crimson",
    end: "teal",
    path: "palevioletred",
};

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    background-image: linear-gradient(to right, #fff7c7, #deffff);
    margin: 10px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const VisualContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${(props) => props.col}, 1fr);
    flex: 1;
    row-gap: ${(props) => props.rowGap}px;
    column-gap: ${(props) => props.colGap}px;
`;
export const GridBox = styled.div`
    background-color: ${(props) => props.bg};
    border: 1px solid gray;
    border-top-left-radius: ${(props) => props.TLR}px;
    border-top-right-radius: ${(props) => props.TRR}px;
    border-bottom-left-radius: ${(props) => props.BLR}px;
    border-bottom-right-radius: ${(props) => props.BRR}px;
    box-shadow: rgba(0, 0, 0, 0.24) 1px 3px 8px;
`;
