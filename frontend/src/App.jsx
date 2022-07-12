import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import SortAlgo from "./components/Sorting/SortAlgo";

const NavBar = styled.nav`
  flex:0;
  display: flex;
  gap:10px;
  justify-content:end;
  height: 100%;
  padding:10px 10px 10px 0px;
  margin: 5px 10px 5px 10px;
  background-color:lightcoral;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius:15px;
`
const StyledLink = styled(Link)`
  text-decoration:none;
`
const LinkDiv = styled.div`
  padding:10px;
  background-color:lightsalmon;
  border-radius:10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:stretch;
  justify-content:stretch;
  height:100vh;
`
function App() {
  return (
    <Container>
      <NavBar>
        <LinkDiv><StyledLink to='/Sorting'>Sorting Algorithms</StyledLink></LinkDiv>
        <LinkDiv><StyledLink to='/Searching'>Searching Algorithms</StyledLink></LinkDiv>
      </NavBar>
      <Outlet/>
    </Container>
  );
}

export default App;
