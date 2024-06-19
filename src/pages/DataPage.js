import React, { useState, useEffect } from 'react';


const DataPage = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [data, setData] = useState(null);
  
    // Function to get the access token
    useEffect(() => {
      const id = process.env.REACT_APP_TWITCH_CLIENT_ID;
      const secret = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      };
      fetch(`https://id.twitch.tv/oauth2/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`, requestOptions)
          .then(response => response.json())
          .then(data => setAccessToken(data.access_token));
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
            body: 'fields *; search "sonic the hedgehog"; limit 100;',
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
          {data && 
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Summary</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.summary}</td>
                    <td><a href={item.url} target="_blank" rel="noopener noreferrer">Link</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
  
  export default DataPage;