//Creates and imports style for buttons
import React from 'react';

//Creates button component
const Button = ({ text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;