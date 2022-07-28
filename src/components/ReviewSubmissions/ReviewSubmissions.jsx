import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ReviewSubmissions() {
    const dispatch = useDispatch();
    const videos = useSelector(store => store.videosInfo.allVideosList);

    // this will fetch data on page load
    // need to get all videos with null approval
    useEffect(() => {
        dispatch({ type: 'FETCH_UNAPPROVED_VIDEOS' })
    }, [])
    
    // dispatch PUT route to approve video 
    const approveVideo = event => {
        const id = event.currentTarget.id;
        dispatch({ 
            type: 'APPROVE_VIDEO', 
            payload: id 
        });
    }

    // dispatch PUT route to deny video 
    const denyVideo = event => {
        const id = event.currentTarget.id;
        dispatch({ 
            type: 'DENY_VIDEO', 
            payload: id 
        });
    }

  return (
    <div>
    <center>
        <h2 className='page-subheadings'>Review Submissions</h2> 
        {videos.length === 0 &&
            <p>
                You are up-to-date on submissions
                <br/>
                🎉 nothing to review 🎉
            </p>
        }
        {videos.map(video => {
            return (
                <div key={video.id}>
                    <p>{video.question}</p>
                    <p>Submitted by: {video.username}</p>
                    <video src={video.video_url} type="video/youtube" width="428" height="321" controls>
                        {/* Below is dummy data for src, need to be updated after urls in db exist */}
                        Your browser does not support the video tag.
                    </video>
                    <br/>
                    <button 
                        id={video.id} 
                        onClick={approveVideo}
                        className="btn"
                    > 
                        approve 
                    </button>
                    <button 
                        id={video.id}
                        onClick={denyVideo}
                        className="btn"
                    > 
                        deny 
                    </button>
                    <br/>
                    <br/>
                </div>
            )
        })}
    </center>
    </div>
  );
}

export default ReviewSubmissions;