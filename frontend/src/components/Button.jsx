import React from 'react'
import {Link} from 'react-router-dom'

const Button = ({text, to, rest}) => {
  return (
    <button className={` bg-main text-white font-Telex ${rest} px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110`}><Link to={to}>{text}</Link></button>
  )
}

export default Button
