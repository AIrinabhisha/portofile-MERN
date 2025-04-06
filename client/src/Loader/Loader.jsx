import React from 'react';

const Loader = () => {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-50'>
      <div className='flex gap-5 text-4xl font-semibold sm:text-3xl'>
        <h1 className="text-secondary animate-bounce">I</h1>
        <h1 className="text-white animate-bounce delay-150">A</h1>
        <h1 className="text-tertiary animate-bounce delay-300">R</h1>
      </div>
    </div>
  );
};

export default Loader;
