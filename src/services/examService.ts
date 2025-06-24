import axios from "axios";

export const getExamQuestions = async (examId: number) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASEURL}/api/questions/all/exams/${examId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.data;
};
