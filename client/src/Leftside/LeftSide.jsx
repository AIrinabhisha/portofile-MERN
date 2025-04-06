import React from 'react'

const LeftSide = () => {
  return (
    <div className='gap-10'> 
      <div className='fixed left-0 bottom-0 px-10 sm:static'>
      <div className="flex flex-col items-center">
       <div className="flex flex-col gap-3 sm:flex-row">
        <a href='https://www.facebook.com/profile.php?id=61564644102451'>
        <i class="ri-facebook-circle-line text-gray-600 text-xl">
        
        </i>
        </a>
        <a href='https://mail.google.com/mail/u/0/#inbox'>
        <i class="ri-mail-line text-gray-600 text-xl"></i>
        </a>
        <a href='https://github.com/AIrinabhisha/'>
        <i class="ri-github-fill text-gray-600 text-xl"></i></a>
        <a href='https://www.instagram.com/?hl=en'>
        <i class="ri-instagram-line text-gray-600 text-xl"></i></a>
        <a href='https://www.linkedin.com/in/irinabhisha/'>
        <i class="ri-linkedin-box-fill text-gray-600 text-xl"></i></a>
        </div>
        <div className='w-[1px] h-32 bg-[#85b9bc] sm:hidden '>  
            {/* for putting line in the website */}
            
        </div>
       </div>
      </div>
      
    </div>
  )
}

export default LeftSide
