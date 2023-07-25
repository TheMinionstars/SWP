import React from 'react'
import services from '@/app/data/services'

const Services: React.FC = () => {
  return (
    <section className='services'>
      <div className='section-title'>
        <h4>services</h4>
      </div>
      <div className='services-center'>
        {services?.map((item, index) => (
          <article key={index} className='services'>
            <span>
              <item.icon />
            </span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
