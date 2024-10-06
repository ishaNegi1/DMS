import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button0,
  Create,
  Upload,
  Vector0,
  Vector1,
} from "../components/allComponents";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { createFolder, uploadFile, deleteFile } from "../store/uploadCreate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileArrowUp,
  faFolderPlus,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const files = useSelector((state) => state.uploadCreate.files);

  const handleCreate = () => {
    dispatch(createFolder(true));
  };
  const handleUpload = () => {
    dispatch(uploadFile(true));
  };

  const logoutHandler = () => {
    logout().then(() => {
      dispatch(logout());
    });
    navigate("/");
  };

  const handleDelete = (fileName) => {
    dispatch(deleteFile(fileName));
  };

  const handleSearch = (e) => {
    const main = document.getElementById("main");
    const items = main.getElementsByClassName("sub");
    const text = e.target.value.toLowerCase();
    Array.from(items).forEach((item) => {
      const name = item.getElementsByClassName("fileName")[0];
      if (name.textContent.toLowerCase().indexOf(text) != -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  useEffect(() => {
    document.title = "DMS-User";
  });
  return (
    <>
      <Create />
      <Upload />
      <div className=" bg-gradient-nav-foot text-black sm:h-24 h-20 flex">
        <div className="flex items-center sm:ml-14 ml-4">
          <div className=" sm:w-12 sm:h-12 w-7 h-7 bg-white rounded-full flex justify-center items-center">
            <FontAwesomeIcon icon={faUser} className=" w-5 h-6" />
          </div>
          <p className="font-Nunito px-2 font-semibold text-xl sm:text-2xl">
            {/* {userData.fullname}  */}
            User
          </p>
        </div>
        <div className="ml-auto flex items-center sm:mr-1 mr-2">
          <Link
            to="/"
            className="font-Telex sm:mr-8 mr-2 text-lg sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 px-2 py-1 sm:px-3 sm:py-1"
          >
            Home
          </Link>
          <button
            className="bg-main text-white font-Telex ${rest} px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 sm:mr-20 mr-4 sm:h-10"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
      <Vector0 />
      <div className=" flex sm:flex-row flex-col">
        <input
          type="text"
          placeholder="Search anything..."
          className=" sm:w-1/2 w-11/12 h-12 rounded-3xl mt-3 sm:ml-12 mx-2 p-2 border-2 border-main outline-4 outline-main"
          onKeyUp={handleSearch}
        />
        <div className=" flex ml-auto mt-3 sm:mr-24">
          <Button0
            text="Upload file"
            icon=<FontAwesomeIcon icon={faFileArrowUp} />
            extra="w-4 m-1"
            onClick={handleUpload}
          />
          <Button0
            text="Create folder"
            icon=<FontAwesomeIcon icon={faFolderPlus} />
            extra="w-5 m-1"
            onClick={handleCreate}
          />
        </div>
      </div>
      <div className=" w-full h-full sm:p-4 p-1 flex flex-wrap" id="main">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative border-2 border-gray-300 rounded-lg w-auto sm:mx-4 mx-1 mt-7 shadow-lg hover:shadow-2xl hover:shadow-gray shadow-main transition-shadow duration-300 sub"
            onClick={() =>
              window.open(URL.createObjectURL(file.file), "_blank")
            }
          >
            <div className="relative p-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faFile} className="w-12 h-12" />
                <div className="ml-4 flex sm:flex-col flex-row flex-wrap">
                  <p className="text-lg">
                    <b>File Type:</b> {file.file.type}
                  </p>
                  <p className="text-lg">
                    <b>Date:</b> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className=" text-lg">
                  <b>Name:</b>{" "}
                  <p className=" fileName">
                    {file.file.name.split(".").slice(0, -1).join(" ")}
                  </p>
                </p>
                <p className="text-lg mt-1">
                  <b>Description:</b> {file.description}
                </p>
              </div>
            </div>
            <button className=" ml-4 cursor-pointer">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="w-6 h-6"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file.file.name);
                }}
              />
            </button>
          </div>
        ))}
      </div>
      <Vector1 />
    </>
  );
};

export default User;
