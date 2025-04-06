import React from 'react';
import SectionTItle from '../SectionTItle';

const ContactMe = () => {
  return (
    <div className='px-6 sm:px-10 lg:px-32 py-10'>
      <SectionTItle title="Contact Me" /><br />

      <form className='flex flex-col gap-4 mt-8 bg-primary p-8 rounded-lg shadow-lg'>
        <input 
          type='text' 
          placeholder='Full Name' 
          className='p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary'
        />
        <input 
          type='text' 
          placeholder='What’s the Matter?' 
          className='p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-secondary'
        />
        <textarea 
          placeholder='Enter Briefly..' 
          rows="5"
          className='p-3 rounded-md border border-gray-600 bg-transparent text-white resize-none focus:outline-none focus:ring-2 focus:ring-secondary'
        />
        <button 
          type='submit' 
          className='bg-secondary text-white py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 w-fit self-end'
        >
          Send a Message
        </button>
      </form>
    </div>
  );
};

export default ContactMe;
