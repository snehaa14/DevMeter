import React from 'react';


const Button = ({ text, type = 'primary', onClick }) => {
  // Styles for the button based on the type (primary or secondary)
  const primaryStyles = "bg-red-500 text-white px-4 py-2 text-xl  font-medium hover:bg-red-600";
  const secondaryStyles = "border border-red-500 text-red-500 text-xl px-4 py-2 font-medium hover:bg-red-100";

  return (
    <button
      className={type === 'primary' ? primaryStyles : secondaryStyles} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
