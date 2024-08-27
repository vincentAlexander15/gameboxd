import "../styles/ProfileBanner.css";


// User is a string that represents the user's name. It will also be used to fetch the user's profile picture in the backend.
const ProfileBanner = ({user}) => {
    // Fetch the user's profile picture from the backend


    return (
        <div className="profile-card">
            <div className="profile-pfp">
                <img
                    src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z'/%3E%3C/svg%3E"
                    alt="Profile" 
                    className="users-profile-icon"
                />
            </div>
            <div className="profile-info">
                <div>{user}</div>
            </div>
        </div>
    );
};

export default ProfileBanner;
