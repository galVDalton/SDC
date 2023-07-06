import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import { Routes, useNavigate, Route } from "react-router-dom";
import SingleVideo from "./SingleVideo.jsx";
import VideoDetails from "./SingleVideoPage/VideoDetails.jsx";
import Filters from './Filters';

const App = () => {
	const [videos, setVideos] = useState(null);
	async function fetchVideos() {
		try {
			const res = await axios.get("/api/videos");
			if (res.data.length > 0) {
				setVideos(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		fetchVideos();
	}, []);

	// const getVideos = () => {
	//   axios
	//     .get("/api/videos")
	//     .then((response) => {
	//       console.log(response.data);
	//     })
	//     .catch((error) => {
	//       console.error("Error fetching videos", error);
	//     });
	// };
	// useEffect(() => {
	//   getVideos();
	// }, []);
	// const getVideos = () => {
	//   axios
	//     .get("/api/videos")
	//     .then((response) => {
	//       console.log(response.data);
	//     })
	//     .catch((error) => {
	//       console.error("Error fetching videos", error);
	//     });
	// };

	const getVideos = () => {
		axios
			.get("/api/videos")
			.then((response) => {
				console.log(response.data);
				return response.data;
			})
			.catch((error) => {
				console.error("Error fetching videos", error);
			});
	};

	return (
		<>

			<Header setVideos={setVideos} fetchVideos={fetchVideos} />
			<Filters setVideos={setVideos} />
			<Routes>
				<Route path="/api/video/:videoId" element={<VideoDetails />} />
				{/* <Route path="/" element={<Filters />} /> */}
				<Route
					path="/"
					element={
						<div className="flex flex-wrap">
							{videos &&
								videos.map((video) => (
									<SingleVideo key={video.video_id} video={video} />
								))}
						</div>
					}
				/>
				<Route
					path="/search-results"
					element={
						<div className="flex flex-wrap">
							{videos &&
								videos.map((video) => (
									<SingleVideo key={video.video_id} video={video} />
								))}
						</div>
					}
				/>
			</Routes>
		</>
	);
};
export default App;