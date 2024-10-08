import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile, upload, file, folder } from "../assets/pictures";
import { Button0, Vector0, Vector1 } from "../components/allComponents";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import service from "../hooks/Api"
const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth);
  const [Username, setUsername] = useState('');
  const [folders, setfolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(selectedFile)
  useEffect(() => {
    if (userData?.status != true) {
      navigate("/");
      return;
    }
    setUsername(userData?.user?.name);
    const fetchFolders = async () => {
      try {
        const fetchedFolders = await service.getFoldersnFiles(userData?.user?._id);
        console.log(fetchedFolders);
        setfolders(fetchedFolders);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, [userData])

  const logoutHandler = async () => {
    try {
      const loggingout = await service.logoutUser();
      console.log(loggingout);
      dispatch(logout());
      navigate("/");
    } catch (error) {
      return "Couldn't Logout"
    }
  };
  const handleAddFolder = async () => {
    try {
      const folderName = prompt("Enter folder name:");
      if (!folderName) return;

      const newFolder = await service.createFolder(userData?.user?._id, folderName);
      console.log("Folder created:", newFolder);
      setfolders([...folders, newFolder]);

    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };
  const handleFolderClick = async (folder) => {
    setSelectedFolder(folder); 
    try {
      const files = folders.find(f => f.folder._id === folder._id)?.files || []; 
      setFiles(files); 
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  const handlestream=async (fileid)=>{
    try {
      if (!(selectedFolder && fileid)) {
        alert('File or Folder Not selected');
      }
      const streaming=await service.streamfile(selectedFolder?._id,fileid);
      console.log(streaming);
    } catch (error) {
      console.error(error);
    }
  }
  const handleBackToFolders = () => {
    setSelectedFolder(null); 
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); 
  };
  const uploadfilecheck=()=>{
    if (folders && selectedFolder) {
      setIsDialogOpen(true);
    }else{
      alert("Open a Folder or Create a folder");
    }
  }
  const handleFileUpload = async () => {
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
          prevFolders.map((f) =>
            f.folder._id === selectedFolder._id
              ? { ...f, files: [...f?.files, uploadedFile?.file] }
              : f
          )
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    finally {
      setIsDialogOpen(false);
    }
  };
  return (
    <>
      <div className=" bg-gradient-nav-foot text-black sm:h-24 h-20 flex">
        <div className="flex items-center sm:ml-14 ml-4">
          <div className=" sm:w-12 sm:h-12 w-8 h-8 bg-white rounded-full flex justify-center items-center">
            <img src={profile} alt="logo" className=" w-5 h-5 sm:w-9 sm:h-9" />
          </div>
          <p className="font-Nunito px-2 font-semibold text-2xl sm:text-3xl">
            {/* {userData.fullname}  */}
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
      <Vector0 />
      <div className=" flex sm:flex-row flex-col">
        <input
          type="text"
          placeholder="Search anything..."
          className=" sm:w-1/2 w-11/12 h-9 rounded-3xl mt-3 sm:ml-12 mx-2 p-2 border-2 border-main outline-4 outline-main"
        />
        <div className=" flex ml-auto mt-3 sm:mr-24">
          <Button0 text="Upload file" img={upload} className="w-4 m-1" onClick={uploadfilecheck} />
          {/* REF-2 */}
          <Button0
            text="Add folder"
            img={folder}
            className="w-5 m-1"
            onClick={handleAddFolder}
          />
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-md">
            <h2 className="font-Nunito text-xl mb-3">Upload File</h2>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <button
                className="bg-main text-white rounded-lg px-4 py-2 mt-2"
                onClick={handleFileUpload}
              >
                Upload
              </button>
            )}
            <button
              className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="folders-container mt-5 sm:ml-12 mx-2">
        {!selectedFolder ? (
          <>
            <h2 className="font-Nunito text-xl mb-3">Folders</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {folders?.length > 0 ? (
                folders?.map((data,index) => (
                  <div
                    key={data.folder._id || index}
                    onClick={() => handleFolderClick(data.folder)}
                    className="folder-card p-3 bg-white rounded-lg shadow-md cursor-pointer"
                  >
                    <p className="text-center text-md font-semibold">
                      {data.folder.name}
                    </p>
                  </div>
                ))
              ) : (
                <p>No folders available</p>
              )}
            </div>
          </>
        ) : (
          <div className="files-container">
            <button
              onClick={handleBackToFolders}
              className="text-white bg-main rounded-lg px-4 py-2"
            >
              Back to Folders
            </button>
            <h2 className="font-Nunito text-xl mb-3 mt-3">
              Files in {selectedFolder.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {files?.length > 0 ? (
                files?.map((file,index) => (
                  <Link key={file?._id || index} onClick={()=>handlestream(file?._id)}>
                  <div 
                    className="file-card p-3 bg-white rounded-lg shadow-md"
                    >
                    <p className="text-center text-md font-semibold">
                      {file?.originalName}
                    </p>
                  </div>
                      </Link>
                ))
              ) : (
                <p>No files available in this folder</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Vector1 />
    </>
  );
};

export default User;
