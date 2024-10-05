import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "../store/uploadCreate";

const Create = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.uploadCreate.createStatus);

  const handleCancel = () => {
    dispatch(createFolder(false));
  };

  return (
    <>
      {show && (
        <div className=" w-full h-full bg-white opacity-95 fixed z-50 flex justify-center items-center">
          <div className=" w-3/4 h-2/5 sm:w-1/3 rounded-xl bg-gradient-pop flex flex-col justify-center">
            <div className=" sm:ml-8 ml-2 p-3 sm:mt-5 mt-2">
              <p className=" text-3xl mb-2">Create folder</p>
              <form className=" flex flex-col">
                <label htmlFor="name" className=" mb-2 text-xl font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className=" sm:w-1/2 rounded-md"
                />
                <label htmlFor="desc" className=" mb-2 text-xl font-medium">
                  Description
                </label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  maxLength={80}
                  required
                  className=" sm:w-1/2 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-purple text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 my-3 sm:w-2/5"
                >
                  Create
                </button>
              </form>
              <button
                className="bg-purple text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 w-full sm:w-2/5 sm:relative sm:left-48 sm:bottom-11"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Create;
