import React, { useEffect, useState } from "react";
import {Vector0, Loader} from '../components/allComponents';
import { vector1, circle } from "../assets/pictures";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
<<<<<<< HEAD:src/pages/Signup.jsx
import service from "../hooks/Api"
import { login } from "../store/authSlice";
=======
import service from "../hooks/Api";

>>>>>>> 23b64c3eea126a456cc566b2c1b0b0e3fe2fc648:frontend/src/pages/Signup.jsx
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD:src/pages/Signup.jsx
    const user = await service.createAccount(
       fullname.value,
       email.value,
       password.value,
    );
    if (user) {
      dispatch(login(user));
      navigate("/User");
    }
    else{
      setError("User already exists.")
=======
    setLoading(true);
    const user = await service.createAccount(fullname, email, password);
    // console.log(user);
    if (user) {
      dispatch(login(user));
      setLoading(false);
      navigate("/Login");
    } else {
      setLoading(false);
      setError("User already exists.");
>>>>>>> 23b64c3eea126a456cc566b2c1b0b0e3fe2fc648:frontend/src/pages/Signup.jsx
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

  return loading ? <Loader /> : (
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
        <p className=" font-Telex text-3xl sm:text-5xl font-medium sm:mt-20 mt-20 ml-10">
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
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="border-0 border-b-2 border-input-line outline-none bg-transparent mb-4 py-1 w-11/12"
          />

          <label htmlFor="email" className="mb-2 text-xl">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-0 border-b-2 border-input-line outline-none bg-transparent mb-4 py-1 w-11/12"
          />

          <label htmlFor="password" className="mb-2 text-xl">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
