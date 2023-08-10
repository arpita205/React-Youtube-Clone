import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Videosection.css";

const VideoSection = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const api_key = "AIzaSyDYJbMoJBfL-j5onwn55XZjtPjaYQs_1nI";
    const video_http = "https://www.googleapis.com/youtube/v3/videos?";
    const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

    const fetchData = async () => {
      try {
        const response = await axios.get(video_http, {
          params: {
            key: api_key,
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 50,
            regionCode: 'IN'
          }
        });

        const videoData = response.data.items;
        console.log("Received video data:", videoData);

       
        const videoDetails = [];
        for (const video of videoData) {
          const videoId = video.id;
          const videoDetailsResponse = await axios.get(video_http, {
            params: {
              key: api_key,
              part: 'snippet,statistics',
              id: videoId
            }
          });

          const videoDetailsData = videoDetailsResponse.data.items[0];
          const channelTitle = videoDetailsData.snippet.channelTitle;
          const viewCount = videoDetailsData.statistics.viewCount;
          const publishedAt = new Date(videoDetailsData.snippet.publishedAt).toDateString();

          // Store the video details in the array
          videoDetails.push({ ...video, channelTitle, viewCount, publishedAt });
        }

        setVideos(videoDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid-container">
        {videos.length > 0 &&
          videos.map((video) => (
            <div key={video.id} className="video" onClick={() => window.location.href = 'https://youtube.com/watch?v=' + video.id}>
              <img src={video.snippet.thumbnails.default.url} alt="" />
              <h1 className="video-title">{video?.snippet?.title.slice(0, 30)}</h1>
              <h2 className="video-info">{video.viewCount} Views <br /> {video.publishedAt}</h2>
              <p className="channel-name">{video.channelTitle}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default VideoSection;

