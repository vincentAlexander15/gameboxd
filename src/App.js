import React, { useState, useEffect } from 'react';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);

  // Function to get the access token
  useEffect(() => {
    const id = process.env.REACT_APP_TWITCH_CLIENT_ID;
    const secret = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(`https://id.twitch.tv/oauth2/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`, requestOptions)
        .then(response => response.json())
        .then(data => setAccessToken(data.access_token));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => {
    if (accessToken) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: "fields name; limit 20;",
        };
        const fetchData = async () => {
          const response = await fetch('/igdb/games', requestOptions);
          const result = await response.json()
          console.log('API Result: ', result);
          setData(result)
        }
        fetchData(accessToken)
    }
  }, [accessToken]);

  return (
    <div className="text-center">
      <div>
        <pre>{JSON.stringify(data, null, 5)}</pre>
      </div>
    </div>
    );
}

export default App;
