// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to my app!</h1>
      <Link to="/DataPage">
        <button>Go to Data</button>
      </Link>
    </div>
  );
}

export default HomePage;
