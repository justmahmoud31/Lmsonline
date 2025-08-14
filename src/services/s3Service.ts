import axios from "axios";

export const getSignedVideoUrl = async (key: string) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/api/aws-s3/get-signed-cookies`,
      { key },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );
    
    return data.data.fileUrl; 
  } catch (error) {
    console.error(error);
  }
};
