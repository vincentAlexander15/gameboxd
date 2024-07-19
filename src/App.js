import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/HomePage";
import Data from "./pages/DataPage";
import Game from "./pages/GamePage";
import Signup from "./pages/Signup";
import Profile from "./pages/ProfilePage";
import Library from "./pages/LibraryPage";
import Settings from "./pages/SettingsPage";
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
          <Route path="/Library" element={<Library/>}/>
          <Route path="/Settings" element={<Settings/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
