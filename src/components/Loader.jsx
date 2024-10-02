import React from "react";

const Loader = () => {
    
  return (
      <div className='flex justify-center items-center h-screen'>
          <div className='sm:h-8 sm:w-8 h-7 w-7 bg-main rounded-full mr-1 animate-bounce'></div>
          <div
              className='sm:h-8 sm:w-8 h-7 w-7 bg-main rounded-full mr-1 animate-bounce200'
          ></div>
          <div className = 'sm:h-8 sm:w-8 h-7 w-7 bg-main rounded-full animate-bounce400'></div>
      </div>
  );
};

export default Loader;
