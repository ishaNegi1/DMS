import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile, upload, folder } from "../assets/pictures";
import {
  Button,
  Button0,
  Create,
  Upload,
  Vector0,
  Vector1,
} from "../components/allComponents";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { createFolder, uploadFile, deleteFile } from "../store/uploadCreate";

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

  useEffect(() => {
    document.title = "DMS-User";
  });
  return (
    <>
      <Create />
      <Upload />
      <div className=" bg-gradient-nav-foot text-black sm:h-24 h-20 flex">
        <div className="flex items-center sm:ml-14 ml-4">
          <div className=" sm:w-12 sm:h-12 w-8 h-8 bg-white rounded-full flex justify-center items-center">
            <img src={profile} alt="logo" className=" w-5 h-5 sm:w-9 sm:h-9" />
          </div>
          <p className="font-Nunito px-2 font-semibold text-2xl sm:text-3xl">
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
          className=" sm:w-1/2 w-11/12 h-9 rounded-3xl mt-3 sm:ml-12 mx-2 p-2 border-2 border-main outline-4 outline-main"
        />
        <div className=" flex ml-auto mt-3 sm:mr-24">
          <Button0
            text="Upload file"
            img={upload}
            extra="w-4 m-1"
            onClick={handleUpload}
          />
          <Button0
            text="Create folder"
            img={folder}
            extra="w-5 m-1"
            onClick={handleCreate}
          />
        </div>
      </div>
      <div className=" w-full h-full mt-4 sm:p-4 p-1 ">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="border text-left sm:p-2 text-sm">Name</th>
              <th className="border text-left sm:p-2 text-sm">Description</th>
              <th className="border text-left sm:p-2 text-sm">File Type</th>
              <th className="border text-left sm:p-2 text-sm">Date</th>
              <th className="border text-left sm:p-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td className="border sm:p-2">{file.file.name}</td>
                <td className="border sm:p-2">{file.description}</td>
                <td className="border sm:p-2">{file.file.type}</td>
                <td className="border sm:p-2">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="border sm:p-2">
                  <div className="flex flex-col sm:flex-row justify-center items-center">
                    <Button
                      text="View"
                      onClick={() =>
                        window.open(URL.createObjectURL(file.file), "_blank")
                      }
                    />
                    <Button
                      text="Delete"
                      rest="mt-2 mx-1 sm:mt-0 sm:ml-2"
                      onClick={() => handleDelete(file.file.name)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Vector1 />
    </>
  );
};

export default User;
