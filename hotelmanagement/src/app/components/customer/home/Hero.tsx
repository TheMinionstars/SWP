import React from 'react'

type HeroProps = {
  children?: React.ReactNode
  hero?: string
}

const Hero: React.FC<HeroProps> = ({ children, hero = 'defaultHero' }) => {
  return <section className={hero}>{children}</section>
}

export default Hero
