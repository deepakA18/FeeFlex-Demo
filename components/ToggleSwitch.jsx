"use client";

import React from 'react';

const ToggleSwitch = ({ ariaLabel, css, handleClick, children }) => {
  return (
    <button
      aria-label={ariaLabel}
      type="button"
      className={`${css} group  bg-transparent p-2 rounded-lg hover:text-[#1B4332]  hover:bg-[#d8f3dc] flex justify-center items-center mr-4 h-[60px] w-[60px] border-2 border-[#d8f3dc]`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ToggleSwitch;
