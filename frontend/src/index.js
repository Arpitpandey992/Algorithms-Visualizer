import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import SortAlgo from "./components/Sorting/SortAlgo";
import SearchAlgo from "./components/Searching/SearchAlgo";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="Sorting" element={<SortAlgo />} />
        <Route path="Searching" element={<SearchAlgo />} />
      </Route>
    </Routes>
  </BrowserRouter>
);