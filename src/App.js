import React, { useContext } from 'react';
import { HashRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Home from "./pages/HomePage";
import Data from "./pages/DataPage";
import Game from "./pages/GamePage";
import Signup from "./pages/Signup";
import Profile from "./pages/ProfilePage";
import Library from "./pages/LibraryPage";
import Settings from "./pages/SettingsPage";
import User from "./pages/UserPage";
import Friends from "./pages/FriendsPage";
import { AuthContext, AuthProvider } from './components/AuthContext';
import './styles/global.css';

function App() {

  const PrivateRoutes = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        currentUser ? <Outlet/> : <Navigate to='/signup'/>
      )
  }
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/DataPage" element={<Data/>}/>
          <Route path="/GamePage" element={<Game/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/UserPage" element={<User/>}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Library" element={<Library/>}/>
            <Route path="/Settings" element={<Settings/>}/>
            <Route path="/Friends" element={<Friends/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

