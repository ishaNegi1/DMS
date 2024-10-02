import {logo, vector1, pic1, pic2, pic3, pic4, circle,} from "../assets/pictures";
import { Button, Footer, Vector0 } from "../components/allComponents";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
    document.title = 'DMS-Home'
    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px)", () => {
      const headings = document.querySelectorAll(".scroll-text .hd");
      const paragraphs = document.querySelectorAll(".scroll-text .txt");
      headings.forEach((heading) => {
        const text = heading.innerText.split("");
        heading.innerHTML = "";
        text.forEach((char) => {
          const span = document.createElement("span");
          span.innerText = char === " " ? "\u00A0" : char;
          heading.appendChild(span);
        });
        gsap.from(heading.children, {
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            once: false,
          },
          opacity: 0,
          y: 30,
          duration: 1.5,
          ease: "power1.out",
          stagger: 0.1,
        });
      });
      paragraphs.forEach((paragraph) => {
        gsap.from(paragraph, {
          scrollTrigger: {
            trigger: paragraph,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            once: false,
          },
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power1.out",
        });
      });

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
    });

    mm.add("(max-width: 640px)", () => {
      const headings = document.querySelectorAll(".scroll-text .hd");
      const paragraphs = document.querySelectorAll(".scroll-text .txt");
      headings.forEach((heading) => {
        const text = heading.innerText.split("");
        heading.innerHTML = "";
        text.forEach((char) => {
          const span = document.createElement("span");
          span.innerText = char === " " ? "\u00A0" : char;
          heading.appendChild(span);
        });
        gsap.from(heading.children, {
          scrollTrigger: {
            trigger: heading,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            once: false,
          },
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power1.out",
          stagger: 0.05,
        });
      });
      paragraphs.forEach((paragraph) => {
        gsap.from(paragraph, {
          scrollTrigger: {
            trigger: paragraph,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            once: false,
          },
          opacity: 0,
          y: 10,
          duration: 0.8,
          ease: "power1.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if(loader){
    return <Loader />
  }

  return (
    <>
      <div className=" bg-gradient-nav-foot text-black sm:h-24 h-20 flex">
        <div className="flex items-center sm:ml-14 ml-4">
          <img src={logo} alt="logo" className=" w-11 h-11 sm:w-16 sm:h-16" />
          <p className="font-Nunito px-2 font-semibold text-2xl sm:text-3xl">
            DMS
          </p>
        </div>
        <div className="ml-auto flex items-center sm:mr-7 mr-2">
          <Link
            to="/"
            className="font-Telex sm:mr-14 mr-2 text-lg sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 px-2 py-1 sm:px-3 sm:py-1"
          >
            Home
          </Link>
          <Button text="Login" rest="sm:mr-7 mr-2 sm:h-10" to="Login" />
          <Button text="Signup" rest="sm:mr-16 mr-2 sm:h-10" to="Signup" />
        </div>
      </div>
      <Vector0 />
      <div className="text-black scroll-text sm:mt-5 mt-1 sm:w-2/3 p-8 mx-auto scroll-text">
        <p className="font-Kalnia text-3xl sm:text-5xl text-center">
          Welcome To DMS
        </p>
        <div className="font-Judson text-lg sm:text-2xl mt-4 text-center txt">
          Effortlessly manage, upload, create, and organize all your important
          documents in one convenient place. With our intuitive interface, you
          can easily upload files, create folders, and add detailed
          descriptions, keeping your digital workspace clutter-free and highly
          organized. Whether you need to view or permanently delete files, every
          action is just a few clicks away, making it easier than ever to stay
          productive.
        </div>
        <div className=" text-center">
          <Button
            text="Get Started"
            rest="sm:mr-10 mr-2 mt-3 sm:h-10"
            to="Signup"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center scroll-text ">
        <img
          src={pic1}
          alt="pic"
          className=" sm:w-2/6 w-64 h-auto sm:mr-auto sm:ml-44 ml-2 transition-all duration-700 ease-in-out transform hover:scale-110"
        />
        <div className="text-black sm:mr-7 sm:ml-8 mt-3">
          <p className="font-Kalnia text-2xl sm:text-4xl hd">Upload Files</p>
          <div className="font-Judson text-justify text-lg sm:text-2xl w-60 mt-4 txt sm:w-10/12">
            Seamlessly upload files from your device into the system with a
            simple file selection process. The interface allows you to browse
            and upload various file types efficiently.
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center scroll-text">
        <div className="text-black sm:ml-52 mt-3">
          <p className="font-Kalnia text-2xl sm:text-4xl hd">Search Files</p>
          <div className="font-Judson text-justify text-lg sm:text-2xl sm:w-10/12 w-60 mt-4 txt">
            Quickly find files and folders by searching for their names using
            the intuitive search bar. Whether you have hundreds or thousands of
            documents, this feature saves your time by allowing you to instantly
            locate the files you need.
          </div>
        </div>
        <img
          src={pic2}
          alt="pic"
          className=" sm:w-1/3 w-64 h-auto mt-8 sm:mt-0 sm:ml-auto sm:mr-28 mr-2 transition-all duration-700 ease-in-out transform hover:scale-110"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center scroll-text">
        <img
          src={pic3}
          alt="pic"
          className=" sm:w-2/6 w-64 h-auto sm:mt-2 sm:mr-auto sm:ml-44 ml-2 transition-all duration-700 ease-in-out transform hover:scale-110 -mt-6"
        />
        <div className="text-black sm:mr-7 sm:ml-8">
          <p className="font-Kalnia text-2xl sm:text-4xl hd">View Files</p>
          <div className="font-Judson text-justify text-lg sm:text-2xl w-60 mt-4 txt sm:w-10/12">
            Access your files and documents directly within the system without
            the need for downloading. Files can be opened in their native
            applications, allowing you to manage and interact with them quickly.
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center scroll-text">
        <div className="text-black sm:ml-72">
          <p className="font-Kalnia text-2xl sm:text-4xl hd">Delete Files</p>
          <div className="font-Judson text-justify text-lg sm:text-2xl sm:w-10/12 w-60 mt-4 txt mb-6">
            Permanently delete files you no longer need with a single action.
            Once a file is deleted, it cannot be recovered, ensuring that your
            storage remains organized and free from unnecessary files. This
            feature is essential for maintaining a clean and clutter-free
            system.
          </div>
        </div>
        <img
          src={pic4}
          alt="pic"
          className=" sm:w-1/3 w-64 h-auto mt-8 sm:mt-0 sm:ml-auto sm:mr-28 mr-2 transition-all duration-700 ease-in-out transform hover:scale-110"
        />
      </div>

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
      <Footer />
    </>
  );
}

export default Home;
