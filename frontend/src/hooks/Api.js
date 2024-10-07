import axios from "axios";
axios.defaults.withCredentials = true;
async function createAccount(fullname, email, password) {
  try {
    const response = await axios.post(
      "https://backend-dms-rril.onrender.com/api/user/signup",
      {
        fullname,
        email,
        password,
      }
    );

    console.log("Account created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating account:",
      error.response ? error.response.data : error.message
    );
  }
}
async function loginUser(email, password) {
  try {
    const response = await axios.post(
      "https://backend-dms-rril.onrender.com/api/user/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    console.log("Account created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating account:",
      error.response ? error.response.data : error.message
    );
  }
}
export default { createAccount, loginUser };
