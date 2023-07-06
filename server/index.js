import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import pg from "pg";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT;
const sql = postgres(process.env.DATABASE_URL);
const app = express();
const api_key = process.env.API_KEY;
const youtubeVideoPopular = process.env.YOUTUBEVIDEOSPOPULAR;

const db = new pg.Pool ({
  connectionString: process.env.DATABASE_URL, 
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const map = new Map();

app.get("/api/videos", async (req, res) => {
  try {
    if(map.has("top-videos")) {
      res.json(map.get("top-videos"));
    } else {
      db.query(`SELECT * FROM youtubevideos LIMIT 10;`).then((data) => {
        if (data.rows.length === 0) {
          res.sendStatus(404);
        } else {
          map.set("top-videos", data.rows);
          res.json(data.rows);
        }
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.get("/api/categories", async (req, res) => {
  console.log("TEST");
  //  try {
  //         const response = await axios.get(
  //             `https://www.googleapis.com/youtube/v3/videoCateogories`,
  //             {
  //                 //we can adjust the params based on the google docs to get more results, order it differently and have our type return different stuff -sp
  //                 params: {
  //                     part: 'snippet',
  //                     regionCode: 'US',
  //                     key: `${api_key}`,
  //                 },
  //             }
  //         )
  //      res.json(response);
  // console.log('respones', res) ;
  //  } catch (error) {
  //      console.error(error);
  //      res.status(500).send("An error occurred");
  //  }
});

//below is the the web app specific code to be used throughout the website to search for keywords/category/etc. CAVEAT- the word MUST be in the description, so its not based off youtube categories.

//will keep the orignal just incase things get wild in the future
// app.get('/search/:searchVideo', async (req, res) => {
//     try {
//         const searchVideo = req.params.searchVideo
//         const query =
//             await sql`SELECT * FROM youtubevideos WHERE description ILIKE '%' || ${searchVideo} || '%'`

//         res.json(query)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('Error occurred while fetching videos')
//     }
// })

app.get("/api/search/:search", async (req, res) => {
  try {
    const searchVideo = req.params.search;
    const searchWords = searchVideo.split(" ");

    let query = "SELECT * FROM youtubevideos WHERE ";

    for (let i = 0; i < searchWords.length; i++) {
      const word = searchWords[i];
      if (
        word.toUpperCase().includes("DROP") ||
        word.toUpperCase().includes("TABLE") ||
        word.toUpperCase().includes("TRUNCATE") ||
        word.toUpperCase().includes("SELECT") ||
        word.toUpperCase().includes("UPDATE") ||
        word.toUpperCase().includes("*")
      ) {
        //does not actually send a error status of 420 but it does stop the user from searching the words above
        res.status(420);
        return;
      }

      query += `description ILIKE '%${searchWords[i]}%'`;
      if (i < searchWords.length - 1) {
        query += " OR ";
      }
    }
    //unsafe allows for a lot of raw SQL data so thats why there are a few 'banned' words that users can not use to mess up our table on accident
    const result = await sql.unsafe(query);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching videos");
  }
});

//this slightly redudant code allows us to better tailor out data base if we want to add specific youtube videos into our database
//the intention is not to actually utilize it with our front end BUT allow us to input videos into our database and make it more tailored to whatever we please, things like thumbs up, viewcount, dislike will be NULL with this api because the response does not provide the information, nonetheless i kept it in there for consistency and too allow for a few ideas later such as IF blahblah === NULL then give random Number -sp
// app.get('/api/search/:search', async (req, res) => {
//     const searchWord = req.params.search

//     if (!searchWord) {
//         return res.status(400).send('Missing search word!')
//     }

//     try {
//         const response = await axios.get(
//             `https://www.googleapis.com/youtube/v3/search`,
//             {
//                 //we can adjust the params based on the google docs to get more results, order it differently and have our type return different stuff -sp
//                 params: {
//                     part: 'snippet',
//                     maxResults: 1,
//                     order: 'relevance',
//                     q: `${searchWord}`,
//                     type: 'video',
//                     key: `${api_key}`,
//                 },
//             }
//         )

//         const videoData = response.data.items.map((item) => {
//             return {
//                 video_id: item.id || null,
//                 title: item.snippet.title || null,
//                 description: item.snippet.description || null,
//                 url: `https://www.youtube.com/watch?v=${item.id}` || null,
//                 published_at: item.snippet.publishedAt || null,
//                 channel_id: item.snippet.channelId || null,
//                 channel_title: item.snippet.channelTitle || null,
//                 view_count: video.statistics.viewCount || null,
//                 like_count: video.statistics.likeCount || null,
//                 dislike_count: video.statistics.dislikeCount || null,
//             }
//         })
//         for (const video of videoData) {
//             await sql`INSERT INTO youtubevideos (
//         video_id,
//         title,
//         description,
//         thumbnail_url,
//         url,
//         published_at,
//         channel_id,
//         channel_title.
//         view_count,
//         like_count,
//         dislike_count
//       ) VALUES (
//         ${video.video_id},
//         ${video.title},
//         ${video.description},
//         ${video.thumbnail_url},
//         ${video.url},
//         ${video.published_at},
//         ${video.channel_id},
//         ${video.channel_title}
//         ${video.view_count},
//         ${video.like_count},
//         ${video.dislike_count}
//       ) ON CONFLICT (video_id) DO NOTHING`
//         }
//         res.send(response.data)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('Error occurred while fetching videos')
//     }
// })

app.get("/api/videos", async (req, res) => {
  try {
    const response = await axios.get(youtubeVideoPopular, {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 100,
        pageToken: "CJYBEAA",
        key: process.env.API_KEY,
      },
    });

    const videoData = response.data.items.map((item) => {
      return {
        video_id: item.id || null,
        title: item.snippet.title || null,
        description: item.snippet.description || null,
        thumbnail_url: item.snippet.thumbnails.medium.url || null,
        url: `https://www.youtube.com/watch?v=${item.id}` || null,
        published_at: item.snippet.publishedAt || null,
        channel_id: item.snippet.channelId || null,
        channel_title: item.snippet.channelTitle || null,
        view_count: item.statistics.viewCount || null,
        like_count: item.statistics.likeCount || null,
        dislike_count: item.statistics.dislikeCount || null,
      };
    });
    for (const video of videoData) {
      await sql`INSERT INTO youtubevideos (
        video_id,
        title,
        description,
        thumbnail_url,
        url,
        published_at,
        channel_id,
        channel_title,
        view_count,
        like_count,
        dislike_count
      ) VALUES (
        ${video.video_id},
        ${video.title},
        ${video.description},
        ${video.thumbnail_url},
        ${video.url},
        ${video.published_at},
        ${video.channel_id},
        ${video.channel_title},
        ${video.view_count},
        ${video.like_count},
        ${video.dislike_count}
      ) ON CONFLICT (video_id) DO NOTHING`;
    }
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching videos");
  }
});

//this is pulling from out DB NOT from the API
//the description LIKE is searching for the keywork within a videos description
app.get("/api/search/:searchVideo", async (req, res) => {
  try {
    const searchVideo = req.params.searchVideo;
    const response =
      await sql`SELECT * FROM youtubevideos WHERE description LIKE %${searchVideo}%`;
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching videos");
  }
});
// app.get('/search/:searchVideo', async (req, res) => {
//     try {
//         const searchVideo = req.params.searchVideo
//         const response =
//             await sql`SELECT * FROM youtubevideos WHERE description ILIKE '%${searchVideo}%'`
//         res.send(response)
//         console.log(response)
//     } catch (error) {
//         console.error(error)
//         res.status(500).send('Error occurred while fetching videos')
//     }
// })

app.get("/api/videos/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video =
      await sql`SELECT * FROM youtubevideos WHERE video_id = ${videoId}`;

    if (video.length > 0) {
      res.json(video[0]);
    } else {
      res.status(404).send("Video not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.get("/api/videos/comments/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const comments =
      await sql`SELECT comment FROM comments WHERE video_id = ${videoId}`;
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});
app.post("/api/videos/comments/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  const comment = req.body.comment;

  if (!videoId || !comment) {
    console.error(`Invalid data - Video ID: ${videoId}, Comment: ${comment}`);
    return res.status(400).send("Invalid video id or comment");
  }
  // console.log(typeof videoId, typeof comment);
  try {
    await sql`INSERT INTO comments (video_id, comment) VALUES (${videoId}, ${comment})`;
    const allComments =
      await sql`SELECT comment FROM comments WHERE video_id = ${videoId}`;
    res.send(allComments);
  } catch (error) {
    // console.error(`Error while adding comment for video ${videoId}`);
    // console.error(`Comment text: ${comment}`);
    console.error(`Error: ${error}`);
    res.status(500).send("An error occurred");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});