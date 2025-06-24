import axios from "axios";

export const getPrivateCourse = async (id: string) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${import.meta.env.VITE_BASEURL}/api/courses/${id}/private`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
