import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MyVideos() {
  const dispatch = useDispatch();
  const videos = useSelector(store => store.videosInfo.myVideosList);

  // this will fetch data on page load
  // need to get all data from video-responses table
  useEffect(() => {
    dispatch({ type: 'FETCH_MY_VIDEOS' })
  }, [])

  return (
    <div>
        <center>
            <h2 className='page-subheadings'>My Videos</h2>
            <br/>
            {videos.map(video => {
              return (
                  <div key={video.id}>
                      <h3>{video.question}</h3>
                      { video.approved &&
                        <p>This submission was approved 🎉</p>
                      }
                      { video.approved === false &&
                        <p>This submission did not meet our terms of use, please re-record and submit again</p>
                      }
                      { video.approved === null &&
                        <p>This submission is currently pending.</p>
                      }
                      <video width="428" height="321" controls>
                          {/* Below is dummy data for src, need to be updated after urls in db exist */}
                          <source src={video.video_url} type="video/youtube" />
                          Your browser does not support the video tag.
                      </video>
                      <br/>
                      <br/>
                  </div>
              )
            })}
      </center>
    </div>
  );
}

export default MyVideos;