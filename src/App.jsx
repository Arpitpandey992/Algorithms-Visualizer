import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
    flex: 0;
    display: flex;
    gap: 10px;
    justify-content: end;
    height: 100%;
    padding: 10px 10px 10px 0px;
    margin: 5px 10px 5px 10px;
    background-color: lightcoral;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 15px;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color:inherit;
`;
const LinkDiv = styled.div`
    padding: 10px;
    background-color: #ffc4ad;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 3px 3px 8px;
    -webkit-transition: background 300ms;
    transition: background 300ms;
    &:hover {
        background-color: #ffa7a7;
    }
    &:active {
        
        box-shadow: rgba(0, 0, 0, 0.24) 1px 1px 8px;
        transform: translateX(2px) translateY(2px);
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    height: 100vh;
`;
function App() {
    return (
        <Container>
            <NavBar>
                <StyledLink to="/">
                    <LinkDiv>Home</LinkDiv>
                </StyledLink>
                <StyledLink to="/Sorting">
                    <LinkDiv>Sorting Algorithms</LinkDiv>
                </StyledLink>
                <StyledLink to="/PathFinding">
                    <LinkDiv>Searching Algorithms</LinkDiv>
                </StyledLink>
            </NavBar>
            <Outlet />
        </Container>
    );
}

export default App;
