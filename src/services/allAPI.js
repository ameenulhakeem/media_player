import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

// to upload a new video
export const uploadAllVideo = async (reqBody)=>{
    return await commonAPI('POST',`${serverURL}video`,reqBody);
}

// to get all videos alrady inserted

 export const getAllVideos = async ()=>{
    return await commonAPI('GET',`${serverURL}video`,"")
 }

 export const deleteVideo=async(id)=>{
    return await commonAPI('DELETE',`${serverURL}video/${id}`,{})
 }

 export const addToHistory=async(VideoDetails)=>{
    return await commonAPI('POST',`${serverURL}history`,VideoDetails)
 }
 export const getHistory=async()=>{
   return await commonAPI('GET',`${serverURL}history`,"")
 }
 export const deleteHistory=async(id)=>{
   return await commonAPI('DELETE',`${serverURL}history/${id}`,{})
 }
 export const addCategory = async (reqBody)=>{
   return await commonAPI('POST',`${serverURL}category`,reqBody)
 }
 export const getAllCategory = async ()=>{
   return await commonAPI('GET',`${serverURL}category`,"")
 }
 export const deleteCategory=async(id)=>{
  return await commonAPI('DELETE',`${serverURL}category/${id}`,{})
 }
 export const getVideoDetails=async(id)=>{
  return await commonAPI('GET',`${serverURL}video/${id}`,"")
}
export const updateCategory=async(id,body)=>{
  return await commonAPI('PUT',`${serverURL}Category/${id}`,body)
}