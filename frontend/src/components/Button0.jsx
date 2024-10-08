import React from 'react'

<<<<<<< HEAD:src/components/Button0.jsx
const Button0 = ({text, img,onClick, ...rest}) => {
  return (
<button onClick={onClick} className= "bg-main text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 sm:mx-2 mr-4 sm:h-10 flex justify-center items-center">
<img src={img} alt='image' {...rest}/>
=======
const Button0 = ({text, icon, extra, ...rest}) => {
  return (
<button className= "bg-main text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 sm:mx-2 mr-4 sm:h-10 flex justify-center items-center" {...rest}>
<div className=' mr-3'>
{icon}
</div>
>>>>>>> 23b64c3eea126a456cc566b2c1b0b0e3fe2fc648:frontend/src/components/Button0.jsx
{text}
</button>
  )
}

export default Button0
