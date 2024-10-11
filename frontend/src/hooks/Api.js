import axios from 'axios'
axios.defaults.withCredentials = true;
async function createAccount(fullname, email, password) {
    try {
      const response = await axios.post('https://backend-dms-rril.onrender.com/api/user/signup', {
        fullname,
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  }
async function loginUser(email, password) {
    try {
      
      const response = await axios.post('https://backend-dms-rril.onrender.com/api/user/login', {
        email,
        password,
      },{withCredentials:true});
  
      return response.data;
    } catch (error) {
      console.error('Error Logging account:', error.response ? error.response.data : error.message);
    }
  }
async function logoutUser() {
    try {
      
      const response = await axios.post('https://backend-dms-rril.onrender.com/api/user/logout',{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error('Error Logging out:', error.response ? error.response.data : error.message);
    }
  }
async function createFolder(userId,folderName) {
    try {
      
      const response = await axios.post('https://backend-dms-rril.onrender.com/api/upload/Addfolder',{
        userId,folderName
      },{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error('Error creating Folder:', error.response ? error.response.data : error.message);
    }
  }
async function getFoldersnFiles(userId) {
    try {
      
      const response = await axios.get(`https://backend-dms-rril.onrender.com/api/upload/folders/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error Getting Folders and Files :', error.response ? error.response.data : error.message);
    }
  }
async function Addfile(file) {
    try {
      
      const response = await axios.post(`https://backend-dms-rril.onrender.com/api/upload/fileupload`,file,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error Adding File:', error.response ? error.response.data : error.message);
    }
  }
async function streamfile(folderId,fileId) {
    try {
      const response = await axios.get(`https://backend-dms-rril.onrender.com/api/upload/stream/${folderId}/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error Stream File:', error.response ? error.response.data : error.message);
    }
  }
  async function deleteFile(folderId,fileId) {
    try {
      const response = await axios.post(`https://backend-dms-rril.onrender.com/api/upload/filedelete/${folderId}/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error Deleting File:', error.response ? error.response.data : error.message);
    }
  }
  async function deleteFolder(folderId) {
    try {
      const response = await axios.post(`https://backend-dms-rril.onrender.com/api/upload/Removefolder/${folderId}`);
      return response.data;
    } catch (error) {
      console.error('Error Deleting Folder:', error.response ? error.response.data : error.message);
    }
  }
  export default { createAccount, loginUser ,logoutUser,createFolder,getFoldersnFiles,Addfile,streamfile,deleteFile,deleteFolder};
