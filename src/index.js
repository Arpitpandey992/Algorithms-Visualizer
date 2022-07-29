import ReactDOM from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import SortAlgo from "./components/Sorting/SortAlgo";
import PathfindingAlgo from "./components/Pathfinding/PathfindingAlgo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <HashRouter>
      <Routes>
         <Route path="/" element={<App />}>
            <Route path="Sorting" element={<SortAlgo />} />
            <Route path="PathFinding" element={<PathfindingAlgo />} />
         </Route>
      </Routes>
   </HashRouter>
);
