import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { LuListPlus } from "react-icons/lu";
import { RxDotsHorizontal } from "react-icons/rx";
import logo from "../Images/logo.png";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { useParams } from "react-router-dom";
import shortenViewCount from "../../fns/shortenViewCount";
import Comments from "./Comments";

function VideoDetails() {
  const [video, setVideo] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [moreVideos, setMoreVideos] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/${videoId}`); // fetch video using videoId
        if (res.data) {
          setVideo(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, [videoId]);

  useEffect(() => {
    const fetchMoreVideos = async () => {
      try {
        const res = await axios.get("/api/videos");
        if (res.data.length > 0) {
          setMoreVideos(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMoreVideos();
  }, []);

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          {video && (
            <>
              <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                <YouTube
                  videoId={video.video_id}
                  className="bg-#000000 w-full h-full "
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      modestbranding: 1,
                    },
                  }}
                />
              </div>
              <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                {video?.title}
              </div>
              <div className="flex justify-between flex-col md:flex-row mt-4">
                <div className="flex">
                  <div className="flex items-center">
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={logo}
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-3">
                    <div className="text-white text-md font-semibold flex items-center">
                      {video?.channel_title}
                    </div>
                    <div className="text-white/[0.7] text-sm">
                      {"12.2k subscribers"}
                    </div>
                  </div>
                </div>
                <div className="flex text-white mt-4 md:mt-0">
                  <div className="flex items-center justify-center h-11 px-4 rounded-3xl bg-white/[0.15]">
                    <AiOutlineLike className="text-xl text-white mr-2" />
                    <span>{shortenViewCount(video?.like_count)} Likes</span>
                  </div>
                  <div className="flex items-center justify-center h-11 px-4 rounded-3xl bg-white/[0.15] ml-4">
                    <AiOutlineDislike className="text-xl text-white mr-2" />
                    <span>Dislike</span>
                  </div>
                  <div className="flex items-center justify-center h-11 px-4 rounded-3xl bg-white/[0.15] ml-4">
                    <RiShareForwardLine className="text-xl text-white mr-2" />
                    <span>{} share</span>
                  </div>
                  <div className="flex items-center justify-center h-11 px-4 rounded-3xl bg-white/[0.15] ml-4">
                    <LuListPlus className="text-xl text-white mr-2" />
                    <span>{} Share</span>
                  </div>
                  <div className="flex items-center justify-center h-11 px-4 rounded-3xl bg-white/[0.15] ml-4">
                    <RxDotsHorizontal className="text-xl text-white mr-2" />
                  </div>
                </div>
              </div>
              <div className="text-white text-sm md:text-base mt-4 bg-slate-900 rounded-3xl py-2 px-2">
                {showFullDescription
                  ? video?.description
                      .split("\n")
                      .map((line, i) => <p key={i}>{line}</p>)
                  : video?.description.substring(0, 100)}
                {showFullDescription ? (
                  <button
                    className="text-blue-500"
                    onClick={() => setShowFullDescription(false)}
                  >
                    {" "}
                    Show less
                  </button>
                ) : (
                  <button
                    className="text-blue-500"
                    onClick={() => setShowFullDescription(true)}
                  >
                    {" "}
                    Show more
                  </button>
                )}
              </div>
              <div className="">
                {video && <Comments key={video.video_id} video={video} />}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto scrollbar-hide lg:w-[350px] xl:w-[400px] h-[calc(100vh-56px)]">
          {moreVideos.map((vid) => (
            <SuggestionVideoCard
              key={vid.video_id}
              video={vid}
              onClick={() => setVideo(vid)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;