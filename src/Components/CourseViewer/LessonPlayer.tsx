import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Loading from "../Shared/Loading/Loading";
import { getSignedVideoUrl } from "../../services/s3Service";

export interface VideoInfo {
  videoSrc: string;
  videoMimeType: string;
}
const LessonPlayer = ({ path }: { path: string }) => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [m3u8Url, setM3u8Url] = useState<string | null>(null);

  useEffect(() => {
    getSignedVideoUrl(path)
      .then((url) => {
        const urlObj = new URL(url);
        const parts = urlObj.pathname.split("/");
        const category = parts[1];
        const filenameWithExt = parts[2];
        const uuid = filenameWithExt.replace(".mp4", "");
        urlObj.pathname = `/${category}/${uuid}/${uuid}_1080p.m3u8`;
        setM3u8Url(urlObj.toString());
      })
      .catch((err) => {
        console.error("Error fetching signed URL:", err);
        setLoading(false);
      });
  }, [path]);

  useEffect(() => {
    if (m3u8Url && videoRef.current) {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        responsive: true,
        fluid: true,
        sources: [
          {
            src: m3u8Url,
            type: "application/x-mpegURL",
          },
        ],
      });
      player.on("loadedmetadata", () => setLoading(false));
      playerRef.current = player;
      return () => player.dispose();
    }
  }, [m3u8Url]);


  return (
    <div className="relative w-full max-h-screen">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <Loading />
        </div>
      )}

      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full max-h-screen mt-4 rounded-lg"
          controls
          crossOrigin="use-credentials"
        ></video>
      </div>
    </div>
  );
};

export default LessonPlayer;
