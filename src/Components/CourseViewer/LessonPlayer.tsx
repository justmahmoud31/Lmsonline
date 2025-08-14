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
      const urlParts = url.split("/");
      const category = urlParts[urlParts.length - 2];
      const fileName = urlParts[urlParts.length - 1].replace(".mp4", ""); 

      const baseUrl = urlParts.slice(0, urlParts.length - 2).join("/");
      const m3u8Url = `${baseUrl}/${category}/${fileName}/${fileName}_1080p.m3u8`;
       console.log(m3u8Url);
       
      if (Hls.isSupported()) {
        const hls = new Hls({ xhrSetup: (xhr) => { xhr.withCredentials = true; } });
        hls.loadSource(m3u8Url);
        hls.attachMedia(videoRef.current!);
      } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = m3u8Url; // Safari
      }

      setLoading(false);
    });
  }, [path]);

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  ) : (
    <video
      ref={videoRef}
      controls
      className="w-full max-h-screen mt-4 rounded-lg"
      controlsList="nodownload noremoteplayback"
      crossOrigin="use-credentials"
    />
  );
};

export default LessonPlayer;
