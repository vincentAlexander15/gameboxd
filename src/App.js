import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/HomePage";
import Data from "./pages/DataPage";
import Game from "./pages/GamePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/DataPage" element={<Data/>}/>
        <Route path="/GamePage" element={<Game/>}/>
      </Routes>
    </Router>
  );
}

export default App;
