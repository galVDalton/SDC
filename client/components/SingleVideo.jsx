import React, { useState } from "react";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { HiOutlineClock } from "react-icons/hi";
import getAge from "../fns/getAge";
import { Link } from "react-router-dom";
import shortenViewCount from "../fns/shortenViewCount";
import ReactPlayer from "react-player";

const SingleVideo = (props) => {
  const { video } = props;

  // State for hover event
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col bg-transparent m-8 rounded-lg px-1"
      style={{ width: "320px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/api/video/${video.video_id}`}>
        <div className="relative group">
          {isHovered ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.video_id}`}
              playing={true}
              width="100%"
              height="100%"
              volume={0} // Mute the video
              className="rounded-lg"
            />
          ) : (
            <img
              src={video.thumbnail_url}
              alt="Thumbnail image"
              className="rounded-lg"
            />
          )}
          <div className="absolute top-0 right-0 bg-black rounded-md m-2 h-8 w-8 justify-center items-center hidden group-hover:flex">
            <HiOutlineClock className=" text-white " />
          </div>
        </div>
        <div className="flex relative">
          <img
            src="https://yt3.ggpht.com/ytc/AGIKgqPrNKvseSZ9dhpgVu4gsK4vojDXA1ZNjTFmPfiu-Q=s68-c-k-c0x00ffffff-no-rj"
            alt="Channel Image Icon"
            className="rounded-full h-8 w-8 mt-4"
          />
          <div className="py-2 flex flex-col mt-3 text-[#aaa] ">
            <p className="text-white w-41">{video.title}</p>
            <p className="text-inherit text-base ">{video.channel_title}</p>
            <p className="text-inherit text-sm">
              {shortenViewCount(video.view_count)} views &#8226;{" "}
              {getAge(video.published_at)} ago
            </p>
            <button className="" type="button">
              <CgMoreVerticalAlt className="text-white absolute top-5 -right-2 h-5 w-5 group-hover:visible" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleVideo;