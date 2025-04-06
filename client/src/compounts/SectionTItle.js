import React from 'react'

const SectionTItle = ({title,}) => {
  return (
    <div className='flex gap-10 items-center py - 8'>
        <h1 className='text-2xl text-secondary '>{title}</h1>
        <div className='w-40 h-[1px] bg-white'></div>
    </div>
  )
}

export default SectionTItle
