import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MyVideos() {
  const dispatch = useDispatch();
  const videos = useSelector(store => store.videos.allVideosList);

  // this will fetch data on page load
  // need to get all data from video-responses table
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_VIDEOS' })
  }, [])

  return (
    <div>
      <h1>My Videos</h1>

      {videos.map(video => {
        return (
            <ul key={video.id}>
                <li>{video.question}</li>
                <li>this is the video submission url: {video.video_url}</li>
                { video.approved &&
                  <li>approved</li>
                }
                { video.approved === false &&
                  <li>denied</li>
                }
                { video.approved === null &&
                  <li>pending</li>
                }
            </ul>
        )
      })}
    </div>
  );
}

export default MyVideos;