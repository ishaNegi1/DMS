import React, { useEffect, useState } from "react";
import Vector0 from "../components/Vector0";
import { vector1, circle, } from "../assets/pictures";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Signup = () => {
  const[error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await createAccount({
      fullname: fullname.value,
      email: email.value,
      password: password.value,
    });
    if (user) {
      const user = await getUserData();
      if (user) dispatch(login(user));
      navigate("/User");
    }
    else{
      setError("User already exists.")
    }
  };

  useEffect(() => {
    document.title = "DMS-Signup";
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
            <p>place, always</p>
            <p>within reach.</p>
          </div>
          <p className=" font-Nunito text-3xl mt-8">
            Start organizing in minutes!
          </p>
          <p className=" font-Nunito text-4xl mt-11">
            Already have an account?{" "}
            <b className=" text-4xl">
              <u>
                <Link to="Login">Log in</Link>
              </u>
            </b>
          </p>
        </div>
      </div>
      <div className=" w-full sm:w-1/2 h-screen fixed right-0 top-0 sm:rounded-s-3xl rounded-none sm:border-l-2 border-l-0 border-main sm:bg-white">
        <p className=" font-Telex text-3xl sm:text-5xl font-medium sm:mt-20 mt-8 ml-10">
          Create Account
        </p>
        <form
          className="flex flex-col font-Telex sm:mt-11 mt-7 ml-10"
          onSubmit={handleSubmit}
        >
          <label htmlFor="fullname" className="mb-2 text-xl">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required
            className="border-0 border-b-2 border-input-line outline-none bg-transparent mb-4 py-1 w-11/12"
          />

          <label htmlFor="email" className="mb-2 text-xl">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border-0 border-b-2 border-input-line outline-none bg-transparent mb-4 py-1 w-11/12"
          />

          <label htmlFor="password" className="mb-2 text-xl">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border-0 border-b-2 border-input-line outline-none bg-transparent mb-4 py-1 w-11/12"
          />
          <p className=" text-red text-lg">{error}</p>
          <button
            type="submit"
            className="mt-4 bg-main text-white py-2 rounded-lg sm:w-96 w-64 sm:mx-auto ml-4 text-lg transition-all duration-500 ease-linear transform hover:scale-110"
          >
            Create Account
          </button>
        </form>
        <p className="sm:hidden block font-Nunito text-xl my-6 text-center">
          Already have an account?{" "}
          <b className=" text-2xl">
            <u>
              <Link to="Login">Log in</Link>
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
  );
};

export default Signup;
