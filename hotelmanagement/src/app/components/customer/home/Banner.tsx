import React from 'react'

type BannerProps = {
  children?: React.ReactNode
  title?: string
  subtitle?: string
}

const Banner: React.FC<BannerProps> = ({ children, title, subtitle }) => {
  return (
    <div className='banner'>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  )
}

export default Banner
