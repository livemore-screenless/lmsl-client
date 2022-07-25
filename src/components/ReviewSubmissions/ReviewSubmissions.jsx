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
    <div className='review-submissions-container'>
      <h2>Review Submissions</h2>
      {videos.map(video => {
        return (
            <div key={video.id}>
                <p>{video.question}</p>
                <p>this is the video submission url: {video.video_url}</p>
                <p>Submitted by: {video.username}</p>
                <button 
                    id={video.id} 
                    onClick={approveVideo}
                > 
                    approve 
                </button>
                <button 
                    id={video.id}
                    onClick={denyVideo}
                > 
                    deny 
                </button>
            </div>
        )
      })}
    </div>
  );
}

export default ReviewSubmissions;