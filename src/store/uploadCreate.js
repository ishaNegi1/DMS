import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createStatus: false,
  uploadStatus: false,
  files: [],
};

const uploadCreate = createSlice({
  name: "uploadCreate",
  initialState,
  reducers: {
    createFolder: (state, action) => {
      state.createStatus = action.payload;
    },
    uploadFile: (state, action) => {
      state.uploadStatus = action.payload;
    },
    createCancel: (state, action) => {
      state.createStatus = action.payload;
    },
    createCancel: (state, action) => {
      state.uploadStatus = action.payload;
    },
    addFile: (state, action) => {
      state.files.push({
         file: action.payload.file,
         description: action.payload.description,
       });
    },
    deleteFile: (state, action) => { 
      state.files = state.files.filter((f) => f.file.name !== action.payload);
    },
  },
});

export default uploadCreate.reducer;
export const { createFolder, uploadFile, createStatus, uploadStatus, deleteFile, addFile } =
  uploadCreate.actions;
