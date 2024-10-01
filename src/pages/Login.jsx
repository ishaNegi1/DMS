import React, { useEffect } from "react";
import Vector0 from "../components/Vector0";
import { vector1, circle, google } from "../assets/pictures";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
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
  }, []);
  
  return (
    <>
      <Vector0 />
      <div className=" sm:block hidden">
      <div className=" absolute top-32 left-28">
        <div className=" font-AbhayaLibre text-3xl sm:text-6xl font-semibold">
          <p>All your files in one </p>
          <p>place, access them</p>
          <p>instantly.</p>
        </div>
        <p className=" font-Nunito text-3xl mt-8">
        Log in and get started!
        </p>
        <p className=" font-Nunito text-4xl mt-11">
        Don't have an account yet?{" "}
          <b className=" text-4xl">
            <u>
              <Link to="Signup">Sign up</Link>
            </u>
          </b>
        </p>
      </div>
      </div>
      <div className=" w-full sm:w-1/2 h-screen fixed right-0 top-0 sm:rounded-s-3xl rounded-none sm:border-l-2 border-l-0 border-main sm:bg-white">
        <p className=" font-Telex text-3xl sm:text-5xl font-medium mt-20 ml-10">
        Welcome Back
        </p>
        <form className="flex flex-col font-Telex mt-11 ml-10">
          <label htmlFor="email" className="mb-2 text-xl">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-0 border-b-2 border-input-line outline-none bg-transparent mb-4 py-1 w-11/12"
          />

          <label htmlFor="password" className="mb-2 text-xl">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-0 border-b-2 border-input-line outline-none bg-transparent mb-4 py-1 w-11/12"
          />

          <button
            type="submit"
            className="mt-4 bg-main text-white py-2 rounded-lg sm:w-96 w-64 sm:mx-auto ml-4 text-lg transition-all duration-500 ease-linear transform hover:scale-110"
          >
            Login
          </button>
        </form>
        <p className=" sm:hidden block font-Nunito text-xl my-6 text-center">
        Don't have an account yet?{" "}
          <b className=" text-2xl">
            <u>
              <Link to="Signup">Sign up</Link>
            </u>
          </b>
        </p>
      </div>
      <img
        src={circle}
        alt="circle"
        className=" circle1 fixed sm:bottom-56 bottom-40 sm:right-1/2 right-4 w-32 -z-20"
      />
      <img
        src={vector1}
        alt="vector"
        className=" vector1 h-40 sm:h-52 w-52 sm:w-72 fixed bottom-0 sm:right-1/2 right-0 -z-20"
      />
    </>
  )
}

export default Login
