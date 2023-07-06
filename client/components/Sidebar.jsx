import React, { useState, useEffect } from "react";
import hexYTimage from "./Images/hexYTimg.png";
import ytlogomobile from "./Images/ytlogomobile.png";
import shorts from "./Images/Shorts.png";
import YTKidsImg from "./Images/YTKidsImg.png";
import circYTimage from "./Images/circYTimage.jpeg";
import YTTVimage from "./Images/YTTVimage.png";
import {
  AiOutlineSetting,
  AiOutlineTrophy,
  AiOutlineFlag,
} from "react-icons/ai";
import { BiTimeFive, BiMovie, BiLike } from "react-icons/bi";
import { BsPlayBtn, BsFire, BsLightbulb } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { FiRadio, FiHelpCircle } from "react-icons/fi";
import { GiHanger } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { IoMusicalNoteOutline, IoNewspaperOutline } from "react-icons/io5";
import { LuHistory, LuShoppingBag } from "react-icons/lu";
import {
  MdSubscriptions,
  MdPodcasts,
  MdOutlineVideoLibrary,
  MdOutlineFeedback,
} from "react-icons/md";

function Sidebar({ showSidebar, setShowSidebar }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidebarElement = document.getElementById("sidebar");

      if (
        showSidebar &&
        sidebarElement &&
        !sidebarElement.contains(event.target)
      ) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar, setShowSidebar]);

  return (
    <div
      id="sidebar"
      className={`sidebar ${
        showSidebar ? "show" : ""
      } scroll-smooth bg-black w-72 ps-8 absolute top-14 left-0 transition-left duration-100 z-50`}
    >
      <div className="h-screen ">
        <div className="flex justify-between items-center w-60 h-1 px-12 sm:px-6 bg-[#202020] text-white"></div>
        <div className="overflow-y-auto scrollbar-medium scrollbar-thumb-transparent-900 scrollbar-track-blue-100 flex-col justify-start items-start h-[calc(100%-48px)] ">
          <div className="image-stack">
            <div className="flex items-center py-1  hover:border border-slate-600 rounded-lg">
              <GoHome className="h-7 w-7 mr-2" />
              <a href="">Home</a>
            </div>
            <div className="flex items-center py-1  hover:border border-slate-600 rounded-lg">
              <img className="h-7 mr-2" src={shorts} alt="Shorts"></img>
              <a href="https://www.youtube.com/shorts/4FmJClsgYTI">Shorts</a>
            </div>
            <div className="flex items-center py-1 hover:border border-slate-600 rounded-lg">
              <MdSubscriptions className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/feed/subscriptions">
                Subscriptions
              </a>
            </div>
            <div className="border-t border-slate-600 py-1  my-4"></div>
            <div className="flex items-center hover:border border-slate-600  py-1 rounded-lg">
              <MdOutlineVideoLibrary className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/feed/library">Library</a>
            </div>
            <div className="flex items-center py-1 hover:border border-slate-600 rounded-lg">
              <LuHistory className="w-7 h-7 mr-2 " />
              <a href="https://www.youtube.com/feed/history">History</a>
            </div>
            <div className="flex items-center py-1 hover:border border-slate-600 rounded-lg">
              <BsPlayBtn className="w-7 h-7 mr-2 " />
              <a href="https://studio.youtube.com/channel/UChKMitzM6IzpP-6NHac6ksA/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D">
                Your videos
              </a>
            </div>
            <div className="py-1 flex items-center hover:border border-slate-600 rounded-lg">
              <BiTimeFive className="w-7 h-7 mr-2  " />
              <a href="https://www.youtube.com/playlist?list=WL">Watch later</a>
            </div>
            <div className="flex items-center hover:border border-slate-600  py-1 rounded-lg">
              <BiLike className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/playlist?list=LL">
                Liked videos
              </a>
            </div>
            <div className="border-t border-slate-600 my-4"></div>
            <h2 className="py-2 text-lg	font-bold">Explore</h2>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <BsFire className="h-7 w-7 mr-2" />
              <a href="https://www.youtube.com/feed/trending?bp=6gQJRkVleHBsb3Jl">
                Trending
              </a>
            </div>
            <div className="flex items-center py-1  hover:border border-slate-600 rounded-lg">
              <LuShoppingBag className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/channel/UCkYQyvc_i9hXEo4xic9Hh2g">
                Shopping
              </a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <IoMusicalNoteOutline className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ">
                Music
              </a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <BiMovie className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/feed/storefront">Movies & TV</a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <FiRadio className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/channel/UC4R8DWoMoI7CAwX8_LjQHig">
                Live
              </a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <CgGames className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/gaming">Gaming</a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <IoNewspaperOutline className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/channel/UCYfdidRxbB8Qhf0Nx7ioOYw">
                News
              </a>
            </div>
            <div className="flex items-center py-1  hover:border border-slate-600 rounded-lg">
              <AiOutlineTrophy className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/channel/UCEgdi0XIXXZ-qJOFPf4JSKw">
                Sports
              </a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <BsLightbulb className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/channel/UCtFRv9O2AHqOZjjynzrv-xg">
                Learning
              </a>
            </div>
            <div className="flex items-center py-1  hover:border border-slate-600 rounded-lg">
              <GiHanger className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ">
                Fashion & Beauty
              </a>
            </div>
            <div className="flex items-center hover:border border-slate-600 rounded-lg">
              <MdPodcasts className="w-7 h-7 mr-2" />
              <a href="https://www.youtube.com/podcasts">Podcasts</a>
            </div>
            <div className="border-t border-slate-600 my-4"></div>
            <h2 className="py-2 text-lg	font-bold">More from YouTube</h2>
            <div className="flex items-center  py-1  hover:border border-slate-600 rounded-lg">
              <img className="h-7 mr-2" src={ytlogomobile} />
              <a href="https://www.youtube.com/premium">YouTube Premium</a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg ">
              <img src={hexYTimage} className="h-10 w-10 rounded-full mr-2" />
              <a href="https://studio.youtube.com/channel/UChKMitzM6IzpP-6NHac6ksA">
                YouTube Studio
              </a>
            </div>
            <div className="flex items-center py-1  hover:border border-slate-600 rounded-lg">
              <img src={circYTimage} className="h-10 w-10 rounded-full mr-2" />
              <a href="https://music.youtube.com/">YouTube Music</a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <img src={YTKidsImg} className="h-10 w-10 rounded-full mr-2" />
              <a href="https://www.youtubekids.com/?source=youtube_web">
                YouTube Kids
              </a>
            </div>
            <div className="flex items-center hover:border border-slate-600 rounded-lg">
              <img src={YTTVimage} className="h-10 w-10 rounded-full mr-2" />
              <a href="https://tv.youtube.com/welcome/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273&utm_servlet=prod&zipcode=62232">
                YouTube TV
              </a>
            </div>
            <div className="border-t border-slate-600 my-4"></div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <AiOutlineSetting className="h-7 w-7 mr-2" />
              <a href="https://www.youtube.com/account">Settings</a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <AiOutlineFlag className="h-7 w-7 mr-2" />
              <a href="https://www.youtube.com/reporthistory">Report history</a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <FiHelpCircle className="h-7 w-7 mr-2" />
              <a href="">Help</a>
            </div>
            <div className="flex items-center  py-1 hover:border border-slate-600 rounded-lg">
              <MdOutlineFeedback className="h-7 w-7 mr-2" />
              <a href="">Send feedback</a>
            </div>
            <div className=" border-t border-slate-600 my-4"></div>
            <div className="block w-1/4">
              <div className="text-xs px-1  py-1 w-1/4 flex-auto mt-4 md:mt-2">
                <a>About</a>
                <a className="px-1">Press</a>
                <a className="px-1">Copyright</a>
                <a className="px-1">Contact us</a>
                <a className="px-1">Creators</a>
                <a className="px-1">Advertise</a>
                <a className="px-1">Developers</a>
              </div>
              <div className="text-xs px-1  py-1 w-60 flex-auto mt-4 md:mt-4">
                <a>Terms</a>
                <a className="px-1">Privacy</a>
                <a className="px-1">Policy & Safety</a>
                <a className="px-1">How YouTube works</a>
                <a className="px-1">Test new features</a>
                <a className="px-1">NFL Sunday Ticket</a>
              </div>
              <div className="text-xs px-1 py-1  w-60 flex-auto mt-4 md:mt-4">
                <a>© 2023 Not Really Youtube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;