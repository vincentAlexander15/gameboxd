import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../components/AuthContext';
import { useState, useContext } from 'react';
import Pencil from "../images/PencilSVG";
import "../styles/SettingsPage.css";

const SettingsPage = () => {

    const [newUsername, setNewUsername] = useState('');
    const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useContext(AuthContext);
    const [isEditable, setIsEditable] = useState(false);
    const [notif, setNotif] = useState(null);
    const [error, setError] = useState(false);
  
    const handleEditClick = () => {
      setIsEditable(!isEditable);
    };
    const handleSaveClick = async (e) => {
      e.preventDefault();
      setIsEditable(false);
      try {
        const response = await fetch('http://localhost:5000/changeUsername?newUsername=' + newUsername + '&currentUser=' + currentUser, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
  
        const data = await response.json();
        if (data.message === 'Username updated successfully') {
          setCurrentUser(newUsername);
          localStorage.setItem('currentUser', newUsername);
          setError(false);
        } else {
          setError(true);
        }
        setNotif(data.message);
      } catch (error) {
        setNotif('Error: ' + error.message);
        setError(true);
      }
    };
  
    return (
      <div className="main">
        <Navbar/>
        <div className="content-area">
          <SecondNavbar/>
          <div className="settings">
            <h3 className="user-field-label">USERNAME</h3>
            {isEditable ? (
              <div className="user-field">
                <form onSubmit={handleSaveClick}>
                    <input
                        className="user"
                        type="text"
                        placeholder = { currentUser }
                        name="uname"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                    <button type="submit">Save</button>
                    <button onClick={handleEditClick}>Cancel</button>
                </form>
              </div>
            ) : (
              <div className="user-field">
                <input
                    className="user"
                    type="text"
                    placeholder = { currentUser }
                    disabled
                />
                <button className="pencil" onClick={handleEditClick}><Pencil/></button>
              </div>
            )}
            {error ? notif && <div className="error">{notif}</div> : notif && <div className="notif">{notif}</div>}
          </div>
        </div>
        <Footer/>
      </div>
    );
}

export default SettingsPage;