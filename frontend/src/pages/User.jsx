import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button0, Button } from "../components/allComponents";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faFolderPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { notFound } from "../assets/pictures";
import service from "../hooks/Api";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth);
  const [Username, setUsername] = useState("");
  const [folders, setfolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFileCheckOpen, setIsFileCheckOpen] = useState(false);
  const [isSelectedFolder, setIsSelectedFolder] = useState(false);
  const [isAddFolder, setIsAddFolder] = useState(false);
  // console.log(selectedFile)

  useEffect(() => {
    document.title = "DMS-User";
    setUsername(userData?.user?.name);
    const fetchFolders = async () => {
      try {
        const fetchedFolders = await service.getFoldersnFiles(
          userData?.user?._id
        );
        // console.log(fetchedFolders);
        setfolders(fetchedFolders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, [userData]);

  const logoutHandler = async () => {
    try {
      const loggingout = await service.logoutUser();
      // console.log(loggingout);
      dispatch(logout());
      navigate("/");
    } catch (error) {
      return "Couldn't Logout";
    }
  };

  const handleAddFolder = async () => {
    try {
      if (selectedFolder) {
        setIsSelectedFolder(true);
      } else {
        setIsAddFolder(true);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleFolderCreate = async () => {
    const folderName = document.querySelector(".folderInput").value;
    if (!folderName) return;
    const newFolder = await service.createFolder(
      userData?.user?._id,
      folderName
    );
    // console.log("Folder created:", newFolder);
    setfolders([...folders, newFolder]);
    setIsAddFolder(false);
  };

  const handleFolderClick = async (folder) => {
    setSelectedFolder(folder);
    try {
      const files =
        folders.find((f) => f.folder._id === folder._id)?.files || [];
      setFiles(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handlestream = async (fileid) => {
    try {
      if (!(selectedFolder && fileid)) {
        alert("File or Folder Not selected");
      }
      const streaming = await service.streamfile(selectedFolder?._id, fileid);
      console.log(streaming);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const uploadfilecheck = () => {
    if (folders && selectedFolder) {
      setIsDialogOpen(true);
    } else {
      setIsFileCheckOpen(true);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedFolder) return;
    const formData = new FormData();
    formData.append("folderId", selectedFolder._id);
    formData.append("userId", userData?.user?._id);
    formData.append("file", selectedFile);

    try {
      const uploadedFile = await service.Addfile(formData);
      console.log("File uploaded:", uploadedFile);
      if (uploadedFile) {
        setFiles((prevFiles) => [...prevFiles, uploadedFile?.file]);
        setfolders((prevFolders) =>
          prevFolders?.map((f) =>
            f.folder._id === selectedFolder?._id
              ? { ...f, files: [...f?.files, uploadedFile?.file] }
              : f
          )
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsDialogOpen(false);
      setSelectedFile(null);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await service.deleteFolder(folderId);
      setfolders((prevFolders) =>
        prevFolders.filter((folder) => folder.folder._id !== folderId)
      );
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await service.deleteFile(selectedFolder._id, fileId);
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    const items = document.getElementsByClassName("sub");
    Array.from(items).forEach((item) => {
      const name = item.querySelector(".fileName").textContent.toLowerCase();
      if (name.includes(text)) {
        item.style.display = "flex";
        item.style.justifyContent = "space-between";
      } else {
        item.style.display = "none";
      }
    });
  };

  return !userData.status ? (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={notFound} alt="not found" className=" w-80 -mt-24" />
      <p className=" font-Telex text-xl text-center px-1">
        Oops! It looks like you're not logged in.
      </p>
      <Button text="Go to Home" to="/" rest="mt-4" />
    </div>
  ) : (
    <>
      <div className=" bg-gradient-nav-foot text-black sm:h-24 h-20 flex">
        <div className="flex items-center sm:ml-14 ml-4">
          <div className=" sm:w-12 sm:h-12 w-9 h-9 bg-white rounded-full flex justify-center items-center">
            <FontAwesomeIcon icon={faUser} className=" w-5 h-6" />
          </div>
          <p className="font-Nunito px-2 font-semibold text-xl sm:text-2xl">
            {Username}
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
      <div className=" flex sm:flex-row flex-col">
        <input
          type="text"
          placeholder="Search anything..."
          className=" sm:w-1/2 w-11/12 h-12 rounded-3xl mt-3 sm:ml-12 mx-2 px-4 border-2 border-main outline-4 outline-main text-xl"
          onKeyUp={handleSearch}
        />
        <div className=" flex ml-auto mt-3 sm:mr-24">
          <Button0
            text="Upload file"
            icon=<FontAwesomeIcon icon={faFileArrowUp} />
            onClick={uploadfilecheck}
          />
          <Button0
            text="Add folder"
            icon=<FontAwesomeIcon icon={faFolderPlus} />
            onClick={handleAddFolder}
          />
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 w-full h-full bg-white z-50 flex justify-center items-center">
          <div className="bg-gradient-pop w-11/12 sm:w-1/3 h-auto p-6 rounded-xl">
            <p className=" text-3xl mb-5 text-white">Upload file</p>
            <form>
              <input
                type="file"
                id="file-input"
                required
                onChange={handleFileChange}
                className="mb-4 text-white"
              />
              <div className=" flex flex-col flex-wrap justify-center items-center">
                <button
                  className="bg-purple text-white px-4 py-2 rounded-md hover:scale-110 transition-all duration-500 ease-linear w-3/4"
                  onClick={handleFileUpload}
                >
                  Upload
                </button>
                <button
                  className="mt-4 bg-purple text-white px-4 py-2 rounded-md hover:scale-110 transition-all duration-500 ease-linear w-3/4"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddFolder && (
        <div className="fixed inset-0 w-full h-full bg-white z-50 flex justify-center items-center">
          <div className="bg-gradient-pop w-11/12 sm:w-1/3 h-auto p-6 rounded-xl">
            <p className=" text-3xl mb-3 text-white">Create folder</p>
            <label
              htmlFor="name"
              className=" mb-2 mr-1 text-xl font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className=" sm:w-1/2 h-9 px-1 mb-3 rounded-md folderInput"
            />
            <div className=" flex flex-col flex-wrap justify-center items-center">
              <button
                className="bg-purple text-white px-4 py-2 rounded-md hover:scale-110 transition-all duration-500 ease-linear w-3/4"
                onClick={handleFolderCreate}
              >
                Create
              </button>
              <button
                className="mt-4 bg-purple text-white px-4 py-2 rounded-md hover:scale-110 transition-all duration-500 ease-linear w-3/4"
                onClick={() => setIsAddFolder(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isFileCheckOpen && (
        <div className="fixed inset-0 w-full h-full bg-white z-50 flex justify-center items-center">
          <div className="bg-gradient-pop w-11/12 sm:w-1/3 h-auto p-6 rounded-xl text-center">
            <p className=" text-white text-2xl">
              Open/Create a folder to upload files
            </p>

            <button
              className="mt-4 bg-purple text-white px-4 py-2 rounded-md hover:scale-110 transition-all duration-500 ease-linear w-2/4"
              onClick={() => setIsFileCheckOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isSelectedFolder && (
        <div className="fixed inset-0 w-full h-full bg-white z-50 flex justify-center items-center">
          <div className="bg-gradient-pop w-11/12 sm:w-1/3 h-auto p-6 rounded-xl text-center">
            <p className=" text-white text-2xl text-center">
              Go back to dashboard to create another folder
            </p>

            <button
              className="mt-4 bg-purple text-white px-4 py-2 rounded-md hover:scale-110 transition-all duration-500 ease-linear w-2/4"
              onClick={() => setIsSelectedFolder(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="folders-container sm:ml-12 mx-2 my-4">
        {!selectedFolder ? (
          <>
            <p className=" font-Telex font-medium text-2xl mb-3">Folders</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {folders?.length > 0 ? (
                folders?.map((data, index) => (
                  <div
                    className="relative rounded-lg w-auto h-auto sm:mx-4 px-2 mt-2 shadow-lg shadow-gray flex justify-between sub py-2 bg-white bg-opacity-75 "
                    key={data.folder._id || index}
                    onClick={() => handleFolderClick(data.folder)}
                  >
                    <p className=" sm:text-xl text-sm font-Nunito font-normal fileName break-words overflow-hidden">
                      {data.folder.name}
                    </p>
                    <button
                      className=" cursor-pointer transition-transform duration-300 hover:scale-110
                    "
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="sm:w-5 sm:h-5 w-4 h-4 ml-2 transition-transform duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFolder(data.folder._id);
                        }}
                      />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-40 col-span-full">
                  <p className="font-Nunito font-medium text-3xl text-center">
                    Folder is empty
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="files-container">
            <button
              onClick={handleBackToFolders}
              className="bg-main text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-sm sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 sm:mx-2 mr-4 sm:h-10 flex justify-center items-center my-5"
            >
              Back to Folders
            </button>
            <p className="font-Telex font-medium text-2xl mb-3 mt-3 break-words overflow-hidden">
              Folders/{selectedFolder.name}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {files?.length > 0 ? (
                files?.map((file, index) => (
                  <div
                    className="relative rounded-lg w-auto h-auto sm:mx-4 mx-1 mt-4 shadow-lg shadow-gray transition-shadow duration-300 flex items-center justify-between sub px-4 py-2 bg-white bg-opacity-75"
                    key={file?._id || index}
                    onClick={() => handlestream(file?._id)}
                  >
                    <p className="text-center sm:text-xl text-sm font-Nunito font-normal fileName break-words overflow-hidden">
                      {file?.originalName}
                    </p>
                    <button className="cursor-pointer ml-auto transition-transform duration-300 hover:scale-110">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="sm:w-5 sm:h-5 w-4 h-4 ml-2 transition-transform duration-300"
                        
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file._id);
                        }}
                      />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-40 col-span-full">
                  <p className="font-Nunito font-medium text-3xl text-center">
                    Folder is empty
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
