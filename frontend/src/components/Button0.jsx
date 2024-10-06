import React from 'react'

const Button0 = ({text, icon, extra, ...rest}) => {
  return (
<button className= "bg-main text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 sm:mx-2 mr-4 sm:h-10 flex justify-center items-center" {...rest}>
<div className=' mr-3'>
{icon}
</div>
{text}
</button>
  )
}

export default Button0
