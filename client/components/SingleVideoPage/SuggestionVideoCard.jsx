import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import shortenViewCount from "../../fns/shortenViewCount";
import getAge from "../../fns/getAge";

function SuggestionVideoCard({ video, onClick }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onClick={onClick} // Event listener for click event
			onMouseEnter={() => setIsHovered(true)} // Event listener for mouse enter event
			onMouseLeave={() => setIsHovered(false)} // Event listener for mouse leave event
			className="cursor-pointer"
		>
			{/* Container for video thumbnail and details */}
			<div className="flex mb-3">
				{/* Video thumbnail */}
				<div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
					{isHovered ? (
						// Use ReactPlayer to show video when hovered
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${video?.video_id}`}
							playing={true}
							width="100%"
							height="100%"
							volume={0} // Mute the video
						/>
					) : (
						// Show thumbnail when not hovered
						<img
							className="h-full w-full object-cover"
							src={video?.thumbnail_url}
						/>
					)}
				</div>
				{/* Video details */}
				<div className="flex flex-col ml-3 overflow-hidden">
					<span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-white">
						{video?.title}
					</span>
					<span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
						{video?.channel_title}
					</span>
					<div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
						<span>{`${shortenViewCount(video?.view_count)} views`}</span>
						<span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
							.
						</span>
						<span className="truncate">{getAge(video?.published_at)} ago</span>
					</div>
				</div>
			</div>
		</div>
	);
}
export default SuggestionVideoCard;