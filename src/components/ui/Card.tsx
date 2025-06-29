import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${
      hover ? 'hover:shadow-xl transition-shadow duration-200' : ''
    } ${className}`}>
      {children}
    </div>
  )
}

export default Card