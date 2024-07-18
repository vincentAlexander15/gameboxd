import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/HomePage";
import Data from "./pages/DataPage";
import Game from "./pages/GamePage";
import Signup from "./pages/Signup";
import Profile from "./pages/ProfilePage";
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/DataPage" element={<Data/>}/>
          <Route path="/GamePage" element={<Game/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/Profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
