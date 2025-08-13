import axios from "axios";

export const getSignedVideoUrl = async (key: string) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASEURL}/api/aws-s3/get-signed-cookies`,
    { key },
    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
  );

  // Set cookies manually (since backend can't set cross-domain cookies directly without proper CORS)
  Object.entries(data.data.cookies).forEach(([name, cookieData]: any) => {
    document.cookie = `${name}=${cookieData.value}; Domain=${cookieData.options.domain}; Path=${cookieData.options.path}; Secure`;
  });

  return data.data.fileUrl;
};
