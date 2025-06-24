import axios from "axios";

export const getSignedVideoUrl = async (key: string) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASEURL}/api/aws-s3/get-signed-url/{key}`,
    { key },
    { headers: { Authorization: `Bearer ${token}` } }
  );  
  return data;
};
