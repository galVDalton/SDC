import React, { useState, useEffect } from "react";
import axios from "axios";

function Comments({ video }) {
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/videos/comments/${video.video_id}`);
        if (res.data.length > 0) {
          setComments(res.data);
          // console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, []);
  // console.log(comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputComment) return;
    // console.log("hello");
    const comment = inputComment;
    const response = await axios.post(
      `/api/videos/comments/${video.video_id}`,
      {
        comment,
      }
    );
    const allComments = response.data;
    // console.log(allComments);
    setComments(allComments);
    setInputComment("");
  };

  return (
    <div className="w-full mt-4 bg-slate-900 rounded-3xl py-4 px-4">
      <h3 className="text-lg font-semibold mb-2 text-white">Comments</h3>
      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        <textarea
          className="h-20 px-3 py-2 rounded-md text-white bg-gray-700 resize-none"
          placeholder="Add a public comment..."
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 mr-2 transition-colors duration-200 ease-in-out"
            type="reset"
            onClick={() => setInputComment("")}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-500 transition-colors duration-200 ease-in-out"
            type="submit"
          >
            Comment
          </button>
        </div>
      </form>
      {comments &&
        comments.map((comment, index) => (
          <div key={index} className="flex flex-row items-start mt-4">
            <div className="flex flex-col text-white">{comment.comment}</div>
          </div>
        ))}
    </div>
  );
}

export default Comments;