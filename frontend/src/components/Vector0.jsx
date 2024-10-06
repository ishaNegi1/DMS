import React from 'react'
import { vector0, circle } from '../assets/pictures'
import gsap from 'gsap';
import { useEffect } from 'react';

const Vector0 = () => {
    useEffect(()=>{
        gsap.to(".vector0", {
            scale: 1.2,   
            duration: 2,           
            ease: "power1.inOut",     
            repeat: -1,           
            yoyo: true,             
          });
          gsap.to(".circle0", {
            y: 50,
            duration: 2,            
            ease: "linear",
            repeat: -1,
            yoyo: true,
          });
      },[])

  return (
    <>
      <img
        src={vector0}
        alt="vector"
        className=" vector0 h-40 sm:h-60 w-52 sm:w-72 fixed top-0 left-0 -z-20"
      />
      <img
        src={circle}
        alt="circle"
        className=' circle0 fixed sm:top-64 left-4 top-40 w-32 -z-20'
      />
    </>
  )
}

export default Vector0
