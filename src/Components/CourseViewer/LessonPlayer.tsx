import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSignedVideoUrl } from "../../services/s3Service";
import Loading from "../Shared/Loading/Loading";

const LessonPlayer = ({ path }: { path: string }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setVideoUrl(""); // clear previous video
    getSignedVideoUrl(path).then((res) => {
      setVideoUrl(res.data); // assuming the API returns the raw URL
      setLoading(false);
    });
  }, [path]);

  return videoUrl ? (
    <video
      key={videoUrl} 
      controls
      className="w-full max-h-screen mt-4 rounded-lg"
      controlsList="nodownload noremoteplayback"
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  ) : loading ? (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  ) : (
    <Typography color="error">تعذر تحميل الفيديو</Typography>
  );
};

export default LessonPlayer;
