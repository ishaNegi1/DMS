import { configureStore } from "@reduxjs/toolkit"
import authSlice from './authSlice';
import uploadCreate from './uploadCreate'

const store = configureStore({
    reducer: {
        auth: authSlice,
        uploadCreate,
    }
})
export default store
