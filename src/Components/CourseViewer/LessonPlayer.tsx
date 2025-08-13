import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";
import Loading from "../Shared/Loading/Loading";
import { getSignedVideoUrl } from "../../services/s3Service";

const LessonPlayer = ({ path }: { path: string }) => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setLoading(true);
    getSignedVideoUrl(path).then((url) => {
      if (Hls.isSupported()) {
        const hls = new Hls({ xhrSetup: (xhr) => { xhr.withCredentials = true; } });
        hls.loadSource(url);
        hls.attachMedia(videoRef.current!);
      } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari
        videoRef.current.src = url;
      }
      setLoading(false);
    });
  }, [path]);

  return loading ? (
    <div className="flex items-center justify-center h-screen"><Loading /></div>
  ) : (
    <video
      ref={videoRef}
      controls
      className="w-full max-h-screen mt-4 rounded-lg"
      controlsList="nodownload noremoteplayback"
    />
  );
};

export default LessonPlayer;
