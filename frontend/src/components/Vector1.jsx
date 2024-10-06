import React, { useEffect } from 'react'
import { vector1, circle } from '../assets/pictures'
import gsap from 'gsap';

const Vector1 = () => {
  useEffect(()=>{
    gsap.to(".vector1", {
        scale: 1.2,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".circle1", {
        y: -50,
        duration: 2,
        ease: "linear",
        repeat: -1,
        yoyo: true,
      });
  })
    
  return (
    <>
      <img
        src={circle}
        alt="circle"
        className=" circle1 fixed sm:bottom-56 bottom-40 right-4 w-32 -z-20"
      />
      <img
        src={vector1}
        alt="vector"
        className=" vector1 h-40 sm:h-52 w-52 sm:w-72 fixed bottom-0 right-0 -z-20"
      />
    </>
  )
}

export default Vector1
