import React from 'react'

export type BoxProps = {
  children?: React.ReactNode
  title: string
}
const Box: React.FC<BoxProps> = ({ children, title }) => {
  return (
    <div className='border border-black border-opacity-10 md:rounded-lg overflow-hidden'>
      <div className='flex w-full border-b border-black border-opacity-10'>
        <p className='text-[#fb923c] font-semibold text-base border-b-2 border-primary w-full flex justify-center items-center py-3 outline-none focus:outline-none'>
          {title}
        </p>
      </div>
      {children}
    </div>
  )
}

export default Box
