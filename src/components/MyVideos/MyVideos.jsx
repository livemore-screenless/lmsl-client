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
            <>
                <h3>{video.question}</h3>
                <p>this is the video submission url: {video.video_url}</p>
                { video.approved &&
                  <p>approved</p>
                }
                { video.approved === false &&
                  <p>denied</p>
                }
                { video.approved === null &&
                  <p>pending</p>
                }
            </>
        )
      })}
    </div>
  );
}

export default MyVideos;