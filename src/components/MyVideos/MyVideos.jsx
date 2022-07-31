import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

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
            {videos.length === 0 &&
            <>
                <p>You haven't added any videos yet 🙁</p>
                <Link className="sub-navLink" to="/prompt-page">
                  Click here to view prompts and contribute!
                </Link>
            </>
        }
            <br/>
            {videos.map(video => {
              return (
                  <div key={video.id}>
                      <h3 className='my-video-title'>{video.question}</h3>
                      { video.approved &&
                        <p>This submission was approved 🎉</p>
                      }
                      { video.approved === false &&
                        <p>
                          This submission did not meet our terms of use,
                          <br/> 
                          please re-record and submit again
                        </p>
                      }
                      { video.approved === null &&
                        <p>This submission is currently pending.</p>
                      }
                      <video src={video.video_url} type="video/youtube" width="428" height="321" controls>
                          {/* Below is dummy data for src, need to be updated after urls in db exist */}
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