import React from 'react';

const Button = ({ text, type = 'primary', onClick }) => {
  // Styles for the button based on the type (primary or secondary)
  const primaryStyles = "bg-[#5b1b6c] text-white px-4 py-2 text-xl font-medium hover:bg-[#7c1c74] transition-all duration-200";
  const secondaryStyles = "border border-[#5b1b6c] text-[#5b1b6c] text-xl px-4 py-2 font-medium hover:bg-[#5b1b6c] hover:text-white transition-all duration-200";

  return (
    <button
      className={type === 'primary' ? primaryStyles : secondaryStyles} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
