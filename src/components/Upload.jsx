import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile, addFile } from '../store/uploadCreate';

const Upload = () => {
  const dispatch = useDispatch();
    const show = useSelector((state)=>state.uploadCreate.uploadStatus)

    const handleCancel = ()=>{
      dispatch(uploadFile(false))
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
       const file = e.target.file.files[0];
       const description = e.target.desc.value;
       if (file && description) {
         dispatch(addFile({file, description})); 
         handleCancel(); 
       }
    }

  return (
    <>
    {show && <div className=' w-full h-full bg-white fixed z-50 flex justify-center items-center'>
    <div className='w-3/4 sm:h-1/3 h-1/2 sm:w-1/3 rounded-xl bg-gradient-pop flex flex-col justify-center'>
    <div className=' sm:ml-8 ml-2 p-3 sm:mt-5'>
      <p className=' text-3xl mb-2'>Upload file</p>
      <form className=' flex flex-col' onSubmit={handleSubmit}>
        <input type='file' name='file' required />
        <label htmlFor="desc" className=" mb-2 text-xl font-medium">
                  Description
                </label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  maxLength={100}
                  required
                  className=" sm:w-1/2 rounded-md"
                />
        <button type='submit' className='bg-purple text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 my-3 sm:w-2/5' >Upload</button>
      </form>
        <button className='bg-purple text-white px-2 py-1 sm:px-3 sm:py-1 h-8 rounded-md text-xs sm:text-xl transition-all duration-500 ease-linear transform hover:scale-110 w-full sm:w-2/5 sm:relative sm:left-48 sm:bottom-11' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
    </div>}
    </>
  )
}

export default Upload
