import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";

const SettingsPage = () => {

    return (
        <div className="main">
            <Navbar/>
            <div className="content-area">
                <SecondNavbar/>
                <p>THIS IS A TEST</p>
            </div>
            <Footer/>
        </div>
    );
    
}

export default SettingsPage;