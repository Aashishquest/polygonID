
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AOS from "aos";

import BuyfromOtherChain from "./Dashboard/BuyFromOtherchain";
import RateWithDetails from "./Dashboard/RateWithDetails";
import RateWithDetailsPath from "./Dashboard/RateWithDetailsPath";
import RateWithDetails2Path from "./Dashboard/RateWithDetails2Path";
import PolygonID from "./Dashboard/PolygonID";


function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PolygonID />} />
        <Route path="/best" element={<RateWithDetails2Path />} />
        <Route path="/simple" element={<BuyfromOtherChain />} />
        <Route path="/Details" element={<RateWithDetails />} />
        <Route path="/Path" element={<RateWithDetailsPath />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
