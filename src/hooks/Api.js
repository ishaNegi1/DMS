import axios from 'axios'
axios.defaults.withCredentials = true;
async function createAccount(fullname, email, password) {
    try {
      
      const response = await axios.post('https://backend-dms-rril.onrender.com/api/user/signup', {
        fullname,
        email,
        password
      });
  
      console.log('Account created:', response.data);
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
  
      console.log('Account created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  }
async function logoutUser() {
    try {
      
      const response = await axios.post('https://backend-dms-rril.onrender.com/api/user/logout',{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  }
async function createFolder(userId,folderName) {
    try {
      
      const response = await axios.post('https://backend-dms-rril.onrender.com/api/upload/Addfolder',{
        userId,folderName
      },{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  }
async function getFoldersnFiles(userId) {
    try {
      
      const response = await axios.get(`https://backend-dms-rril.onrender.com/api/upload/folders/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  }
async function Addfile(file) {
    try {
      
      const response = await axios.post(`https://backend-dms-rril.onrender.com/api/upload/fileupload`,file,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  }
async function streamfile(folderId,fileId) {
    try {
      console.log(folderId,fileId)
      const response = await axios.get(`https://backend-dms-rril.onrender.com/api/upload/stream/${folderId}/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  }
  export default { createAccount, loginUser ,logoutUser,createFolder,getFoldersnFiles,Addfile,streamfile};