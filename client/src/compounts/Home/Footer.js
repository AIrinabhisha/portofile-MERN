import React from 'react';

const Footer = () => {
  return (
    <div className='py-10 bg-primary'>
      {/* Divider Line */}
      <div className='h-[1px] w-full bg-gray-700 mb-6'></div>

      {/* Footer Content */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center'>
        <h1 className="text-tertiary">Developed and Designed by</h1>
        <h1 className='text-tertiary font-semibold'>Irin Abhisha Rani A</h1>
      </div>
    </div>
  );
};

export default Footer;
