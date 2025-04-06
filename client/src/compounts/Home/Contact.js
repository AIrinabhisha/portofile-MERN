import React, { useEffect, useState } from 'react';
import SectionTItle from '../SectionTItle';
import cont from "./cov.png";
import axios from 'axios';

const Contact = () => {
  const [user, setUser] = useState(null); // Make sure this is used
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio/user');
        console.log("Fetched user data:", response.data);
        setUser(response.data[0]); // <- THIS is the fix
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };
  
    fetchUser();
  }, []);
  

  const displayOrder = ["name", "email", "age", "gender", "phoneNo", "country"];

  return (
    <div className='px-20 sm:px-4'>
      <SectionTItle title="Say hi" /><br /><br />
      <div className='flex sm:flex-col items-start justify-between sm:gap-8'>
        
        {/* Left Side - User Info */}
        <div className='flex flex-col text-sm sm:text-xs mt-4 gap-1 w-1/2 sm:w-full sm:px-4 px-32'>
          <p className='text-tertiary'>{"{"}</p>
          <div className='ml-5'>
            {user ? (
              displayOrder.map((key, index) => (
                <p key={index}>
                  <span className="text-tertiary">{key}</span>:{" "}
                  <span className='text-tertiary'>
                    "{user[key]}"
                  </span>,
                </p>
              ))
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>
          <p className='text-tertiary'>{"}"}</p>
        </div>

        {/* Right Side - Image */}
        <div className='w-2/3 sm:w-full flex justify-center'>
          <img src={cont} alt='Invalid' className='w-[400px] sm:w-[280px] h-auto object-contain' />
        </div>
      </div>
    </div>
  );
};

export default Contact;
