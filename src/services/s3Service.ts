import axios from "axios";

export const getSignedVideoUrl = async (key: string) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASEURL}/api/aws-s3/get-signed-cookies`,
      { key },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    // Temporary — store cookies on current domain for testing
    Object.entries(data.data.cookies).forEach(([name, cookieData]: any) => {
      document.cookie = `${name}=${cookieData.value}; Path=${cookieData.options.path}; Secure; SameSite=None`;
    });

    return data.data.fileUrl; // This should be the CloudFront URL
  } catch (error) {
    console.error(error);
  }
};
