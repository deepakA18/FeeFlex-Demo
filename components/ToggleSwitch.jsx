import React from 'react';

const ToggleSwitch = ({ ariaLabel, css, handleClick, children }) => {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      className={`${css} border bg-transparent p-2 rounded-md w-10 h-10 hover:bg-white flex justify-center items-center mr-8`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ToggleSwitch;
